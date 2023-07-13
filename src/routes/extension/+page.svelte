<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const createLink = async () => {
		disabled = true;
		text = 'Shortening...';

		const res = await fetch('/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});

		if (res.status !== 200) {
			text = 'Request failed';
			return;
		}

		const { link } = await res.json();

		if (link) {
			text = 'Copying...';
			navigator.clipboard
				.writeText(link)
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
	let url = '';
	let disabled = false;
	let text = 'Shorten URL';

	onMount(async () => {
		if (browser) {
			const { tabs, webNavigation } = await import('webextension-polyfill');
			const query = await tabs.query({ active: true, currentWindow: true });
			const tab = query[0];

			if (tab && tab.url) {
				url = tab.url;
			}

			webNavigation.onHistoryStateUpdated.addListener((details) => {
				if (details.tabId === tab.id && details.url) {
					url = details.url;
				}
			});
		}
	});
</script>

<div class="container">
	<button {disabled} on:click={createLink}>{text}</button>
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
