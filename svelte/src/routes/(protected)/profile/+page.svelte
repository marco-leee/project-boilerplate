<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="px-4 py-6 sm:px-0">
	<div class="max-w-3xl mx-auto">
		<div class="bg-white shadow rounded-lg">
			<div class="px-4 py-5 sm:p-6">
				<h1 class="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>
				
				<!-- Profile Information -->
				<div class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700">
							Name
						</label>
						<div class="mt-1">
							<input
								id="name"
								type="text"
								value={$auth.user?.name || ''}
								readonly
								class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>

					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">
							Email Address
						</label>
						<div class="mt-1">
							<input
								id="email"
								type="email"
								value={$auth.user?.email || ''}
								readonly
								class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>

					<div>
						<label for="user-id" class="block text-sm font-medium text-gray-700">
							User ID
						</label>
						<div class="mt-1">
							<input
								id="user-id"
								type="text"
								value={$auth.user?.id || ''}
								readonly
								class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
							/>
						</div>
					</div>
				</div>

				<!-- Account Settings -->
				<div class="mt-8 pt-8 border-t border-gray-200">
					<h2 class="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
					
					<div class="space-y-4">
						<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
							<div>
								<h3 class="text-sm font-medium text-gray-900">
									Two-Factor Authentication
								</h3>
								<p class="text-sm text-gray-500">
									Add an extra layer of security to your account
								</p>
							</div>
							<button class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300">
								Enable
							</button>
						</div>

						<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
							<div>
								<h3 class="text-sm font-medium text-gray-900">
									Email Notifications
								</h3>
								<p class="text-sm text-gray-500">
									Receive notifications about account activity
								</p>
							</div>
							<button class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
								Enabled
							</button>
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="mt-8 pt-8 border-t border-gray-200">
					<div class="flex justify-between">
						<a 
							href="/dashboard" 
							class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							← Back to Dashboard
						</a>
						
						<button 
							onclick={() => auth.logout()}
							class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
