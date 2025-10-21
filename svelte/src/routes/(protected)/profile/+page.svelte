<script lang="ts">
	import { auth } from '$lib/stores/auth';
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class="px-4 py-6 sm:px-0">
	<div class="mx-auto max-w-3xl">
		<div class="rounded-lg bg-white shadow">
			<div class="px-4 py-5 sm:p-6">
				<h1 class="mb-6 text-2xl font-bold text-gray-900">User Profile</h1>

				<!-- Profile Information -->
				<div class="space-y-6">
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700"> Name </label>
						<div class="mt-1">
							<input
								id="name"
								type="text"
								value={$auth.user?.name || ''}
								readonly
								class="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
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
								class="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
					</div>

					<div>
						<label for="user-id" class="block text-sm font-medium text-gray-700"> User ID </label>
						<div class="mt-1">
							<input
								id="user-id"
								type="text"
								value={$auth.user?.id || ''}
								readonly
								class="block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
							/>
						</div>
					</div>
				</div>

				<!-- Account Settings -->
				<div class="mt-8 border-t border-gray-200 pt-8">
					<h2 class="mb-4 text-lg font-medium text-gray-900">Account Settings</h2>

					<div class="space-y-4">
						<div class="flex items-center justify-between rounded-lg border border-gray-200 p-4">
							<div>
								<h3 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
								<p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
							</div>
							<button
								class="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
							>
								Enable
							</button>
						</div>

						<div class="flex items-center justify-between rounded-lg border border-gray-200 p-4">
							<div>
								<h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
								<p class="text-sm text-gray-500">Receive notifications about account activity</p>
							</div>
							<button
								class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
							>
								Enabled
							</button>
						</div>
					</div>
				</div>

				<!-- Actions -->
				<div class="mt-8 border-t border-gray-200 pt-8">
					<div class="flex justify-between">
						<a
							href="/dashboard"
							class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							← Back to Dashboard
						</a>

						<button
							onclick={() => auth.logout()}
							class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
