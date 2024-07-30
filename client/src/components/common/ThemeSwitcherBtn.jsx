import { useEffect, useState } from 'react';
import DarkIcon from '/assets/icons/night-mode.svg';
import LightIcon from '/assets/icons/light-mode.svg';

export default function ThemeSwitcher() {
  // Set the initial theme based on localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme); // Save theme to localStorage
  }, [theme]);

  const handleThemeSwitch = async () => {
    setIsSwitching(true);
    await new Promise((resolve) => setTimeout(resolve, 150)); // Delay for 150ms (adjust as needed)
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setIsSwitching(false);
  };

  return (
    <div className="h-6 w-6 active:animate-spin cursor-pointer bg-transparent">
      <img
        src={theme === 'dark' ? LightIcon : DarkIcon}
        alt={`Theme Switcher - ${theme === 'dark' ? 'Light' : 'Dark'}`}
        className={`bg-transparent text-text ${isSwitching ? 'opacity-50' : ''}`} // Add opacity change during switch
        onClick={handleThemeSwitch}
      />
    </div>
  );
}
