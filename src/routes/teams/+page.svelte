<script>
    import { onMount } from 'svelte';
    import { fetchGet } from '$lib/apiService.js';
    import { Card, Button } from 'flowbite-svelte';

    let teams = [];

    onMount(async () => {
        teams = await fetchGet('teams');
        console.log(teams)
    });

    async function findPlayers(team) {
        let players = await fetchGet('players', {team_id: team.id})
        console.log(players)
    }
</script>

<div class="team-grid">
    {#each teams as team}
        <Card>
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{team.name}</h5>
            <ul class="my-7 space-y-4">
                <li class="flex space-x-2 rtl:space-x-reverse">
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"> {team.short_name} </span>
                </li>
                <li class="flex space-x-2 rtl:space-x-reverse">
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"> ID: {team.id} </span>
                </li>
                <li class="flex space-x-2 rtl:space-x-reverse">
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"> NRL ID: {team.nrl_id} </span>
                </li>
                <li class="flex space-x-2 rtl:space-x-reverse">
                    <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400"> Updated: {new Date(team.updated_at).toLocaleDateString()} </span>
                </li>
            </ul>
            <Button on:click={() => findPlayers(team)} class="w-fit">
                Players?
            </Button>
        </Card>
    {/each}
</div>

<style>
    .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1rem;
        padding: 1rem;
    }
</style>