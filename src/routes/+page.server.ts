import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	// Set specific headers for the homepage (cache-control is handled in layout)
	setHeaders({
		// Performance hints
		'link': '</images/ogpreview.jpg>; rel=prefetch, </images/icons/sklogo_v3_black.svg>; rel=prefetch'
	});

	// Return any data needed for the page
	return {
		seo: {
			title: 'StreetKast - Connect Talent with Filmmakers & Creators',
			description: 'Audition anywhere, get discovered fast. The revolutionary platform that\'s changing how talent and creators connect.',
			canonical: 'https://streetkast.com',
			ogImage: '/images/ogpreview.jpg'
		}
	};
};