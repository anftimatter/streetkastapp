import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	// Set cache headers for static content
	setHeaders({
		// Cache static assets for 1 hour with stale-while-revalidate
		'cache-control': 'public, max-age=3600, stale-while-revalidate=86400',
		// Security headers
		'x-frame-options': 'DENY',
		'x-content-type-options': 'nosniff',
		'referrer-policy': 'strict-origin-when-cross-origin'
	});

	return {};
};