<script>
    import { Heading, Secondary, Modal, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

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
        <Table shadow striped={true} hoverable={true} color="purple">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Player Rounds
            </caption>
            <TableHead>
                <TableHeadCell>Year</TableHeadCell>
                <TableHeadCell>Round</TableHeadCell>
                <TableHeadCell>Points</TableHeadCell>
                <TableHeadCell>Mins</TableHeadCell>
                <TableHeadCell>Point PM</TableHeadCell>
                <TableHeadCell>R</TableHeadCell>
                <TableHeadCell>RM</TableHeadCell>
                <TableHeadCell>BK</TableHeadCell>
                <TableHeadCell>CA</TableHeadCell>
                <TableHeadCell>C</TableHeadCell>
                <TableHeadCell>CFK</TableHeadCell>
            </TableHead>
            <TableBody class="divide-y">
                {#each playerRounds as round}
                <TableBodyRow>
                    <TableBodyCell>{round.match.year}</TableBodyCell>
                    <TableBodyCell>{round.match.round}</TableBodyCell>
                    <TableBodyCell>{round.fantasy_points_total}</TableBodyCell>
                    <TableBodyCell>{round.minutes_played}</TableBodyCell>
                    <TableBodyCell>{parseFloat(round.fantasy_points_total/round.minutes_played).toFixed(2)}</TableBodyCell>
                    <TableBodyCell>{round.all_runs}</TableBodyCell>
                    <TableBodyCell>{round.all_run_meters}</TableBodyCell>
                    <TableBodyCell>{round.bomb_kicks}</TableBodyCell>
                    <TableBodyCell>{round.conversion_attempts}</TableBodyCell>
                    <TableBodyCell>{round.conversions}</TableBodyCell>
                    <TableBodyCell>{round.cross_field_kicks}</TableBodyCell>
                </TableBodyRow>
                {/each}
            </TableBody>
        </Table>
    </div>
</Modal>