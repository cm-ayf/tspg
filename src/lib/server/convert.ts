import lz from 'lz-string';

function filename(url: URL) {
	return url.searchParams.get('jsx') === '0' ? 'index.ts' : 'index.tsx';
}

export interface ToFiles {
	[filename: string]: { content: string };
}

export function toFiles(url: URL): ToFiles {
	const files: ToFiles = {};

	const sliced = url.hash.slice(6);

	let decompressed: string;
	try {
		decompressed = lz.decompressFromEncodedURIComponent(sliced);
	} catch {
		throw new Error("Failed to decompress EncodedURIComponent");
	}

	files[filename(url)] = {
		content: decompressed
	};
	if (url.search) files.options = { content: url.search };

	return files;
}

export interface FromFiles {
	[filename: string]: { content?: string } | null | undefined;
}

export function fromFiles(files: FromFiles): URL {
	const url = new URL('https://www.typescriptlang.org/play');
	const options = files?.['options'];
	if (options?.content) url.search = options.content;

	const playground = files?.[filename(url)];
	if (typeof playground?.content !== 'string') throw new Error('No playground found');
	url.hash = '#code/' + lz.compressToEncodedURIComponent(playground.content);

	return url;
}
