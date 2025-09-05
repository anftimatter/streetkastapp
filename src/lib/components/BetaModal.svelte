<script lang="ts">
	let isOpen = $state(false);
	let email = $state('');
	let isSubmitting = $state(false);
	let submitted = $state(false);
	let error = $state('');

	export function open() {
		isOpen = true;
		email = '';
		submitted = false;
		error = '';
	}

	function close() {
		isOpen = false;
	}

	function handleOverlayClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			close();
		}
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		
		if (!email.trim()) {
			error = 'Please enter your email address';
			return;
		}

		isSubmitting = true;
		error = '';

		try {
			const response = await fetch('https://formspree.io/f/mnnvyloq', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					message: 'Android Beta Access Request'
				})
			});

			if (response.ok) {
				submitted = true;
				email = '';
			} else {
				throw new Error('Failed to submit');
			}
		} catch (err) {
			error = 'Something went wrong. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if isOpen}
	<!-- Modal Overlay -->
	<div 
		class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
		onclick={handleOverlayClick}
		onkeydown={(e) => e.key === 'Escape' && close()}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
	>
		<!-- Modal Content -->
		<div class="bg-white rounded-2xl shadow-xl max-w-md w-full will-change-transform transform-gpu transition-all duration-300 scale-100">
			<!-- Modal Header -->
			<div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
				<h2 id="modal-title" class="text-xl font-bold text-gray-900 font-display">Android Beta Access</h2>
				<button 
					onclick={close}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close modal"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Modal Body -->
			<div class="px-6 py-6">
				{#if submitted}
					<!-- Success State -->
					<div class="text-center">
						<div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg class="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Thanks for your interest!</h3>
						<p class="text-gray-600 mb-6">
							We'll notify you as soon as the Android beta is ready. Keep an eye on your inbox!
						</p>
						<button 
							onclick={close}
							class="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
						>
							Got it!
						</button>
					</div>
				{:else}
					<!-- Form State -->
					<div class="text-center mb-6">
						<div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg class="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 284 284">
								<path d="M256.109,110.673c-0.002,-9.212 -7.469,-16.679 -16.68,-16.676c-9.211,-0.007 -16.677,7.472 -16.676,16.685l0.012,69.853c-0.001,9.222 7.462,16.676 16.68,16.678c9.148,-0 16.675,-7.528 16.675,-16.676l0,-0.009l-0.012,-69.854l0.001,-0.001Zm-188.923,-13.505l0.025,108.251c-0.007,9.847 7.957,17.795 17.798,17.797l12.12,0.005l0.015,36.96c-0.003,9.2 7.477,16.683 16.668,16.683c9.217,0 16.684,-7.487 16.686,-16.694l-0.009,-36.953l22.52,-0.004l0.009,36.958c-0.002,9.197 7.484,16.69 16.674,16.675c9.217,0.006 16.688,-7.481 16.687,-16.69l-0.01,-36.948l12.161,-0.009c9.818,0.004 17.804,-7.956 17.805,-17.802l-0.018,-108.253l-149.131,0.025l-0,-0.001Zm108.748,-33.035c-3.474,0.003 -6.309,-2.813 -6.3,-6.299c0.012,-3.451 2.823,-6.3 6.303,-6.312c3.449,0.029 6.273,2.867 6.286,6.316l-0,0.007c-0,3.449 -2.838,6.288 -6.287,6.288l-0.002,-0m-68.417,0.012c-3.446,-0.012 -6.275,-2.849 -6.279,-6.295c0.001,-3.462 2.813,-6.307 6.285,-6.307c3.457,0.006 6.3,2.848 6.306,6.305c0.002,3.472 -2.823,6.295 -6.312,6.297m71.029,-32.854l11.643,-21.26c0.62,-1.111 0.22,-2.526 -0.914,-3.153c-1.135,-0.602 -2.538,-0.193 -3.138,0.926l-11.76,21.482c-9.904,-4.401 -20.969,-6.874 -32.686,-6.86c-11.687,-0.01 -22.754,2.45 -32.608,6.822l-11.772,-21.427c-0.614,-1.13 -2.021,-1.539 -3.133,-0.924c-1.133,0.609 -1.54,2.027 -0.919,3.135l11.648,21.246c-22.886,11.812 -38.347,34.279 -38.336,60.082l150.248,-0.015c0.004,-25.799 -15.43,-48.227 -38.281,-60.059m-134.515,62.726c-9.211,-0.004 -16.677,7.483 -16.679,16.68l0.013,69.851l-0,0.01c-0,9.147 7.528,16.675 16.675,16.675l0.021,0c9.14,0 16.661,-7.521 16.661,-16.661l0,-0.023l0.002,-69.862c-0.004,-9.201 -7.48,-16.675 -16.693,-16.67" style="fill-rule:nonzero;"/>
							</svg>
						</div>
						<h3 class="text-lg font-semibold text-gray-900 mb-2">Get early access</h3>
						<p class="text-gray-600">
							Be the first to try StreetKast on Android. We'll send you an invite when it's ready.
						</p>
					</div>

					<form onsubmit={handleSubmit}>
						<div class="mb-4">
							<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
								Email Address
							</label>
							<input 
								id="email"
								type="email" 
								bind:value={email}
								placeholder="your@email.com"
								class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-hidden transition-all"
								required
								disabled={isSubmitting}
							/>
						</div>

						{#if error}
							<div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
								<p class="text-sm text-red-600">{error}</p>
							</div>
						{/if}

						<div class="flex gap-3">
							<button 
								type="button"
								onclick={close}
								class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
								disabled={isSubmitting}
							>
								Cancel
							</button>
							<button 
								type="submit"
								class="flex-1 px-4 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Sending...
								{:else}
									Request Access
								{/if}
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Prevent body scroll when modal is open */
	:global(body:has(.modal-open)) {
		overflow: hidden;
	}
</style>