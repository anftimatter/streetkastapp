import { preloadCode } from '$app/navigation';

/**
 * Preload critical routes for better navigation performance
 */
export function preloadCriticalRoutes() {
	// Preload common navigation targets
	const criticalRoutes = [
		'/privacy-policy',
		'/child-safety-standards'
	];

	criticalRoutes.forEach(route => {
		preloadCode(route).catch(() => {
			// Silently fail if preloading doesn't work
		});
	});
}

/**
 * Setup hover-based preloading for improved UX
 */
export function setupHoverPreloading() {
	if (typeof document === 'undefined') return;

	let hoverTimeout: ReturnType<typeof setTimeout>;

	const handleMouseEnter = (event: Event) => {
		const link = event.target as HTMLElement;
		const href = link.getAttribute('href');
		
		if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
			return;
		}

		// Delay preloading slightly to avoid preloading on quick mouse-overs
		hoverTimeout = setTimeout(() => {
			preloadCode(href).catch(() => {
				// Silently fail if preloading doesn't work
			});
		}, 100);
	};

	const handleMouseLeave = () => {
		clearTimeout(hoverTimeout);
	};

	// Add event listeners to all internal links
	document.addEventListener('mouseenter', handleMouseEnter, { capture: true });
	document.addEventListener('mouseleave', handleMouseLeave, { capture: true });

	// Cleanup function
	return () => {
		document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
		document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
	};
}

/**
 * Setup intersection observer based preloading for visible links
 */
export function setupVisibilityPreloading() {
	if (typeof window === 'undefined' || !window.IntersectionObserver) return;

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const link = entry.target as HTMLElement;
				const href = link.getAttribute('href');
				
				if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
					return;
				}

				// Preload the route
				preloadCode(href).catch(() => {
					// Silently fail if preloading doesn't work
				});

				// Stop observing this link
				observer.unobserve(link);
			}
		});
	}, {
		rootMargin: '100px' // Start preloading when link is 100px away from viewport
	});

	// Observe all internal links
	const links = document.querySelectorAll('a[href^="/"]');
	links.forEach(link => observer.observe(link));

	return () => observer.disconnect();
}