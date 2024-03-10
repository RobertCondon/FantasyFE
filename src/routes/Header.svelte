<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import logo from '$lib/images/logo.png';
</script>

<Navbar rounded color="form">
	<NavBrand href="/">
		<img src={logo} class="me-3 h-12 sm:h-12" alt="NRL statstics Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NRL Stats</span>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/teams">Teams</NavLi>
		<NavLi href="/players">Players</NavLi>
		<NavLi href="/rounds">Player Rounds</NavLi>
	</NavUl>
</Navbar>

<style>
</style>
