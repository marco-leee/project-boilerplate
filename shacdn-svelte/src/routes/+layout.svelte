<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { auth, type AuthState } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';
	import { toast } from "svelte-sonner";
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();

	onMount(() => {
		auth.init();

		const unsubscribe = auth.subscribe(($auth: AuthState) => {
			if ($auth.isAuthenticated && !$auth.loading) {
				goto('/dashboard');
			} else if (!$auth.isAuthenticated && !$auth.loading) {
				toast.error('Please login to continue');
				goto('/login');
			}
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

{@render children?.()}

<Toaster />