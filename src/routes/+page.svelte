<script lang="ts">
	import { isValidURL, pattern } from '$lib/pattern';
	import { description, repository, bugs } from '../../package.json';

	interface SuccessResult {
		success: true;
		url: string;
		copied?: boolean;
	}
	interface ErrorResult {
		success: false;
		error: unknown;
		message: string;
	}
	type Result = SuccessResult | ErrorResult;

	let url = '';
	let loading = false;
	let result: Result | null = null;

	async function submit() {
		try {
			loading = true;
			const response = await fetch('/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url })
			});
			const json = await response.json();
			if (response.ok) {
				result = { success: true, url: json.url };
			} else {
				result = { success: false, error: json, message: json.message };
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			result = { success: false, error, message };
		} finally {
			loading = false;
		}
	}

	function copy(url: string) {
		return () => {
			navigator.clipboard.writeText(url);
			result = { success: true, url, copied: true };
		};
	}
</script>

<h1>{description}</h1>

<p>
	<a href={repository.url}>GitHub</a> | Report issues
	<a href={bugs.url}>here</a>
</p>

<form>
	<input
		type="url"
		placeholder="TypeScript Playground URL"
		pattern={pattern.source}
		disabled={loading}
		on:paste={(e) => {
			if (url) return;
			const data = e.clipboardData?.getData('text/plain');
			if (!data || !isValidURL(data)) return;
			url = data;

			submit();
		}}
		bind:value={url}
	/>
	<button type="submit" disabled={!url || !isValidURL(url) || loading} on:click={submit}
		>Create</button
	>
</form>
{#if loading}
	<p>loading...</p>
{/if}
{#if result?.success}
	<p>
		<a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a>
		<button type="button" on:click={copy(result.url)}>{result.copied ? 'Copied' : 'Copy'}</button>
	</p>
{/if}
{#if result?.success === false}
	<p style="color: red">{result.message}</p>
{/if}

<style>
	form {
		width: min(100%, 32rem);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	input[type='url']:valid:not(:placeholder-shown) {
		border-color: green;
	}
	input[type='url']:invalid {
		border-color: red;
	}
	button[type='submit'] {
		margin-right: auto;
	}
</style>
