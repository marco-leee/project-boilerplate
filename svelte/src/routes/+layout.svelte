<script lang="ts">
	import '../app.css';
	import { auth } from '$lib/stores/auth';

	import { onMount } from 'svelte';
	import {
		Alert,
		Navbar,
		NavBrand,
		NavHamburger,
		NavUl,
		NavLi,
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownGroup,
		DropdownItem
	} from 'flowbite-svelte';
	import { UserOutline } from 'flowbite-svelte-icons';
	import NavBar from '$lib/components/NavBar.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	let { children } = $props();
	let docsRoute = ['Dashboard', 'Profile', 'Kanban'];
	onMount(() => {
		// Initialize auth store on app start
		auth.init();
	});

	let drawerHidden = $state(false);
</script>

<header
	class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
>
	<NavBar bind:drawerHidden list />
</header>
<div class="overflow-hidden lg:flex">
	<SideBar bind:drawerHidden {docsRoute} />
	<div class="relative h-full w-full overflow-y-auto pt-[70px] lg:ml-64">
		{@render children()}
	</div>
</div>
