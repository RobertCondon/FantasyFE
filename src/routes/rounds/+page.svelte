<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '$lib/apiService.js';
    import { Card, Select, Label, Table, TableBody, TableHead, TableHeadCell, Search } from 'flowbite-svelte';
    import { writable } from 'svelte/store';
    import PlayerRoundRow from "../PlayerRoundRow.svelte";
    let currentPositions = [{
        value: "17",
        name: "All 17 (Starting and Bench)"
    },
        {
            value: "13",
            name: "Starting 13"
        }];
    let selectedCurrentPosition = 'any';

    let played = true;
    let playedOptions = [{
        value: "true",
        name: "Played"
    },
    {
        value: "false",
        name: "Not Played"
    }]

    let maxPrice = null;


    let selected;
    let teamSelection = [];
    let searchTerm = '';
    let teams = [];
    let year = 2024
    let round = 6
    let rounds = [];
    let players = [];

    onMount(async () => {
        teams = await fetchGet('teams');
        players = await fetchGet('players')
        rounds = await fetchGet('player_rounds', {year: year, round: round, played: played})
        teamSelection = teams.map(team => ({
            value: team.id,
            name: team.name
        }));
    });

    async function findPlayers() {
        const payload = {year: year, round: round}
        if (selected !== 'all') {
            payload.team_id = selected
        }
        if (played === 'true') {
            payload.played = true
        }

        rounds = await fetchGet('player_rounds', payload)

        // Reset sorting to default state when a new team is selected
        sortKey.set('fantasy_points_total');
        sortDirection.set(1);
    }

    const sortKey = writable('id');
    const sortDirection = writable(1);
    const sortRounds = writable(rounds.slice());

    const sortTable = (key) => {
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    $: {
        let filteredRounds = rounds.filter((item) => item.player.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        if (selectedCurrentPosition !== 'any') {
            if (selectedCurrentPosition === '17') {
                filteredRounds = filteredRounds.filter((item) => item.position !== 'Reserve' && item.position !== null)
            } else if (selectedCurrentPosition === '13') {
                filteredRounds = filteredRounds.filter((item) => item.position !== 'Reserve' && item.position !== null && item.position !== 'Interchange' && item.position !== 'Replacement')
            }
        }
        if(maxPrice !== null && maxPrice !== '') {
            filteredRounds = filteredRounds.filter((item) => item.price <= maxPrice)
        }
        sortRounds.set(filteredRounds.slice());
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = [...$sortRounds].sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            // if (key === 'fantasy_points_total' || key === 'owned_by') {
            //     aVal = parseFloat(aVal);
            //     bVal = parseFloat(bVal);
            // }

            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        sortRounds.set(sorted);
    }
</script>

<div style="display: flex">
    <Card class="mr-3 h-[572px] sticky top-0">
        <div style="margin-bottom: 2rem;" >
            <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Filters</h5>
            <div style="display: flex; align-items: flex-end; margin-top: 2rem">
                <label style="width: 20rem"> Name
                    <Search placeholder="Search by name" hoverable={true} bind:value={searchTerm}></Search>
                </label>
            </div>

            <div style="display: flex; align-items: flex-end; margin-top: 2rem">
                <label style="width: 20rem"> Max Price
                    <Search placeholder="Maximum price" hoverable={true} bind:value={maxPrice}></Search>
                </label>
            </div>

            <div style="width: 20rem; margin-top: 2rem">
                <Label>
                    Teams
                    <Select placeholder="Select team" class="mt-2" bind:value={selected} on:change={() => findPlayers()}>
                        <option selected value="all">All</option>

                        {#each teamSelection as { value, name }}
                            <option {value}>{name}</option>
                        {/each}
                    </Select>
                </Label>
            </div>

            <div style="margin-top: 2rem">
                <Label>
                    Positions
                    <Select placeholder="Select current postion" class="mt-2" bind:value={selectedCurrentPosition}>
                        <option selected value="any">Any</option>

                        {#each currentPositions as { value, name }}
                            <option {value}>{name}</option>
                        {/each}
                    </Select>
                </Label>
            </div>

            <div style="margin-top: 2rem">
                <Label>
                    Played in round?
                    <Select placeholder="Players who have played." class="mt-2" bind:value={played} on:change={() => findPlayers()}>
                        <option selected value="true">Yes</option>
                        <option value="false">Don't care</option>
                    </Select>
                </Label>
            </div>
        </div>
    </Card>
    <div class="table-container ">
        <Table shadow striped={true} hoverable={true} divClass="my-table w-[72rem] relative overflow-x-auto">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Player Rounds
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All stastics per player for a set round</p>
            </caption>
            <TableHead class="bg-[#FFFFFF]" theadClass="sticky top-0">
                <TableHeadCell padding="w-2"></TableHeadCell>
                <TableHeadCell padding="w-2">Player Name</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('price')} title="Price">Price</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('position')} title="Position">Position</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('fantasy_points_total')} title="Fantasy Points Total">FPT</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('minutes_played')} title="Minutes Played">MP</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('points')} title="Points">Pts</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('tries')} title="Tries">Tr</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('conversions')} title="Conversions">Conv</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('conversion_attempts')} title="Conversion Attempts">CA</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('penalty_goals')} title="Penalty Goals">PG</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('goal_conversion_rate')} title="Goal Conversion Rate">GCR</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('one_point_field_goals')} title="One Point Field Goals">OPFG</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('two_point_field_goals')} title="Two Point Field Goals">TPFG</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('all_runs')} title="All Runs">AR</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('all_run_meters')} title="All Run Meters">ARM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('kick_return_meters')} title="Kick Return Meters">KRM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('post_contact_meters')} title="Post Contact Meters">PCM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('line_breaks')} title="Line Breaks">LB</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('line_break_assists')} title="Line Break Assists">LBA</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('try_assists')} title="Try Assists">TA</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('line_engaged_runs')} title="Line Engaged Runs">LER</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('tackle_breaks')} title="Tackle Breaks">TB</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('play_the_ball')} title="Play The Ball">PTB</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('dummy_half_runs')} title="Dummy Half Runs">DHR</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('dummy_half_run_meters')} title="Dummy Half Run Meters">DHRM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('one_on_one_steal')} title="One On One Steal">OOS</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('offloads')} title="Offloads">Off</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('dummy_passes')} title="Dummy Passes">DP</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('passes')} title="Passes">Pass</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('receipts')} title="Receipts">Rec</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('passes_to_run_ratio')} title="Passes To Run Ratio">PRR</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('tackle_efficiency')} title="Tackle Efficiency">TE</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('tackles_made')} title="Tackles Made">TM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('missed_tackles')} title="Missed Tackles">MT</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('ineffective_tackles')} title="Ineffective Tackles">IT</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('intercepts')} title="Intercepts">Int</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('kicks_defused')} title="Kicks Defused">KD</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('kicks')} title="Kicks">Kicks</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('kick_meters')} title="Kick Meters">KM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('bomb_kicks')} title="Bomb Kicks">BK</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('grubber_kicks')} title="Grubber Kicks">GK</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('forty_twenties')} title="Forty Twenties">F20</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('twenty_forties')} title="Twenty Forties">T40</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('cross_field_kicks')} title="Cross Field Kicks">CFK</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('kicks_dead')} title="Kicks Dead">KD</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('handling_errors')} title="Handling Errors">HE</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('one_on_one_lost')} title="One On One Lost">OOL</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('penalties')} title="Penalties">Pen</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('ruck_infringements')} title="Ruck Infringements">RI</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('on_report')} title="On Report">OR</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('sin_bins')} title="Sin Bins">SB</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('send_offs')} title="Send Offs">SO</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('hit_ups')} title="Hit Ups">HU</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('field_goals')} title="Field Goals">FG</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('forced_drop_out_kicks')} title="Forced Drop Out Kicks">FDO</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('goals')} title="Goals">Goals</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('hit_up_run_meters')} title="Hit Up Run Meters">HURM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('offside_within_ten_meters')} title="Offside Within Ten Meters">OWTM</TableHeadCell>
                <TableHeadCell padding="px-2" on:click={() => sortTable('play_the_ball_average_speed')} title="Play The Ball Average Speed">PTBAS</TableHeadCell>
            </TableHead>


            <TableBody class="divide-y">
                {#each $sortRounds as round}
                    <PlayerRoundRow {round} />
                {/each}
            </TableBody>
        </Table>
    </div>
</div>

<style>
</style>