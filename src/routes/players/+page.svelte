<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '$lib/apiService.js';
    import { Card, Select, Label, Table, TableBody, TableHead, TableHeadCell, Search } from 'flowbite-svelte';
    import { writable } from 'svelte/store';
    import PlayerRow from './PlayerRow.svelte';
    let selected;
    let selectedCurrentPosition = 'any';
    let maxPrice = null;
    let currentPositions = [{
        value: "17",
        name: "All 17 (Starting and Bench)"
    },
    {
        value: "13",
        name: "Starting 13"
    }];
    let teamSelection = [];
    let searchTerm = '';
    let teams = [];
    let players = [];

    onMount(async () => {
        teams = await fetchGet('teams');
        players = await fetchGet('players')
        teamSelection = teams.map(team => ({
            value: team.id,
            name: team.name
        }));
    });

    async function findPlayers() {
        if (selected === 'all') {
            players = await fetchGet('players')
        } else {
            players = await fetchGet('players', { team_id: selected })
        }

        // Reset sorting to default state when a new team is selected
        sortKey.set('id');
        sortDirection.set(1);
    }

    const sortKey = writable('id');
    const sortDirection = writable(1);
    const sortPlayers = writable(players.slice());

    const sortTable = (key) => {
        if ($sortKey === key) {
            sortDirection.update((val) => -val);
        } else {
            sortKey.set(key);
            sortDirection.set(1);
        }
    };

    const getSortArrow = (key) => {
        if ($sortKey === key) {
            return $sortDirection === 1 ? '▲' : '▼';
        }
        return '';
    };

    $: {
        let filteredPlayers = players.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
        if (selectedCurrentPosition !== 'any') {
            if (selectedCurrentPosition === '17') {
                filteredPlayers = filteredPlayers.filter((item) => item.current_position !== 'Reserve' && item.current_position !== null)
            } else if (selectedCurrentPosition === '13') {
                filteredPlayers = filteredPlayers.filter((item) => item.current_position !== 'Reserve' && item.current_position !== null && item.current_position !== 'Interchange' && item.current_position !== 'Replacement')
            }
        }
        if(maxPrice !== null && maxPrice !== '') {
            filteredPlayers = filteredPlayers.filter((item) => item.cost <= maxPrice)
        }
        sortPlayers.set(filteredPlayers.slice());
        const key = $sortKey;
        const direction = $sortDirection;
        const sorted = [...$sortPlayers].sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];

            if (key === 'fantasy_points_average' || key === 'owned_by') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }

            if (aVal < bVal) {
                return -direction;
            } else if (aVal > bVal) {
                return direction;
            }
            return 0;
        });
        sortPlayers.set(sorted);
    }
</script>

<div style="display: flex">
    <Card class="mr-3 h-[572px]">
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
        </div>
    </Card>
    <div class="table-container">
        <Table shadow striped={true} hoverable={true} divClass="my-table">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Players
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">All current pickable fantasy players. Click to see each round they have played..</p>
            </caption>
            <TableHead class="bg-[#FFFFFF]">
                <TableHeadCell></TableHeadCell>
                <TableHeadCell on:click={() => sortTable('name')}>Name</TableHeadCell>
                <TableHeadCell on:click={() => sortTable('cost')}>Price</TableHeadCell>
                <TableHeadCell on:click={() => sortTable('owned_by')}>Owned By</TableHeadCell>
                <TableHeadCell on:click={() => sortTable('position')}>Position</TableHeadCell>
                <TableHeadCell on:click={() => sortTable('current_position')}>Current Position</TableHeadCell>
                <TableHeadCell on:click={() => sortTable('fantasy_points_average')}>Avg Fantasy</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each $sortPlayers as player}
                    <PlayerRow {player} />
                {/each}
            </TableBody>
        </Table>
    </div>
</div>

<style>
</style>