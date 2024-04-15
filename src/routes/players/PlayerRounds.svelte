<script>
    import { Heading, Secondary, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
    import PlayerRoundRow from "../PlayerRoundRow.svelte";

    export let playerRounds = [];
    export let player;
    let modalActive = true;

</script>
<Modal bind:open={modalActive} autoclose outsideclose size="xl">
    <header>
        <div style="display: flex">
            <img src={player.image_url} alt={player.name} style="width: 100px; height: 66px; margin-right: 10px"/>
            <Heading tag="h3" customSize="text-5xl font-extrabold" align="center">
                {player.name} <Secondary class="ms-2">{player.current_position} ({player.position})</Secondary>
            </Heading>
        </div>
    </header>
    <div>
        <Table shadow striped={true} hoverable={true} color="purple" divClass="relative overflow-x-auto">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Player Rounds
            </caption>
            <TableHead theadClass="sticky top-0">
                <TableHeadCell padding="w-2"></TableHeadCell>
                <TableHeadCell padding="w-2">Player Name</TableHeadCell>
                <TableHeadCell padding="px-2" title="Price">Price</TableHeadCell>
                <TableHeadCell padding="px-2" title="Position">Position</TableHeadCell>
                <TableHeadCell padding="px-2" title="Fantasy Points Total">FPT</TableHeadCell>
                <TableHeadCell padding="px-2"  title="Minutes Played">MP</TableHeadCell>
                <TableHeadCell padding="px-2"  title="Points">Pts</TableHeadCell>
                <TableHeadCell padding="px-2" title="Tries">Tr</TableHeadCell>
                <TableHeadCell padding="px-2" title="Conversions">Conv</TableHeadCell>
                <TableHeadCell padding="px-2" title="Conversion Attempts">CA</TableHeadCell>
                <TableHeadCell padding="px-2" title="Penalty Goals">PG</TableHeadCell>
                <TableHeadCell padding="px-2" title="Goal Conversion Rate">GCR</TableHeadCell>
                <TableHeadCell padding="px-2" title="One Point Field Goals">OPFG</TableHeadCell>
                <TableHeadCell padding="px-2" title="Two Point Field Goals">TPFG</TableHeadCell>
                <TableHeadCell padding="px-2" title="All Runs">AR</TableHeadCell>
                <TableHeadCell padding="px-2" title="All Run Meters">ARM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Kick Return Meters">KRM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Post Contact Meters">PCM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Line Breaks">LB</TableHeadCell>
                <TableHeadCell padding="px-2" title="Line Break Assists">LBA</TableHeadCell>
                <TableHeadCell padding="px-2" title="Try Assists">TA</TableHeadCell>
                <TableHeadCell padding="px-2" title="Line Engaged Runs">LER</TableHeadCell>
                <TableHeadCell padding="px-2" title="Tackle Breaks">TB</TableHeadCell>
                <TableHeadCell padding="px-2" title="Play The Ball">PTB</TableHeadCell>
                <TableHeadCell padding="px-2" title="Dummy Half Runs">DHR</TableHeadCell>
                <TableHeadCell padding="px-2" title="Dummy Half Run Meters">DHRM</TableHeadCell>
                <TableHeadCell padding="px-2" title="One On One Steal">OOS</TableHeadCell>
                <TableHeadCell padding="px-2" title="Offloads">Off</TableHeadCell>
                <TableHeadCell padding="px-2" title="Dummy Passes">DP</TableHeadCell>
                <TableHeadCell padding="px-2" title="Passes">Pass</TableHeadCell>
                <TableHeadCell padding="px-2" title="Receipts">Rec</TableHeadCell>
                <TableHeadCell padding="px-2" title="Passes To Run Ratio">PRR</TableHeadCell>
                <TableHeadCell padding="px-2" title="Tackle Efficiency">TE</TableHeadCell>
                <TableHeadCell padding="px-2" title="Tackles Made">TM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Missed Tackles">MT</TableHeadCell>
                <TableHeadCell padding="px-2" title="Ineffective Tackles">IT</TableHeadCell>
                <TableHeadCell padding="px-2" title="Intercepts">Int</TableHeadCell>
                <TableHeadCell padding="px-2" title="Kicks Defused">KD</TableHeadCell>
                <TableHeadCell padding="px-2" title="Kicks">Kicks</TableHeadCell>
                <TableHeadCell padding="px-2" title="Kick Meters">KM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Bomb Kicks">BK</TableHeadCell>
                <TableHeadCell padding="px-2" title="Grubber Kicks">GK</TableHeadCell>
                <TableHeadCell padding="px-2" title="Forty Twenties">F20</TableHeadCell>
                <TableHeadCell padding="px-2" title="Twenty Forties">T40</TableHeadCell>
                <TableHeadCell padding="px-2" title="Cross Field Kicks">CFK</TableHeadCell>
                <TableHeadCell padding="px-2" title="Kicks Dead">KD</TableHeadCell>
                <TableHeadCell padding="px-2" title="Handling Errors">HE</TableHeadCell>
                <TableHeadCell padding="px-2" title="One On One Lost">OOL</TableHeadCell>
                <TableHeadCell padding="px-2" title="Penalties">Pen</TableHeadCell>
                <TableHeadCell padding="px-2" title="Ruck Infringements">RI</TableHeadCell>
                <TableHeadCell padding="px-2" title="On Report">OR</TableHeadCell>
                <TableHeadCell padding="px-2" title="Sin Bins">SB</TableHeadCell>
                <TableHeadCell padding="px-2" title="Send Offs">SO</TableHeadCell>
                <TableHeadCell padding="px-2" title="Hit Ups">HU</TableHeadCell>
                <TableHeadCell padding="px-2" title="Field Goals">FG</TableHeadCell>
                <TableHeadCell padding="px-2" title="Forced Drop Out Kicks">FDO</TableHeadCell>
                <TableHeadCell padding="px-2" title="Goals">Goals</TableHeadCell>
                <TableHeadCell padding="px-2" title="Hit Up Run Meters">HURM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Offside Within Ten Meters">OWTM</TableHeadCell>
                <TableHeadCell padding="px-2" title="Play The Ball Average Speed">PTBAS</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each playerRounds as round}
                    <PlayerRoundRow {round} />
                {/each}
            </TableBody>
        </Table>
    </div>
</Modal>