<script>
  export let projects = [
    { title: "Project One", description: "A brief description of Project One.", link: "#" },
    { title: "Project Two", description: "A brief description of Project Two.", link: "#" },
    { title: "Project Three", description: "A brief description of Project Three.", link: "#" },
  ];
</script>

<section class="min-h-screen bg-gray-100 py-10">
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold text-center text-gray-800 mb-8">My Projects</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects as project}
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h2>
          <p class="text-gray-600 mb-4">{project.description}</p>
          <a
            href={project.link}
            class="text-blue-500 hover:text-blue-700 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project →
          </a>
        </div>
      {/each}
    </div>
  </div>
</section>