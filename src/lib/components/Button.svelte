<script>
	import { Sun, Moon } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let isDarkMode = false;

	onMount(() => {
		isDarkMode = document.body.classList.contains('dark-mode');
	});

	function toggle() {
		isDarkMode = !isDarkMode;
		document.body.classList.toggle('dark-mode');
	}
</script>

<button on:click={toggle} aria-label="Toggle theme">
	{#if isDarkMode}
		<Sun size={20} class="icon" />
	{:else}
		<Moon size={20} class="icon" />
	{/if}
	<span class="button-text"><slot /></span>
</button>

<style>
	button {
		background-color: #f76027;
		color: white;
		border: none;
		border-radius: 9999px;
		padding: 0.5rem 0.75rem;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.3s ease;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		font-weight: 500;
	}

	button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	button:active {
		transform: translateY(1px);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	:global(button svg) {
		transition: transform 0.5s ease;
		animation: fadeIn 0.3s ease-in-out;
	}

	button:hover :global(svg) {
		transform: rotate(30deg) scale(1.1);
	}

	:global(body.dark-mode) button {
		background-color: #0084f6;
		color: white;
	}

	.button-text {
		display: inline-block;
		margin-left: 0.25rem;
		font-size: 0.875rem;
		letter-spacing: 0.05em;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: scale(0.8); }
		to { opacity: 1; transform: scale(1); }
	}
</style>
