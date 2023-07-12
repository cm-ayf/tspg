import { isValidURL } from '$lib/pattern';
import { toFiles, type ToFiles } from '$lib/server/convert';
import { octokit } from '$lib/server/octokit';
import type { Config } from '@sveltejs/adapter-vercel';
import { json, type RequestEvent } from '@sveltejs/kit';

async function resolveURL(request: Request) {
	switch (request.headers.get('Content-Type')) {
		case 'application/json': {
			const json = await request.json();
			if (typeof json.url !== 'string') {
				throw new Error("Expected JSON body with 'url' string property");
			}
			return new URL(json.url);
		}
		case 'application/x-www-form-urlencoded': {
			const body = await request.text();
			const params = new URLSearchParams(body);
			const param = params.get('url');
			if (typeof param !== 'string') {
				throw new Error("Expected 'url' form field");
			}
			return new URL(param);
		}
		default:
			throw new Error(
				"Expected 'Content-Type' header to be 'application/json' or 'application/x-www-form-urlencoded'"
			);
	}
}

export async function POST({ request }: RequestEvent) {
	let files: ToFiles;

	try {
		const url = await resolveURL(request);
		if (!isValidURL(url)) {
			throw new Error("Expected 'url' to match TypeScript playground URL pattern");
		}
		files = toFiles(url);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		return json({ message }, { status: 400 });
	}

	try {
		const { data } = await octokit.request('POST /gists', { files });
		if (!data.id) throw new Error();
		return json({ id: data.id, url: new URL(`/${data.id}`, request.url) }, { status: 201 });
	} catch (e) {
		console.error(e);
		return json({ message: 'Failed to create gist' }, { status: 500 });
	}
}

export const config: Config = { runtime: 'edge' };
