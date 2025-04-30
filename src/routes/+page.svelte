<script lang="ts">
  // Import Svelte's `onMount` lifecycle
  import { onMount } from 'svelte';
  
  // Store the current theme mode
  let darkMode = false;
  
  // When the component mounts, check for saved preference in localStorage
  onMount(() => {
    // Get stored preference
    const stored = localStorage.getItem('theme');
  
    // Apply if found, else use system preference
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      darkMode = true;
      document.documentElement.classList.add('dark'); // Add Tailwind's 'dark' class
    } else {
      darkMode = false;
      document.documentElement.classList.remove('dark');
    }
  });
  
  // Function to toggle dark mode
  function toggleDarkMode() {
    darkMode = !darkMode; // flip the mode
  
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
  </script>
  
  <main class="flex flex-col items-center justify-center h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
    <!-- Heading -->
    <h1 class="text-4xl font-bold text-center text-blue-600 dark:text-blue-300">
      Welcome to My Portfolio
    </h1>
  
    <!-- Subheading -->
    <p class="mt-4 text-lg text-center text-gray-700 dark:text-gray-300">
      This is a simple home page to showcase my work.
    </p>
  
    <!-- Dark mode toggle button -->
    <button
      class="mt-8 flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium 
             bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
             text-gray-800 dark:text-gray-100 shadow hover:shadow-md transition"
      on:click={toggleDarkMode}
    >
      <!-- Icon (Sun for light, Moon for dark) -->
      {#if darkMode}
        <!-- Moon emoji for dark mode -->
        <span>🌙</span>
      {:else}
        <!-- Sun emoji for light mode -->
        <span>☀️</span>
      {/if}
  
      <!-- Label text -->
      <span>Dark Mode: {darkMode ? 'On' : 'Off'}</span>
    </button>
  </main>
  