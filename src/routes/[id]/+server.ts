import type { Config } from '@sveltejs/adapter-vercel';
import { fromFiles } from '$lib/server/convert';
import { octokit } from '$lib/server/octokit';
import type { RequestEvent } from './$types';

export async function GET({ params, url }: RequestEvent) {
	try {
		if (!/^[0-9a-f]{32}$/.test(params.id)) throw new Error('Invalid gist ID');
		const { data } = await octokit.request('GET /gists/{gist_id}', {
			gist_id: params.id
		});
		if (!data.files) throw new Error('No files found');

		return Response.redirect(fromFiles(data.files), 301);
	} catch (e) {
		const url404 = new URL('/404', url);
		if (e instanceof Error) url404.searchParams.set('message', e.message);
		return Response.redirect(url404, 301);
	}
}

export const config: Config = { runtime: 'edge' };
