<script lang="ts">
	import { onMount } from 'svelte';
	import LazyImage from './LazyImage.svelte';

	interface Props {
		images: Array<{ src: string; alt: string; }>;
		class?: string;
	}

	let { images, class: className = '' }: Props = $props();
	
	let carouselElement: HTMLDivElement;
	let visibleIndices = $state(new Set([0, 1])); // Start with first two visible

	onMount(() => {
		if (!carouselElement) return;

		const handleScroll = () => {
			const carousel = carouselElement;
			const itemWidth = carousel.scrollWidth / images.length;
			const scrollLeft = carousel.scrollLeft;
			const viewportWidth = carousel.offsetWidth;

			// Calculate which items are visible or about to be visible
			const startIndex = Math.max(0, Math.floor(scrollLeft / itemWidth) - 1);
			const endIndex = Math.min(images.length - 1, Math.ceil((scrollLeft + viewportWidth) / itemWidth) + 1);

			const newVisibleIndices = new Set<number>();
			for (let i = startIndex; i <= endIndex; i++) {
				newVisibleIndices.add(i);
			}
			
			visibleIndices = newVisibleIndices;
		};

		// Add scroll listener with throttling
		let ticking = false;
		const throttledScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					handleScroll();
					ticking = false;
				});
				ticking = true;
			}
		};

		carouselElement.addEventListener('scroll', throttledScroll, { passive: true });
		
		// Initial calculation
		handleScroll();

		return () => {
			carouselElement?.removeEventListener('scroll', throttledScroll);
		};
	});

	// Mouse drag functionality for desktop
	let isDragging = false;
	let startX = 0;
	let scrollLeft = 0;

	function onMouseDown(e: MouseEvent) {
		isDragging = true;
		carouselElement.style.cursor = 'grabbing';
		carouselElement.style.scrollBehavior = 'auto'; // Disable smooth scrolling during drag
		startX = e.pageX - carouselElement.offsetLeft;
		scrollLeft = carouselElement.scrollLeft;
		e.preventDefault();
	}

	function onMouseMove(e: MouseEvent) {
		if (!isDragging) return;
		e.preventDefault();
		const x = e.pageX - carouselElement.offsetLeft;
		const walk = (x - startX) * 1; // 1:1 ratio for smooth dragging
		carouselElement.scrollLeft = scrollLeft - walk;
	}

	function onMouseUp() {
		isDragging = false;
		carouselElement.style.cursor = 'grab';
		carouselElement.style.scrollBehavior = 'smooth'; // Re-enable smooth scrolling
	}

	function onMouseLeave() {
		isDragging = false;
		carouselElement.style.cursor = 'grab';
		carouselElement.style.scrollBehavior = 'smooth'; // Re-enable smooth scrolling
	}

</script>

<div 
	bind:this={carouselElement} 
	class="flex gap-8 py-8 snap-x snap-mandatory scrollbar-hide px-8 overflow-x-auto overflow-y-hidden cursor-grab select-none {className}"
	on:mousedown={onMouseDown}
	on:mousemove={onMouseMove}
	on:mouseup={onMouseUp}
	on:mouseleave={onMouseLeave}
>
	{#each images as image, index}
		<div class="flex-none snap-center animate-scale-in" style="transition-delay: {index * 50}ms">
			<div class="carousel-image relative">
				<LazyImage 
					src={image.src} 
					alt={image.alt} 
					class="h-96 w-auto"
					eager={visibleIndices.has(index)}
				/>
			</div>
		</div>
	{/each}
</div>

<style>
	.carousel-image {
		transform: scale(1);
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		will-change: transform;
	}
	
	.carousel-image:hover {
		transform: scale(1.05);
		transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
</style>

