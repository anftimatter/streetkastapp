<script>
	import { onMount } from 'svelte';
	import { createScrollAnimations } from '$lib/utils/animations';
	import { preloadCriticalRoutes, setupHoverPreloading, setupVisibilityPreloading } from '$lib/utils/preloading';
	import LazyImage from '$lib/components/LazyImage.svelte';
	import ImageCarousel from '$lib/components/ImageCarousel.svelte';
	import BetaModal from '$lib/components/BetaModal.svelte';

	let scrollAnimations;
	let heroLoaded = $state(false);
	let betaModal;

	// Screenshot data
	const screenshots = [
		{ src: '/images/screenshots/sk_screenshot_01.webp', alt: 'StreetKast App Interface' },
		{ src: '/images/screenshots/sk_screenshot_02.webp', alt: 'Talent Profile Screen' },
		{ src: '/images/screenshots/sk_screenshot_03.webp', alt: 'Video Audition Interface' },
		{ src: '/images/screenshots/sk_screenshot_04.webp', alt: 'StreetKast Features' },
		{ src: '/images/screenshots/sk_screenshot_05.webp', alt: 'StreetKast Discovery' },
		{ src: '/images/screenshots/sk_screenshot_06.webp', alt: 'StreetKast Creator Tools' }
	];

	onMount(() => {
		// Initialize scroll animations with better performance
		scrollAnimations = createScrollAnimations({
			threshold: 0.2,
			rootMargin: '0px 0px -30px 0px'
		});

		// Setup preloading for better navigation performance
		preloadCriticalRoutes();
		const cleanupHoverPreloading = setupHoverPreloading();
		const cleanupVisibilityPreloading = setupVisibilityPreloading();

		// Use requestAnimationFrame to batch DOM queries
		requestAnimationFrame(() => {
			const animationElements = document.querySelectorAll('[class*="animate-"]');
			scrollAnimations.observeMultiple(animationElements);
		});

		// Immediate hero animation
		requestAnimationFrame(() => {
			heroLoaded = true;
		});

		return () => {
			if (scrollAnimations) {
				scrollAnimations.disconnect();
			}
			cleanupHoverPreloading?.();
			cleanupVisibilityPreloading?.();
		};
	});
</script>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-orange-50 to-teal-50 py-20 lg:py-32 overflow-hidden">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 font-display {heroLoaded ? 'animate-in' : 'animate-fade-in-up'}">
				Connect <span class="text-orange-600">Talent</span> with<br />
				<span class="text-teal-600">Filmmakers</span> & Creators
			</h1>
			<p class="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto {heroLoaded ? 'animate-in' : 'animate-fade-in-up'} stagger-1">
				Audition anywhere, get discovered fast. The revolutionary platform that's changing how talent and creators connect.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center {heroLoaded ? 'animate-in' : 'animate-fade-in-up'} stagger-2">
				<button 
					onclick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
					class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all will-change-transform transform-gpu hover:scale-105 shadow-sm hover:shadow-lg"
				>
					Get Started Now
				</button>
				<button 
					onclick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
					class="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all will-change-transform hover:shadow-sm"
				>
					Learn More
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Problem Statement -->
<section id="about" class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 animate-fade-in-up">
			<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-display">
				The Industry Challenge
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Traditional casting processes are inefficient, limiting opportunities for talent and making it difficult for creators to find the perfect fit.
			</p>
		</div>
		
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div class="animate-fade-in-left">
				<h3 class="text-2xl font-bold text-gray-900 mb-6 font-display">For Talent</h3>
				<ul class="space-y-4">
					<li class="flex items-start animate-fade-in-up stagger-1">
						<div class="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
							<div class="w-2 h-2 bg-orange-600 rounded-full"></div>
						</div>
						<p class="ml-4 text-gray-600">Limited casting opportunities in your area</p>
					</li>
					<li class="flex items-start animate-fade-in-up stagger-2">
						<div class="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
							<div class="w-2 h-2 bg-orange-600 rounded-full"></div>
						</div>
						<p class="ml-4 text-gray-600">Expensive travel costs for auditions</p>
					</li>
					<li class="flex items-start animate-fade-in-up stagger-3">
						<div class="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1">
							<div class="w-2 h-2 bg-orange-600 rounded-full"></div>
						</div>
						<p class="ml-4 text-gray-600">Long waiting periods for feedback</p>
					</li>
				</ul>
			</div>
			
			<div class="animate-fade-in-right">
				<h3 class="text-2xl font-bold text-gray-900 mb-6 font-display">For Creators</h3>
				<ul class="space-y-4">
					<li class="flex items-start animate-fade-in-up stagger-1">
						<div class="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1">
							<div class="w-2 h-2 bg-teal-600 rounded-full"></div>
						</div>
						<p class="ml-4 text-gray-600">Time-consuming casting processes</p>
					</li>
					<li class="flex items-start animate-fade-in-up stagger-2">
						<div class="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1">
							<div class="w-2 h-2 bg-teal-600 rounded-full"></div>
						</div>
						<p class="ml-4 text-gray-600">Limited talent pool access</p>
					</li>
					<li class="flex items-start animate-fade-in-up stagger-3">
						<div class="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1">
							<div class="w-2 h-2 bg-teal-600 rounded-full"></div>
						</div>
						<p class="ml-4 text-gray-600">Inefficient review and selection process</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Solution Section -->
<section id="solution" class="py-20 bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 animate-fade-in-up">
			<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-display">
				Introducing <span class="text-orange-600">StreetKast</span>
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				A revolutionary mobile-first platform transforming talent discovery — create casting calls in seconds, send and receive video auditions instantly, and connect with actors, models, and creators worldwide through intelligent matching.
			</p>
		</div>

		<!-- App Screenshots Showcase -->
		<div class="mb-16 py-8 -my-8 animate-fade-in">
			<ImageCarousel images={screenshots} />
		</div>
		
		<div class="grid lg:grid-cols-3 gap-8">
			<div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-1 will-change-transform transform-gpu hover:scale-105">
				<div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
					<div class="w-6 h-6 bg-orange-600 rounded-full"></div>
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-4 font-display">Smart Matching</h3>
				<p class="text-gray-600">
					Our system matches talent with the perfect opportunities based on location, attributes and project requirements.
				</p>
			</div>
			
			<div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-2 will-change-transform transform-gpu hover:scale-105">
				<div class="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-6">
					<div class="w-6 h-6 bg-teal-600 rounded-full"></div>
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-4 font-display">Video Auditions</h3>
				<p class="text-gray-600">
					Submit and receive video auditions from anywhere, eliminating travel costs and geographical barriers.
				</p>
			</div>
			
			<div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up stagger-3 will-change-transform transform-gpu hover:scale-105">
				<div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-6">
					<div class="w-6 h-6 bg-orange-600 rounded-full"></div>
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-4 font-display">Instant Feedback</h3>
				<p class="text-gray-600">
					Get real-time notifications and feedback from casting directors, speeding up the entire casting process.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- User Modes Section -->
<section id="features" class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16 animate-fade-in-up">
			<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-display">
				Two Powerful Modes
			</h2>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Whether you're talent looking for opportunities or a creator seeking the perfect cast, StreetKast has you covered.
			</p>
		</div>
		
		<div class="grid lg:grid-cols-2 gap-16">
			<!-- Talent Mode -->
			<div class="text-center lg:text-left animate-fade-in-left">
				<div class="flex items-start justify-center lg:justify-start mb-6">
					<div class="bg-orange-100 w-20 h-20 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
						<svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
						</svg>
					</div>
					<div class="text-left">
						<span class="text-xs font-semibold text-orange-600 tracking-widest uppercase font-display mb-2 block">TALENT MODE</span>
						<h3 class="text-2xl lg:text-3xl font-bold text-gray-900 font-display leading-tight">Perfect Tool for<br />Actors & Models</h3>
					</div>
				</div>
				<p class="text-lg text-gray-600 mb-8">
					Looking for your next opportunity? Our talent mode gives you everything you need to showcase your skills and connect with industry professionals.
				</p>
				
				<!-- Talent Onboarding Video -->
				<div class="mb-8 rounded-2xl overflow-hidden shadow-sm animate-scale-in max-w-sm mx-auto lg:mx-0">
					<iframe 
						src="https://www.youtube.com/embed/o24z6jKYrB0" 
						title="Get Discovered on StreetKast - Talent Onboarding Guide"
						class="w-full h-96"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen>
					</iframe>
				</div>
				
				<ul class="space-y-4 mb-8">
					<li class="flex items-start">
						<svg class="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Create comprehensive profiles</p>
							<p class="text-sm text-gray-600">Showcase your detailed attributes and skills</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Browse & apply for matching roles</p>
							<p class="text-sm text-gray-600">Find opportunities that match your skills and characteristics</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Upload video auditions effortlessly</p>
							<p class="text-sm text-gray-600">Record within the app with scripts displayed on-screen</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Get direct messages & invites</p>
							<p class="text-sm text-gray-600">Connect directly with StreetKasters and creators</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Track application status</p>
							<p class="text-sm text-gray-600">Real-time updates on your submissions</p>
						</div>
					</li>
				</ul>
			</div>
			
			<!-- StreetKaster Mode -->
			<div class="text-center lg:text-left animate-fade-in-right">
				<div class="flex items-start justify-center lg:justify-start mb-6">
					<div class="bg-teal-100 w-20 h-20 rounded-2xl flex items-center justify-center mr-4 flex-shrink-0 mt-1">
						<svg class="w-8 h-8 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
						</svg>
					</div>
					<div class="text-left">
						<span class="text-xs font-semibold text-teal-600 tracking-widest uppercase font-display mb-2 block">STREETKASTER MODE</span>
						<h3 class="text-2xl lg:text-3xl font-bold text-gray-900 font-display leading-tight">Ultimate Talent<br />Discovery Solution</h3>
					</div>
				</div>
				<p class="text-lg text-gray-600 mb-8">
					For content creators seeking fresh talent beyond traditional databases. Streamline your casting process and discover exceptional performers.
				</p>
				
				<!-- StreetKaster Onboarding Video -->
				<div class="mb-8 rounded-2xl overflow-hidden shadow-sm animate-scale-in max-w-sm mx-auto lg:mx-0">
					<iframe 
						src="https://www.youtube.com/embed/1cdEFaHB2co" 
						title="Cast Your Vision with StreetKast - Creator Onboarding Guide"
						class="w-full h-96"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen>
					</iframe>
				</div>
				
				<ul class="space-y-4 mb-8">
					<li class="flex items-start">
						<svg class="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Post casting calls with specific requirements</p>
							<p class="text-sm text-gray-600">Define exactly what you're looking for in your next talent</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Access diverse pool of fresh talent</p>
							<p class="text-sm text-gray-600">Beyond traditional databases - discover new faces</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Review video auditions efficiently</p>
							<p class="text-sm text-gray-600">Manage applications with powerful tools</p>
						</div>
					</li>
					<li class="flex items-start">
						<svg class="w-5 h-5 text-teal-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
						</svg>
						<div>
							<p class="font-semibold text-gray-900">Filter by location, skills & attributes</p>
							<p class="text-sm text-gray-600">Find exactly the right fit for your project</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Download Section -->
<section id="download" class="py-20 bg-gray-900 text-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold mb-6 font-display animate-fade-in-up">
			Ready to Get Started?
		</h2>
		<p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up stagger-1">
			Join thousands of talent and creators who are already using StreetKast to make meaningful connections.
		</p>
		
		<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
			<!-- iOS Download -->
			<div class="bg-gray-800 p-8 rounded-2xl animate-fade-in-up stagger-2 hover:transform hover:scale-105 transition-all duration-300">
				<div class="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
					<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 814 1000">
						<path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-4 font-display">iOS App</h3>
				<p class="text-gray-300 mb-6">Available now on the App Store</p>
				<a href="https://apps.apple.com/nl/app/streetkast-talent-discovery/id1277255465" target="_blank" rel="noopener noreferrer" class="block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 w-full will-change-transform transform-gpu hover:shadow-sm hover:scale-105 text-center">
					Download for iOS
				</a>
			</div>
			
			<!-- Android Beta -->
			<div class="bg-gray-800 p-8 rounded-2xl animate-fade-in-up stagger-3 hover:transform hover:scale-105 transition-all duration-300">
				<div class="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
					<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 284 284">
						<path d="M256.109,110.673c-0.002,-9.212 -7.469,-16.679 -16.68,-16.676c-9.211,-0.007 -16.677,7.472 -16.676,16.685l0.012,69.853c-0.001,9.222 7.462,16.676 16.68,16.678c9.148,-0 16.675,-7.528 16.675,-16.676l0,-0.009l-0.012,-69.854l0.001,-0.001Zm-188.923,-13.505l0.025,108.251c-0.007,9.847 7.957,17.795 17.798,17.797l12.12,0.005l0.015,36.96c-0.003,9.2 7.477,16.683 16.668,16.683c9.217,0 16.684,-7.487 16.686,-16.694l-0.009,-36.953l22.52,-0.004l0.009,36.958c-0.002,9.197 7.484,16.69 16.674,16.675c9.217,0.006 16.688,-7.481 16.687,-16.69l-0.01,-36.948l12.161,-0.009c9.818,0.004 17.804,-7.956 17.805,-17.802l-0.018,-108.253l-149.131,0.025l-0,-0.001Zm108.748,-33.035c-3.474,0.003 -6.309,-2.813 -6.3,-6.299c0.012,-3.451 2.823,-6.3 6.303,-6.312c3.449,0.029 6.273,2.867 6.286,6.316l-0,0.007c-0,3.449 -2.838,6.288 -6.287,6.288l-0.002,-0m-68.417,0.012c-3.446,-0.012 -6.275,-2.849 -6.279,-6.295c0.001,-3.462 2.813,-6.307 6.285,-6.307c3.457,0.006 6.3,2.848 6.306,6.305c0.002,3.472 -2.823,6.295 -6.312,6.297m71.029,-32.854l11.643,-21.26c0.62,-1.111 0.22,-2.526 -0.914,-3.153c-1.135,-0.602 -2.538,-0.193 -3.138,0.926l-11.76,21.482c-9.904,-4.401 -20.969,-6.874 -32.686,-6.86c-11.687,-0.01 -22.754,2.45 -32.608,6.822l-11.772,-21.427c-0.614,-1.13 -2.021,-1.539 -3.133,-0.924c-1.133,0.609 -1.54,2.027 -0.919,3.135l11.648,21.246c-22.886,11.812 -38.347,34.279 -38.336,60.082l150.248,-0.015c0.004,-25.799 -15.43,-48.227 -38.281,-60.059m-134.515,62.726c-9.211,-0.004 -16.677,7.483 -16.679,16.68l0.013,69.851l-0,0.01c-0,9.147 7.528,16.675 16.675,16.675l0.021,0c9.14,0 16.661,-7.521 16.661,-16.661l0,-0.023l0.002,-69.862c-0.004,-9.201 -7.48,-16.675 -16.693,-16.67" style="fill-rule:nonzero;"/>
					</svg>
				</div>
				<h3 class="text-xl font-bold mb-4 font-display">Android Beta</h3>
				<p class="text-gray-300 mb-6">Request early access to the beta</p>
				<button 
					onclick={() => betaModal?.open()}
					class="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 w-full will-change-transform transform-gpu hover:shadow-sm hover:scale-105"
				>
					Request Beta Access
				</button>
			</div>
		</div>
		
		<div class="mt-12">
			<p class="text-gray-400 text-sm">
				Follow us on social media for updates and behind-the-scenes content
			</p>
		</div>
	</div>
</section>


<!-- Personal Story Section -->
<section class="py-20 bg-gradient-to-r from-orange-50 to-teal-50">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 font-display animate-fade-in-up">
			Building in Public
		</h2>
		<div class="bg-white p-8 lg:p-12 rounded-2xl shadow-lg animate-scale-in text-left">
			<div class="flex items-center space-x-4 mb-6">
				<LazyImage 
					src="/images/team/avatar_street_small_square.jpg" 
					alt="Igor Riabchuk, StreetKast Founder" 
					class="w-20 h-20 rounded-full object-cover border-4 border-orange-100 flex-shrink-0"
				/>
				<div>
					<h3 class="text-xl font-bold text-gray-900 mb-1 font-display">Igor Riabchuk</h3>
					<p class="text-gray-500 text-sm">Creator & Solo Developer</p>
				</div>
			</div>
			<p class="text-gray-600 text-lg mb-6">
				For years, working as a freelance director, I kept running into the same headache—casting was a total nightmare. The databases I relied on were often out of date, the headshots didn't match the person who showed up, and it just felt like I was guessing in the dark.
			</p>
			<p class="text-gray-600 text-lg mb-6">
				That frustration stuck with me, and eventually, it sparked an idea - <strong>StreetKast.</strong> I couldn't shake it; for over five years, it was always in the back of my mind. Through client gigs, burnout, and way too many late nights, I held onto it. I started saving every bit of money I could until I finally had enough to bring on a small team and build the first version of the app.			</p>
			<p class="text-gray-600 text-lg mb-6">
				We kicked things off with what was in front of us - an iPhone app, simply because that's the phone I had. It wasn't until later that I realized most actors were using Androids. Every new feature we wanted to add came with a cost, and every experiment drained more of our limited budget. I even turned to Indiegogo to raise extra funds, but it still wasn't enough to start over from scratch.
			</p>
			<p class="text-gray-600 text-lg mb-6">
				Then, just as StreetKast started getting some traction, everything in my life got flipped upside down. A terrorist state known as russia invaded my home country, Ukraine, and I had to move my family to Amsterdam. When I finally got back to working on the app, I found it broken. iOS updates had caused major bugs, and my team, scattered by the circumstances, couldn't fix it.
			</p>
			<p class="text-gray-600 text-lg mb-6">
				But one day, while listening to a podcast about coding with AI, something clicked. Why wait for someone else to step in? Why not rebuild StreetKast myself?
			</p>
			<p class="text-orange-600 text-lg mb-6">
				So that's where I am now - reimagining StreetKast from the ground up, making sure it works for everyone right from the start, and being totally open about the whole process. No matter how long it takes or how many curveballs life throws, I'm still driven to create a better way to discover and highlight talent. I'm all in on making this happen.
			</p>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 text-white py-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-5 gap-8">
			<!-- Logo and Company Info -->
			<div class="md:col-span-2">
				<div class="flex items-center space-x-3 mb-4">
					<img src="/images/icons/sklogo_v3_black.svg" alt="StreetKast" class="h-8 w-auto filter brightness-0 invert" />
					<span class="text-2xl text-white font-semibold font-display">StreetKast</span>
				</div>
				<p class="text-gray-400 mb-6 max-w-md">
					Eliminating casting gatekeepers through direct creator-to-talent connections. Creators post instantly, talent auditions anywhere, matches happen in real-time.
				</p>
				<div class="flex space-x-4">
					<!-- Instagram -->
					<a href="https://www.instagram.com/streetkast" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow on Instagram">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
						</svg>
					</a>
					<!-- Bluesky -->
					<a href="https://bsky.app/profile/streetkast.com" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow on Bluesky">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 600 530">
							<path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
						</svg>
					</a>
					<!-- Threads -->
					<a href="https://www.threads.com/@ryabchuk" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow on Threads">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 192 192">
							<path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
						</svg>
					</a>
					<!-- X (Twitter) -->
					<a href="https://x.com/igorok" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors" aria-label="Follow on X (Twitter)">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Navigation Links -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Navigation</h3>
				<ul class="space-y-2">
					<li><button onclick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} class="text-gray-400 hover:text-white transition-colors">About</button></li>
					<li><button onclick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })} class="text-gray-400 hover:text-white transition-colors">Solution</button></li>
					<li><button onclick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} class="text-gray-400 hover:text-white transition-colors">Features</button></li>
					<li><button onclick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} class="text-gray-400 hover:text-white transition-colors">Download</button></li>
				</ul>
			</div>

			<!-- App Links -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Get the App</h3>
				<ul class="space-y-2">
					<li><a href="https://apps.apple.com/nl/app/streetkast-talent-discovery/id1277255465" target="_blank" rel="noopener noreferrer" class="text-gray-400 hover:text-white transition-colors">iOS App Store</a></li>
					<li><span class="text-gray-500">Android (Coming Soon)</span></li>
				</ul>
			</div>

			<!-- Legal Links -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Legal</h3>
				<ul class="space-y-2">
					<li><a href="/privacy-policy" class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
					<li><a href="/child-safety-standards" class="text-gray-400 hover:text-white transition-colors">Child Safety Standards</a></li>
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
			<p class="text-gray-400 text-sm">
				© 2025 StreetKast. All rights reserved.
			</p>
			<p class="text-gray-400 text-sm mt-2 md:mt-0">
				Built by Igor Riabchuk
			</p>
		</div>
	</div>
</footer>

<!-- Beta Modal -->
<BetaModal bind:this={betaModal} />