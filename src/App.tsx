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
    <div className="min-h-screen flex flex-col justify-center items-center relative">

      {/* Three.js background */}
      <ThreeBackground isDarkMode={isDark} />


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
        <h2 className="mt-6 text-left text-2xl font-semibold whitespace-pre-line w-full">
          <Typewriter
            words={[
              `Hi, I'm Vasant, a Software Engineer. This portfolio showcases my current projects, and I'll try to keep it updated. \nFor detailed information on all my projects, please check out my GitHub. \nClick on the project cards below to see live deployed apps, demo videos, and more! Feel free to explore and connect with me!`
            ]}
            loop={1}
            cursor={true}
            cursorStyle="|"
            typeSpeed={20}
          />
        </h2>
      </div> {/* Heading and subheading container closing tag */}
      {/* Carousel for images */}
      <div className="mt-55 w-full flex justify-center">
      <Carousel className="w-full max-w-4xl ">
      <CarouselContent>
        {imageUrls.map((src, index) => (
          <CarouselItem key={index} className="basis-[450px]">
            <div className="p-1">
              <Card className="border-2 border-amber-900 dark:border-cyan-950 bg-slate-950 w-full">
                <CardContent className="flex items-center justify-center p-0">
                <a 
            href={links[index]}  // Associate the link to the image based on index
            target="_blank"
            rel="noopener noreferrer">
              <div className="w-full  bg-gray-100">
                  <img
                    src={src}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full square-xl"
                  />
              </div>
              </a>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </div> {/* Carousel for images closing tag */}



      <div className="mt-8 flex justify-center">
  <a
    href={links[0]} // Change to any featured project link
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block"
  >
    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-xl animate-bounce border border-white/30 transition-transform transform hover:scale-105 hover:shadow-blue-500/50">
      <p className="text-lg font-semibold text-center animate-pulse">
        🚀 Featured Project
      </p>
    </div>
  </a>
</div>

    </div>
  );
}