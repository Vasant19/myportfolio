import { useState, useEffect } from 'react';
import { DarkThemeToggle } from 'flowbite-react';

export default function App() {
  // Sync with the initial theme state from the HTML tag
  const [isDark, setIsDark] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Then check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Set the theme on initial load and when it changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prevState => !prevState);
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative">
      {/* Dark mode toggle button at the top-left */}
      <DarkThemeToggle
        onClick={toggleDarkMode}
        className="absolute top-4 left-4 p-2 rounded"
        // Use inline styles to ensure the button is visible in both themes
        style={{
          backgroundColor: isDark ? '#333' : '#f0f0f0',
          color: isDark ? '#fff' : '#333'
        }}
      />

      {/* Heading at the top-left, aligned with the button */}
      <h1 className="absolute top-4 text-4xl font-bold">
        Welcome to My Portfolio
      </h1>

      {/* Connect me icons at the top-right */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <a href="https://github.com/vasant19" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="w-8 h-8" />
        </a>
        <a href="https://ca.linkedin.com/in/vasant-dave" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
        </a>
      </div>

      {/* Content placed below the heading */}
      <div className="mt-24 text-left">
        <h2 className="text-2xl font-semibold mb-4">Hi, I'm Vasant</h2>
        <p className="text-lg">
          I am a Software Engineer. 
          This portfolio is dedicated to showcasing the projects I work on. I will try to keep this most up to date.
        </p>
        <p className="text-lg mt-4">
          Feel free to explore and connect with me!
        </p>
      </div>
    </div>
  );
}
