import { sveltekit } from '@sveltejs/kit/vite';
import { extension } from './extension';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), extension()],
	server: {
		fs: {
			allow: ['package.json']
		}
	}
});
