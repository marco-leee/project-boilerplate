<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="px-4 py-6 sm:px-0">
	<div class="rounded-lg border-4 border-dashed border-gray-200">
		<div class="p-8">
			<h1 class="mb-6 text-3xl font-bold text-gray-900">Dashboard</h1>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<!-- Stats Cards -->
				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
									<span class="text-sm text-white">📊</span>
								</div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="truncate text-sm font-medium text-gray-500">Total Users</dt>
									<dd class="text-lg font-medium text-gray-900">1,234</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
									<span class="text-sm text-white">💰</span>
								</div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="truncate text-sm font-medium text-gray-500">Revenue</dt>
									<dd class="text-lg font-medium text-gray-900">$12,345</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-lg bg-white shadow">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
									<span class="text-sm text-white">⚡</span>
								</div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="truncate text-sm font-medium text-gray-500">Active Sessions</dt>
									<dd class="text-lg font-medium text-gray-900">45</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Welcome Message -->
			<div class="mt-8 rounded-lg bg-white p-6 shadow">
				<h2 class="mb-4 text-xl font-semibold text-gray-900">
					Welcome back, {$auth.user?.name}!
				</h2>
				<p class="text-gray-600">
					This is your protected dashboard. Only authenticated users can see this page. You're
					currently logged in as <strong>{$auth.user?.email}</strong>.
				</p>

				<div class="mt-4 flex space-x-4">
					<a
						href="/profile"
						class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						View Profile
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
