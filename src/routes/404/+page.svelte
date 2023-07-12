<script lang="ts">
	import { onMount } from 'svelte';

	let message: string | null = null;
	onMount(() => {
		const params = new URLSearchParams(window.location.search);
		message = params.get('message');
	});
</script>

<h1>Invalid Link</h1>

{#if message}
	<p>{message}</p>
{/if}

<p>
	<a href="/">Go back</a>
</p>
