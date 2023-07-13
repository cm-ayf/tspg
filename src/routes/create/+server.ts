import { isValidURL } from '$lib/pattern';
import { toFiles, type ToFiles } from '$lib/server/convert';
import { octokit } from '$lib/server/octokit';
import { json, type RequestEvent } from '@sveltejs/kit';

async function resolveURL(request: Request) {
	if (request.headers.get('Content-Type') !== 'application/json') {
		throw new Error("Expected 'Content-Type' header to be 'application/json'");
	}
	const json = await request.json().catch(() => {
		throw new Error('Expected JSON body, but received invalid JSON');
	});
	if (typeof json.url !== 'string') {
		throw new Error("Expected JSON body with 'url' string property");
	}
	const url = new URL(json.url);
	if (!isValidURL(url)) {
		throw new Error("Expected 'url' to match TypeScript playground URL pattern");
	}
	return url;
}

export async function POST({ request }: RequestEvent) {
	let files: ToFiles;

	try {
		const url = await resolveURL(request);
		files = toFiles(url);
	} catch (e) {
		const message = e instanceof Error ? e.message : 'Unknown error';
		return json({ message }, { status: 400 });
	}

	try {
		const { data } = await octokit.request('POST /gists', { files });
		if (!data.id) throw new Error();
		return json(
			{ id: data.id, url: new URL(`/${data.id}`, request.url) },
			{ status: 201, headers: { 'Access-Control-Allow-Origin': '*' } }
		);
	} catch (e) {
		console.error(e);
		return json({ message: 'Failed to create gist' }, { status: 500 });
	}
}
