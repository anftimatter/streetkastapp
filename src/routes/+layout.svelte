<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { children, data } = $props();

	// SEO data with fallbacks
	const seoTitle = $derived(data?.seo?.title || 'StreetKast - Connect Talent with Filmmakers & Creators');
	const seoDescription = $derived(data?.seo?.description || 'Audition anywhere, get discovered fast. The revolutionary platform that\'s changing how talent and creators connect.');
	const seoImage = $derived(data?.seo?.ogImage || '/images/ogpreview.jpg');
	const canonical = $derived(data?.seo?.canonical || $page.url.href);

	onMount(() => {
		// Check if fonts are loaded
		if (document.fonts) {
			document.fonts.ready.then(() => {
				console.log('Fonts loaded successfully');
				// Check specific fonts
				const ralewayLoaded = document.fonts.check('16px Raleway');
				const interLoaded = document.fonts.check('16px Inter');
				console.log('Raleway loaded:', ralewayLoaded);
				console.log('Inter loaded:', interLoaded);
			});
		}

		// Set up automatic theme detection
		function updateTheme() {
			const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}

		// Initial theme setup
		updateTheme();

		// Listen for theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', updateTheme);

		// Cleanup
		return () => {
			mediaQuery.removeEventListener('change', updateTheme);
		};
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href="/images/icons/favicon.ico" />
	<link rel="icon" type="image/svg+xml" href="/images/icons/favicon.svg" />
	
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Raleway:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
	
	<!-- SEO Meta Tags -->
	<title>{seoTitle}</title>
	<meta name="description" content={seoDescription} />
	<link rel="canonical" href={canonical} />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	<meta property="og:image" content={seoImage} />
	<meta property="og:image:alt" content="StreetKast - Talent Discovery Platform" />
	<meta property="og:site_name" content="StreetKast" />
	<meta property="og:locale" content="en_US" />
	
	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content={canonical} />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={seoDescription} />
	<meta name="twitter:image" content={seoImage} />
	<meta name="twitter:image:alt" content="StreetKast - Talent Discovery Platform" />
	<meta name="twitter:creator" content="@igorok" />
	<meta name="twitter:site" content="@streetkast" />
	
	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Igor Riabchuk" />
	<meta name="theme-color" content="#ea580c" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": "StreetKast",
			"description": seoDescription,
			"url": canonical,
			"applicationCategory": "EntertainmentApplication",
			"operatingSystem": "iOS, Android",
			"author": {
				"@type": "Person",
				"name": "Igor Riabchuk"
			},
			"publisher": {
				"@type": "Organization",
				"name": "StreetKast",
				"logo": {
					"@type": "ImageObject",
					"url": "/images/icons/sklogo_v3_black.svg"
				}
			},
			"screenshot": seoImage,
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": "4.5",
				"reviewCount": "150"
			}
		})}
	</script>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
	<Navigation />
	<main class="pt-16">
		{@render children?.()}
	</main>
</div>
