<script lang="ts">
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
	import { ChartOutline, GridSolid, MailBoxSolid, UserSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/state';
	let activeUrl = $state(page.url.pathname);
	const spanClass = 'flex-1 ms-3 whitespace-nowrap';
	const demoSidebarUi = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = demoSidebarUi.close;
	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
		activeUrl = page.url.pathname;
	});

	let { children } = $props();

	onMount(() => {
		// Initialize auth store
		auth.init();

		// Subscribe to auth changes
		const unsubscribe = auth.subscribe(($auth: any) => {
			// Only redirect if not loading and not authenticated
			if (!$auth.loading && !$auth.isAuthenticated) {
				goto('/login');
			}
		});

		return unsubscribe;
	});
</script>

{#if $auth.loading}
	<div class="flex min-h-screen items-center justify-center">
		<div class="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
	</div>
{:else if $auth.isAuthenticated}
	<!-- Container that accounts for navbar height -->
	<div class="flex h-[calc(100vh-4rem)]">
		<!-- Sidebar Button - positioned relative to navbar -->
		<SidebarButton
			breakpoint="lg"
			onclick={demoSidebarUi.toggle}
			class="fixed top-20 left-4 z-30"
		/>

		<!-- Sidebar -->
		<Sidebar
			{activeUrl}
			backdrop={false}
			isOpen={isDemoOpen}
			closeSidebar={demoSidebarUi.close}
			params={{ x: -50, duration: 50 }}
			class="z-30 mt-0 h-full border-r border-gray-200"
			classes={{ nonactive: 'p-2', active: 'p-2' }}
		>
			<SidebarGroup>
				<SidebarItem label="Dashboard" href="/dashboard">
					{#snippet icon()}
						<ChartOutline
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					{/snippet}
				</SidebarItem>
				<SidebarItem label="Profile" {spanClass} href="/profile">
					{#snippet icon()}
						<UserSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					{/snippet}
				</SidebarItem>
				<SidebarItem label="Kanban" {spanClass} href="/">
					{#snippet icon()}
						<GridSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					{/snippet}
					{#snippet subtext()}
						<span
							class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
							>Pro</span
						>
					{/snippet}
				</SidebarItem>
				<SidebarItem label="Inbox" {spanClass} href="/">
					{#snippet icon()}
						<MailBoxSolid
							class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
						/>
					{/snippet}
					{#snippet subtext()}
						<span
							class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary-200 p-3 text-sm font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-200"
							>3</span
						>
					{/snippet}
				</SidebarItem>
			</SidebarGroup>
		</Sidebar>

		<!-- Main Content Area -->
		<div class="flex flex-1">
			<!-- Main Content -->
			<main class="flex-1 overflow-y-auto bg-gray-50 p-6">
				{@render children()}
			</main>

			<!-- Right Sidebar (optional) -->
			<!-- <aside class="w-64 bg-white border-l border-gray-200 p-4">
				<h3 class="text-lg font-semibold mb-4">Right Panel</h3>
				<p class="text-gray-600">Additional content or tools can go here.</p>
			</aside> -->
		</div>
	</div>
{:else}
	<!-- This shouldn't show, but just in case -->
	<div class="flex min-h-screen items-center justify-center">
		<p>Redirecting to login...</p>
	</div>
{/if}
