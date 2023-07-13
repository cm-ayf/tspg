// Why: Content Security Policy blocks inline script execution
// https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy

import { join, dirname } from 'path';
import { readFile, stat, writeFile } from 'fs/promises';

const __filename = new URL(import.meta.url).pathname;
const __dirname = dirname(__filename);
const target = join(__dirname, '..', 'build', 'index.html');
const regex = /<script>([\s\S]+)<\/script>/;

if (!(await stat(target).catch(() => false))) {
	throw new Error('Target not found. Run `npm run build` first.');
}

const html = await readFile(target, 'utf8');
const script = html
	.match(regex)[1]
	.replace('__sveltekit', 'const __sveltekit')
	.replace('document.currentScript.parentElement', 'document.body.firstElementChild');

await writeFile(target, html.replace(regex, '<script type="module" src="/kit.js"></script>'));
await writeFile(join(dirname(target), 'kit.js'), script);
