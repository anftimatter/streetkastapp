<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);
	let scrollY = $state(0);
	let navElement: HTMLElement;
	let navLoaded = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function smoothScroll(event: Event, targetId: string) {
		event.preventDefault();
		
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			// Close mobile menu if open
			isMenuOpen = false;
			
			// Smooth scroll with custom options
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			});
		}
	}

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		// Immediate load animation
		requestAnimationFrame(() => {
			navLoaded = true;
		});

		return () => window.removeEventListener('scroll', handleScroll);
	});

	// Dynamic backdrop blur based on scroll position
	let backdropIntensity = $derived(Math.min(scrollY / 100, 1));

	// Check if we're on a legal page where internal nav shouldn't show
	let isLegalPage = $derived(page.url.pathname === '/privacy-policy' || page.url.pathname === '/child-safety-standards');
</script>

<nav 
	bind:this={navElement}
	class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300"
	style="background-color: rgba(255, 255, 255, {0.7 + backdropIntensity * 0.2}); 
	       box-shadow: 0 4px 6px -1px rgba(0, 0, 0, {0.05 + backdropIntensity * 0.05}), 0 2px 4px -1px rgba(0, 0, 0, {0.03 + backdropIntensity * 0.03});
	       border-bottom: 1px solid rgba(229, 231, 235, {0.3 + backdropIntensity * 0.4});"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo -->
			<div class="flex items-center {navLoaded ? 'animate-in' : 'animate-fade-in-left'}">
				<a href="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
					<img src="/images/icons/sklogo_v3_black.svg" alt="StreetKast" class="h-8 w-auto" />
					<span class="text-2xl font-semibold text-gray-900 font-display">StreetKast</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			{#if !isLegalPage}
				<div class="hidden md:block {navLoaded ? 'animate-in' : 'animate-fade-in-right'}">
					<div class="ml-10 flex items-center space-x-8">
						<button 
							onclick={(e) => smoothScroll(e, 'about')}
							class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
						>
							About
						</button>
						<button 
							onclick={(e) => smoothScroll(e, 'solution')}
							class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
						>
							Solution
						</button>
						<button 
							onclick={(e) => smoothScroll(e, 'features')}
							class="text-gray-700 hover:text-orange-600 transition-colors font-medium"
						>
							Features
						</button>
						<button 
							onclick={(e) => smoothScroll(e, 'download')}
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
						>
							Get Started
						</button>
					</div>
				</div>
			{/if}

			<!-- Mobile menu button -->
			{#if !isLegalPage}
				<div class="md:hidden">
					<button
						onclick={toggleMenu}
						class="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600"
						aria-label="Toggle menu"
					>
						<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							{#if isMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 12h16M4 18h16" />
							{/if}
						</svg>
					</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- Mobile Navigation -->
	{#if isMenuOpen && !isLegalPage}
		<div class="md:hidden">
			<div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md border-t border-gray-200/50">
				<button 
					onclick={(e) => smoothScroll(e, 'about')}
					class="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-md font-medium transition-colors"
				>
					About
				</button>
				<button 
					onclick={(e) => smoothScroll(e, 'solution')}
					class="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-md font-medium transition-colors"
				>
					Solution
				</button>
				<button 
					onclick={(e) => smoothScroll(e, 'features')}
					class="block w-full text-left px-3 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-100 rounded-md font-medium transition-colors"
				>
					Features
				</button>
				<button 
					onclick={(e) => smoothScroll(e, 'download')}
					class="block w-full mx-3 my-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-medium text-center transition-colors"
				>
					Get Started
				</button>
			</div>
		</div>
	{/if}
</nav>