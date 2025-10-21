<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>Welcome - SvelteAuth</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 text-center">
		<div>
			<h1 class="mb-4 text-4xl font-extrabold text-gray-900">Welcome to SvelteAuth</h1>
			<p class="mb-8 text-lg text-gray-600">A simple authentication demo with protected routes</p>
		</div>

		{#if $auth.isAuthenticated}
			<div class="space-y-4">
				<p class="font-medium text-green-600">
					✅ You are logged in as {$auth.user?.name}
				</p>
				<div class="space-y-2">
					<a
						href="/dashboard"
						class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						Go to Dashboard
					</a>
					<a
						href="/profile"
						class="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						View Profile
					</a>
				</div>
			</div>
		{:else}
			<div class="space-y-4">
				<p class="text-gray-600">Please log in to access protected areas</p>
				<a
					href="/login"
					class="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
				>
					Login
				</a>
			</div>
		{/if}

		<div class="mt-8 border-t border-gray-200 pt-8">
			<h2 class="mb-2 text-lg font-semibold text-gray-900">Demo Instructions</h2>
			<ul class="space-y-1 text-left text-sm text-gray-600">
				<li>• Enter any email and password to login</li>
				<li>
					• Try accessing <code class="rounded bg-gray-100 px-1">/dashboard</code> without logging in
				</li>
				<li>• Check how protected routes redirect to login</li>
				<li>• Login state persists across browser refreshes</li>
			</ul>
		</div>
	</div>
</div>
