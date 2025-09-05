export interface AnimationOptions {
	threshold?: number;
	rootMargin?: string;
}

export class ScrollAnimations {
	private observer: IntersectionObserver;
	private animatedElements = new Set<Element>();

	constructor(options: AnimationOptions = {}) {
		const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options;

		this.observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
						// Immediate animation trigger - no artificial delays
						this.animateElement(entry.target);
						this.animatedElements.add(entry.target);
					}
				});
			},
			{ threshold, rootMargin }
		);
	}

	private animateElement(element: Element) {
		// Use requestAnimationFrame for smooth performance
		requestAnimationFrame(() => {
			element.classList.add('animate-in');
		});
	}

	observe(element: Element) {
		this.observer.observe(element);
	}

	observeMultiple(elements: NodeListOf<Element> | Element[]) {
		elements.forEach((element) => {
			this.observe(element);
		});
	}

	disconnect() {
		this.observer.disconnect();
		this.animatedElements.clear();
	}
}

export function createScrollAnimations(options?: AnimationOptions) {
	return new ScrollAnimations(options);
}