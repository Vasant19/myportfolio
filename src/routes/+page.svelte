<script lang="ts">
  import { onMount } from 'svelte';

  let darkMode = false;

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      darkMode = true;
      document.documentElement.classList.add('dark');
    }
  });

  function toggleDarkMode() {
    darkMode = !darkMode;
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
  <h1 class="text-4xl font-bold text-center text-blue-600 dark:text-blue-400">Hi, I am Vasant</h1>
  <button 
    class="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 transition-colors"
    on:click={() => (window.location.href = '/projects')}
  >
    Go to Projects
  </button>
  <button 
    class="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
    on:click={toggleDarkMode}
  >
    Toggle {darkMode ? 'Light' : 'Dark'} Mode
  </button>
</main>

<style>
  :global(html) {
    transition: background-color 0.3s, color 0.3s;
  }
</style>
