export function readURL() {
	const allURL = window.location.href;

	if (allURL.includes('')) {
		const slug = window.location.search;
		return slug.slice(1);
	}
	return undefined;
}