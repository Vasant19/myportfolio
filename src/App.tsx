import { useState, useEffect } from 'react';
import { DarkThemeToggle } from 'flowbite-react';
import { Typewriter } from 'react-simple-typewriter';

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
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      {/* Dark mode toggle button */}
      <DarkThemeToggle
        onClick={toggleDarkMode}
        className="absolute top-4 left-4 p-2 rounded"
        style={{
          backgroundColor: isDark ? '#333' : '#f0f0f0',
          color: isDark ? '#fff' : '#333'
        }}
      />

      {/* Connect me icons */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <a href="https://github.com/vasant19" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="w-8 h-8" />
        </a>
        <a href="https://ca.linkedin.com/in/vasant-dave" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
        </a>
      </div>

      {/* Heading and subheading container */}
      <div className="absolute top-4 text-center ">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to My Portfolio
        </h1>
        <h2 className="mt-16 text-left text-2xl leading-none font-semibold whitespace-pre-line w-full">
          <Typewriter
            words={[
              `Hi, I'm Vasant. I am a Software Engineer. This portfolio showcases the projects I work on. I'll try to keep it updated. 
\nFeel free to explore and connect with me!`
            ]}
            loop={1}
            cursor={true}
            cursorStyle="|"
            typeSpeed={40}
          />
        </h2>
      </div>


    </div>
  );
}