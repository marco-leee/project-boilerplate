<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="px-4 py-6 sm:px-0">
	<div class="border-4 border-dashed border-gray-200 rounded-lg">
		<div class="p-8">
			<h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<!-- Stats Cards -->
				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
									<span class="text-white text-sm">📊</span>
								</div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="text-sm font-medium text-gray-500 truncate">
										Total Users
									</dt>
									<dd class="text-lg font-medium text-gray-900">
										1,234
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
									<span class="text-white text-sm">💰</span>
								</div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="text-sm font-medium text-gray-500 truncate">
										Revenue
									</dt>
									<dd class="text-lg font-medium text-gray-900">
										$12,345
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-white overflow-hidden shadow rounded-lg">
					<div class="p-5">
						<div class="flex items-center">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white text-sm">⚡</span>
								</div>
							</div>
							<div class="ml-5 w-0 flex-1">
								<dl>
									<dt class="text-sm font-medium text-gray-500 truncate">
										Active Sessions
									</dt>
									<dd class="text-lg font-medium text-gray-900">
										45
									</dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Welcome Message -->
			<div class="mt-8 bg-white shadow rounded-lg p-6">
				<h2 class="text-xl font-semibold text-gray-900 mb-4">
					Welcome back, {$auth.user?.name}!
				</h2>
				<p class="text-gray-600">
					This is your protected dashboard. Only authenticated users can see this page.
					You're currently logged in as <strong>{$auth.user?.email}</strong>.
				</p>
				
				<div class="mt-4 flex space-x-4">
					<a 
						href="/profile" 
						class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						View Profile
					</a>
				</div>
			</div>
		</div>
	</div>
</div>
