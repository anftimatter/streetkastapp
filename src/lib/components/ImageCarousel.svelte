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

	// Desktop: map vertical wheel to horizontal scroll with edge pass-through
	function handleWheel(event: WheelEvent) {
		const el = carouselElement;
		if (!el) return;

		const hasHorizontalOverflow = el.scrollWidth > el.clientWidth;
		const isMostlyVertical = Math.abs(event.deltaY) > Math.abs(event.deltaX);
		if (!hasHorizontalOverflow || !isMostlyVertical) return;

		const atStart = el.scrollLeft <= 0;
		const atEnd = Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;

		// If trying to scroll beyond edges, allow page to scroll
		const horizontalDelta = event.deltaY;
		if ((horizontalDelta < 0 && atStart) || (horizontalDelta > 0 && atEnd)) {
			return;
		}

		// Consume event and scroll horizontally
		event.preventDefault();
		el.scrollLeft += horizontalDelta;
	}

	// Mobile touch handling: only intercept horizontal drags
	let touchStartX = 0;
	let touchStartY = 0;
	let gestureLocked: 'horizontal' | 'vertical' | null = null;

	function onTouchStart(e: TouchEvent) {
		const t = e.touches[0];
		touchStartX = t.clientX;
		touchStartY = t.clientY;
		gestureLocked = null;
	}

	function onTouchMove(e: TouchEvent) {
		const el = carouselElement;
		if (!el) return;

		const t = e.touches[0];
		const dx = t.clientX - touchStartX;
		const dy = t.clientY - touchStartY;

		if (gestureLocked === null) {
			if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
				gestureLocked = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
			}
		}

		if (gestureLocked === 'horizontal') {
			// Prevent page scroll and move carousel
			e.preventDefault();
			el.scrollLeft -= dx;
			touchStartX = t.clientX; // reset baseline for smooth dragging
		} else {
			// Vertical gesture: allow page to scroll
			return;
		}
	}

	function onTouchEnd() {
		gestureLocked = null;
	}
</script>

<div bind:this={carouselElement} onwheel={handleWheel} ontouchstart={onTouchStart} ontouchmove={onTouchMove} ontouchend={onTouchEnd} class="flex gap-8 py-8 snap-x snap-mandatory scrollbar-hide px-8 carousel-container {className}">
	{#each images as image, index}
		<div class="flex-none snap-center animate-scale-in" style="transition-delay: {index * 50}ms">
			<div class="transition-all duration-300 will-change-transform transform-gpu hover:scale-105 hover:drop-shadow-lg hover:z-10 relative">
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