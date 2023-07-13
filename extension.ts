/// <reference types="node" />
import type { Plugin, ResolvedConfig } from 'vite';
import { join } from 'path';
import { cp, mkdir, readFile, rm, writeFile } from 'fs/promises';
import { existsSync } from 'fs';

const NAME = 'extension';

export function extension(): Plugin {
	if (!process.env.EXTENSION_ORIGIN) return { name: 'extension' };

	const origin = process.env.EXTENSION_ORIGIN;
	let config!: ResolvedConfig;
	let transformed = false;

	return {
		name: 'extension',
		configResolved(c) {
			config = c;
		},
		transform: {
			order: 'pre',
			handler(code, id) {
				if (transformed) return;
				if (!id.endsWith(`src/routes/${NAME}/+page.svelte`)) return;
				transformed = true;

				const match = code.match(/^[\s\t]*const\s+endpoint\s*=\s*'(.+?)';?/m);
				if (!match?.index) return;

				const processed =
					code.slice(0, match.index) +
					`const endpoint = '${new URL(match[1], origin)}';` +
					code.slice(match.index + match[0].length);
				return processed;
			}
		},
		closeBundle: {
			order: 'post',
			async handler() {
				const output = join(config.root, '.svelte-kit', 'output');
				const pages = join(output, 'prerendered', 'pages');
				if (!existsSync(pages)) return;

				const destination = join(config.root, '.svelte-kit', 'extension');
				const [html] = await Promise.all([
					await readFile(join(pages, `${NAME}.html`), 'utf-8'),
					reset(destination)
				]);
				const match = html.match(/<script>([\s\S]+?)<\/script>/);
				if (match?.index) {
					const script = match[1]
						.replace('__sveltekit', 'const __sveltekit')
						.replace('document.currentScript.parentElement', 'document.body.firstElementChild');
					const processed =
						html.slice(0, match.index) +
						`<script type="module" src="${NAME}.js"></script>` +
						html.slice(match.index + match[0].length);
					await Promise.all([
						writeFile(join(destination, `${NAME}.html`), processed),
						writeFile(join(destination, `${NAME}.js`), script),
						cp(join(output, 'client'), destination, { recursive: true })
					]);
				} else {
					await Promise.all([
						writeFile(join(destination, `${NAME}.html`), html),
						cp(join(output, 'client'), destination, { recursive: true })
					]);
				}
			}
		}
	};
}

async function reset(path: string) {
	if (existsSync(path)) await rm(path, { recursive: true });
	await mkdir(path);
}
