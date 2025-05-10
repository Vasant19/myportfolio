import { useState, useEffect } from 'react';
import { DarkThemeToggle } from 'flowbite-react';
import { Typewriter } from 'react-simple-typewriter';
import { Card, CardContent } from "@/components/ui/card"
import image1 from '@/assets/images/image1.png';
import image2 from '@/assets/images/image2.png';
import image3 from '@/assets/images/image3.jpg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ThreeBackground from '@/components/ui/ThreeBackground.tsx';

const imageUrls = [
  image1,
  image2,
  image3,
];

const links = [
  'https://tracemind.canadacentral.cloudapp.azure.com/login',
  'https://infra-price-peek.onrender.com/',
  // 'https://example3.com',
];

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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Three.js background */}
      <ThreeBackground isDarkMode={isDark} />

      {/* Header section with navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center bg-white dark:bg-neutral-900 shadow-md">
        {/* Left section with theme toggle */}
        <div className="flex items-center space-x-3 min-w-[120px]">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-md transition duration-300"></div>
            <div className="relative">
              <DarkThemeToggle
                onClick={toggleDarkMode}
                className="p-2 rounded transition-colors duration-200 relative z-10 group-hover:scale-110"
                style={{
                  backgroundColor: isDark ? '#333' : '#f0f0f0',
                  color: isDark ? '#fff' : '#333'
                }}
              />
            </div>
          </div>
          <span className={`text-sm font-semibold tracking-wide transition-all duration-200 px-3 py-1.5 rounded-md ${
            isDark 
              ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/50' 
              : 'bg-gray-100 text-gray-950 shadow-lg shadow-gray-200/50'
          }`}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </span>
        </div>

        {/* Center title */}
        <h1 className="text-lg sm:text-xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          Welcome to My Portfolio
        </h1>
        
        {/* Right section with social icons */}
        <div className="flex space-x-4 min-w-[120px] justify-end">
          <a href="https://github.com/vasant19" target="_blank" rel="noopener noreferrer" 
             className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 blur-md transition duration-300"></div>
            <div className="relative flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 rounded-lg transition duration-300 group-hover:scale-110">
              <img src="https://img.icons8.com/ios-filled/50/000000/github.png" alt="GitHub" className="w-6 h-6 transition duration-300 group-hover:brightness-110" />
            </div>
          </a>
          <a href="https://ca.linkedin.com/in/vasant-dave" target="_blank" rel="noopener noreferrer" 
             className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 blur-md transition duration-300"></div>
            <div className="relative flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 rounded-lg transition duration-300 group-hover:scale-110">
              <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-6 h-6 transition duration-300 group-hover:brightness-110" />
            </div>
          </a>
          <a href="mailto:vasantdave@outlook.com" target="_blank" rel="noopener noreferrer" 
             className="group relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 blur-md transition duration-300"></div>
            <div className="relative flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 rounded-lg transition duration-300 group-hover:scale-110">
              <img src="https://img.icons8.com/ios-filled/50/000000/mail.png" alt="Email" className="w-6 h-6 transition duration-300 group-hover:brightness-110" />
            </div>
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome section */}
        <section className="text-center mb-12 max-w-4xl mx-auto">
          <h2 className="text-left text-xl md:text-xl font-semibold leading-relaxed">
            <Typewriter
              words={[
                `Hi, I'm Vasant, a Software Engineer. This portfolio showcases my current projects, and I'll try to keep it updated. For detailed information on all my projects, please check out my GitHub. Click on the project cards below to see live deployed apps, demo videos, and more! Feel free to explore and connect with me!`
              ]}
              loop={1}
              cursor={true}
              cursorStyle="|"
              typeSpeed={20}
            />
          </h2>
        </section>

        {/* Projects carousel section */}
        <section className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {imageUrls.map((src, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <div className="p-2">
                    <Card className="border-2 border-amber-900 dark:border-cyan-950 bg-slate-950 hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0">
                        <a 
                          href={links[index]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={src}
                              alt={`Project ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </section>

        {/* Featured project section */}
        <section className="text-center">
          <a
            href={links[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group relative"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
            <div className="relative rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 shadow-xl transition-all duration-300 transform group-hover:scale-105">
              <p className="text-lg font-semibold">
                🚀 Featured Project
              </p>
            </div>
          </a>
        </section>
      </main>
    </div>
  );
}