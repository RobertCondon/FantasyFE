<script>
    import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
    import { fetchGet } from '$lib/apiService.js';
    import PlayerRounds from './PlayerRounds.svelte';

    export let player;
    let openRow = false;
    let playerRounds = []
    let player_img = 'https://fantasy.nrl.com/assets/media/players/nrl/509565_100.webp'

    function toggleRow() {
        openRow = !openRow;
        if (playerRounds.length === 0) {
            getRounds()
        }
    }

    async function getRounds() {
        console.log("getting rounds")
        console.log(player.image_url)
        playerRounds = await fetchGet('player_rounds', { player_id: player.id })
        console.log(playerRounds)
    }
</script>

<TableBodyRow on:click={() => toggleRow()}>
    <TableBodyCell>
    {#if player.image_url}
        <img src={player.image_url} alt={player.name} style="width: 60px; height: 40px;"/>
    {:else}
        <img src={player_img} alt={player.name} style="width: 60px; height: 40px;"/>
    {/if}
    </TableBodyCell>
    <TableBodyCell>{player.name}</TableBodyCell>
    <TableBodyCell>{player.cost}</TableBodyCell>
    <TableBodyCell>{player.owned_by}%</TableBodyCell>
    <TableBodyCell>{player.position}</TableBodyCell>
    <TableBodyCell>{player.current_position}</TableBodyCell>
    <TableBodyCell>{player.fantasy_points_average}</TableBodyCell>
</TableBodyRow>
{#if openRow === true}
    <PlayerRounds {playerRounds} {player}}/>
{/if}