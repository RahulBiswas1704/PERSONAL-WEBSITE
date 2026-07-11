"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const initialTheme = isDark ? "dark" : "light";
    
    const timeoutId = setTimeout(() => {
      setTheme(initialTheme);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  if (!mounted) {
    return <div className="w-8 h-8" />; // Return a blank placeholder to prevent hydration mismatches
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 border-2 border-transparent hover:border-border text-muted hover:text-foreground transition-all duration-300 cursor-pointer overflow-hidden active:scale-75 shadow-sm hover:shadow-md"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Light Mode Sun */}
      <div className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute inset-0 flex items-center justify-center ${theme === "dark" ? "translate-y-12 rotate-180 opacity-0 scale-50" : "translate-y-0 rotate-0 opacity-100 scale-100"}`}>
        <Sun className="w-[18px] h-[18px] group-hover:rotate-90 group-hover:scale-110 group-hover:text-amber-500 transition-all duration-500" strokeWidth={2.5} />
      </div>
      
      {/* Dark Mode Moon */}
      <div className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute inset-0 flex items-center justify-center ${theme === "light" ? "-translate-y-12 -rotate-180 opacity-0 scale-50" : "translate-y-0 rotate-0 opacity-100 scale-100"}`}>
        <Moon className="w-[18px] h-[18px] group-hover:-rotate-12 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-500" strokeWidth={2.5} />
      </div>
    </button>
  );
}
