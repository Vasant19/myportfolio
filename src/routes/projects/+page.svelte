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
  
  <main class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-all ease-in-out duration-500 opacity-0 animate-fadeIn">
    <h1 class="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6 transform transition-transform duration-500 hover:scale-105">
      Hi, I am Vasant
    </h1>
    <button 
      class="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-xl hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 transition-all transform duration-300 ease-in-out hover:scale-105"
      on:click={() => (window.location.href = '/projects')}
    >
      Go to Projects
    </button>
    <button 
      class="mt-4 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:shadow-xl dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-all transform duration-300 ease-in-out hover:scale-105"
      on:click={toggleDarkMode}
    >
      Toggle {darkMode ? 'Light' : 'Dark'} Mode
    </button>
  </main>
  
  <style>
    :global(html) {
      transition: background-color 0.3s, color 0.3s;
    }
  
    /* Fade In Animation for the entire page */
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  
    .animate-fadeIn {
      animation: fadeIn 1s ease-in-out forwards;
    }
    
    /* Optional: Smooth shadow animation for buttons */
    .btn {
      transition: box-shadow 0.3s ease;
    }
  </style>
  