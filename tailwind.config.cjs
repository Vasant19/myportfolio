// tailwind.config.cjs
module.exports = {
  darkMode: 'class',           // ← must be 'class'
  content: [
    './src/**/*.{html,js,svelte,ts}',  // ← ensure your pages are included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
