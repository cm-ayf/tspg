export const pattern = /^https:\/\/www\.typescriptlang\.org\/play\/?(?:\?\S*)?#code\/[\w+-]+$/i;
export function isValidURL(url: string | URL) {
	try {
		if (typeof url === 'string') url = new URL(url);
		return (
			url.origin === 'https://www.typescriptlang.org' &&
			url.pathname === '/play' &&
			/#code\/[\w+-]+$/i.test(url.hash)
		);
	} catch {
		return false;
	}
}
