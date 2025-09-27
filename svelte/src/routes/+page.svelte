<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>Welcome - SvelteAuth</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8 text-center">
		<div>
			<h1 class="text-4xl font-extrabold text-gray-900 mb-4">
				Welcome to SvelteAuth
			</h1>
			<p class="text-lg text-gray-600 mb-8">
				A simple authentication demo with protected routes
			</p>
		</div>

		{#if $auth.isAuthenticated}
			<div class="space-y-4">
				<p class="text-green-600 font-medium">
					✅ You are logged in as {$auth.user?.name}
				</p>
				<div class="space-y-2">
					<a 
						href="/dashboard" 
						class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						Go to Dashboard
					</a>
					<a 
						href="/profile" 
						class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						View Profile
					</a>
				</div>
			</div>
		{:else}
			<div class="space-y-4">
				<p class="text-gray-600">
					Please log in to access protected areas
				</p>
				<a 
					href="/login" 
					class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Login
				</a>
			</div>
		{/if}

		<div class="mt-8 pt-8 border-t border-gray-200">
			<h2 class="text-lg font-semibold text-gray-900 mb-2">
				Demo Instructions
			</h2>
			<ul class="text-sm text-gray-600 space-y-1 text-left">
				<li>• Enter any email and password to login</li>
				<li>• Try accessing <code class="bg-gray-100 px-1 rounded">/dashboard</code> without logging in</li>
				<li>• Check how protected routes redirect to login</li>
				<li>• Login state persists across browser refreshes</li>
			</ul>
		</div>
	</div>
</div>
