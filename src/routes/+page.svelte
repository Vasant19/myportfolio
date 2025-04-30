<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
  <h1 class="text-4xl font-bold text-center text-blue-600">Welcome to My Portfolio</h1>
  <p class="mt-4 text-lg text-center text-gray-700">This is a simple home page to showcase my work.</p>

  <div class="mt-6 flex gap-4 items-center">
    <!-- Option 1: Text + Icon Button -->
    <Button>Theme</Button>
    
    <!-- Option 2: Icon-Only Button -->
  </div>
</main>