import { useEffect, useState } from "react";
import DarkIcon from "/assets/icons/night-mode.svg";
import LightIcon from "/assets/icons/light-mode.svg";

export default function ThemeSwitcher() {
  // Set the initial theme based on localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = async () => {
    setIsSwitching(true);
    await new Promise((resolve) => setTimeout(resolve, 150));
    setTheme(theme === "dark" ? "light" : "dark");
    setIsSwitching(false);
  };

  return (
    <div className="h-8 w-8 active:animate-spin cursor-pointer bg-transparent">
      <img
        src={theme === "dark" ? LightIcon : DarkIcon}
        alt={`Theme Switcher - ${theme === "dark" ? "Light" : "Dark"}`}
        className={`bg-transparent text-text ${
          isSwitching ? "opacity-50" : ""
        }`}
        onClick={handleThemeSwitch}
      />
    </div>
  );
}
