export function readURL() {
	const allURL = window.location.href;

	if (allURL.includes('product')) {
		const slug = window.location.search;
		return slug.slice(1);
	}
	return undefined;
}