import { MoonStar, SunDim } from "lucide-react";
import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
    >
      {darkMode ? (
        <SunDim className="h-5 w-5 text-yellow-300" />
      ) : (
        <MoonStar className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
