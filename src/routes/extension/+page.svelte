<script lang="ts">
	import { onMount } from 'svelte';

	const endpoint = '/create';

	function memo<T>(init: () => T): () => T {
		let value: T | null = null;
		return () => (value ??= init());
	}
	const browser = memo(() => import('webextension-polyfill').then((x) => x.default));
	onMount(browser);

	const createLink = async () => {
		disabled = true;
		text = 'Shortening...';

		const { tabs } = await browser();
		const query = await tabs.query({ active: true, currentWindow: true });
		const tab = query[0];

		if (!tab.url) {
			error = 'Failed to get URL';
			return;
		}

		const res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: tab.url })
		});
		const data = await res.json();

		if (res.status !== 201) {
			text = 'Request failed';
			error = data.message;
			return;
		}

		if (data.url) {
			text = 'Copying...';
			navigator.clipboard
				.writeText(data.url)
				.then(() => {
					text = 'Link copied';
				})
				.catch(() => {
					text = 'Failed to copy';
				});
		} else {
			text = 'Failed to shorten';
		}
	};
	let disabled = false;
	let text = 'Shorten URL';
	let error: string | null = null;
</script>

<div class="container">
	{#if !error}
		<button {disabled} on:click={createLink}>{text}</button>
	{:else}
		<p>{error}</p>
	{/if}
</div>

<style>
	button {
		background-color: #4caf50;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
	}

	button:disabled {
		background-color: #cccccc;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
