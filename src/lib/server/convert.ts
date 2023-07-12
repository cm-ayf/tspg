import lz from 'lz-string';

export interface ToFiles {
	[filename: string]: { content: string };
}

export function toFiles(url: URL): ToFiles {
	const files: ToFiles = {};

	const playground = lz.decompressFromEncodedURIComponent(url.hash.slice(6));
	const filename = url.searchParams.get('jsx') === '0' ? 'index.ts' : 'index.tsx';
	files[filename] = { content: playground };

	if (url.search) {
		files.options = { content: url.search };
	}

	return files;
}

export interface FromFiles {
	[filename: string]: { content?: string } | null | undefined;
}

export function fromFiles(files: FromFiles): URL {
	const url = new URL('https://www.typescriptlang.org/play');
	const options = files?.['options'];
	if (options?.content) url.search = options.content;

	const filename = url.searchParams.get('jsx') === '0' ? 'index.ts' : 'index.tsx';
	const playground = files?.[filename];
	if (typeof playground?.content !== 'string') throw new Error('No playground found');
	url.hash = '#code/' + lz.compressToEncodedURIComponent(playground.content);

	return url;
}
