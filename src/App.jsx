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
    // Remove the bg-gray-100 dark:bg-gray-800 classes as they might override your CSS variables
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
      <h1 className="absolute top-4  text-4xl font-bold">
        Welcome to My Portfolio
      </h1>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Hello, I'm [Your Name]</h2>
        <p className="text-lg">
          I am a [Your Profession] with a passion for [Your Interests]. 
          This is my portfolio where you can find my projects and skills.
        </p>
        <p className="text-lg mt-4">
          Feel free to explore and connect with me!
        </p>
      </div>
    </div>
  );
}