<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		src: string;
		alt: string;
		class?: string;
		skeleton?: boolean;
		eager?: boolean;
	}

	let { src, alt, class: className = '', skeleton = true, eager = false }: Props = $props();

	let loaded = $state(false);
	let error = $state(false);
	let loading = $state(false);
	let containerElement: HTMLDivElement;
	let observer: IntersectionObserver | null = null;

	onMount(() => {
		if (eager) {
			// Load immediately for critical images
			loadImage();
		} else if (containerElement) {
			// Use more aggressive intersection observer settings
			observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting && !loading && !loaded && !error) {
							loadImage();
							observer?.unobserve(entry.target);
						}
					});
				},
				{ 
					threshold: 0.01, // Very low threshold to trigger early
					rootMargin: '50px' // Start loading 50px before element is visible
				}
			);

			observer.observe(containerElement);
		}

		return () => {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
		};
	});

	function loadImage() {
		if (loading || loaded || error) return;
		
		loading = true;
		const img = new Image();
		
		const handleLoad = () => {
			loaded = true;
			loading = false;
			img.removeEventListener('load', handleLoad);
			img.removeEventListener('error', handleError);
		};

		const handleError = () => {
			error = true;
			loading = false;
			img.removeEventListener('load', handleLoad);
			img.removeEventListener('error', handleError);
			
			// Retry once after a short delay
			setTimeout(() => {
				if (error && !loaded) {
					error = false;
					loading = false;
					loadImage();
				}
			}, 1000);
		};

		img.addEventListener('load', handleLoad);
		img.addEventListener('error', handleError);
		img.src = src;
	}
</script>

<div bind:this={containerElement} class="relative {className}">
	{#if skeleton && !loaded && !error}
		<div class="skeleton w-full h-full rounded-lg animate-pulse bg-gray-200"></div>
	{/if}
	
	{#if loading && !skeleton}
		<div class="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-lg">
			<div class="w-8 h-8 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
		</div>
	{/if}
	
	<img
		{src}
		{alt}
		class="transition-all duration-300 {loaded ? 'opacity-100' : 'opacity-0'} {className}"
		loading={eager ? 'eager' : 'lazy'}
		style="transition-property: opacity, transform, box-shadow;"
	/>
	
	{#if error}
		<div class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
			<div class="text-center text-gray-500">
				<svg class="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
				</svg>
				<p class="text-sm">Retrying...</p>
			</div>
		</div>
	{/if}
</div>