<script lang="ts">
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import LoginForm from '$lib/components/login-form.svelte';
	import { APP_NAME } from '$lib/const';
	import { auth } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { toast } from "svelte-sonner";

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	onMount(() => {
		const unsubscribe = auth.subscribe(($auth: any) => {
			console.log($auth);
			if ($auth.isAuthenticated && !$auth.loading) {
				toast.success('Login successful');
				goto('/dashboard');
			}
		});

		return unsubscribe;
	});

	async function handleSubmit(event: Event) {
		event.preventDefault();
		loading = true;
		error = '';

		const result = await auth.login(email, password);

		if (result.success) {
			goto('/dashboard');
		} else {
			error = result.error || 'Login failed';
		}

		loading = false;
	}
</script>

<div class="grid min-h-svh lg:grid-cols-2">
	<div class="flex flex-col gap-4 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a href="/" class="flex items-center gap-2 font-medium">
				<div
					class="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
				>
					<GalleryVerticalEndIcon class="size-4" />
				</div>
				{APP_NAME}
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<LoginForm onsubmit={handleSubmit} />
			</div>
		</div>
	</div>
	<div class="relative hidden bg-muted lg:block">
		<img
			src="/stickman.png"
			alt="placeholder"
			class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>
