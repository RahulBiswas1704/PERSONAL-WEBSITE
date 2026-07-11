"use client";

import { useEffect, useState, useRef } from "react";
import { Palette } from "lucide-react";

const ACCENTS = [
  { name: "amber", color: "bg-amber-600 dark:bg-amber-500" },
  { name: "emerald", color: "bg-emerald-600 dark:bg-emerald-500" },
  { name: "rose", color: "bg-rose-600 dark:bg-rose-500" },
  { name: "blue", color: "bg-blue-600 dark:bg-blue-500" },
  { name: "purple", color: "bg-purple-600 dark:bg-purple-500" },
];

export default function AccentPicker() {
  const [accent, setAccent] = useState("amber");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid hydration warnings by deferring state initialization to mount
    const savedAccent = localStorage.getItem("accent") || "amber";
    
    const timeoutId = setTimeout(() => {
      setAccent(savedAccent);
      document.documentElement.setAttribute("data-accent", savedAccent);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const changeAccent = (name: string) => {
    setAccent(name);
    localStorage.setItem("accent", name);
    document.documentElement.setAttribute("data-accent", name);
    setIsOpen(false);
  };

  if (!mounted) {
    return <div className="w-8 h-8" />; // Blank placeholder to match dimensions on server
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Toggle accent palette"
      >
        <Palette className="w-[18px] h-[18px] text-foreground/80 hover:text-foreground transition-colors" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 p-2 border border-border rounded-lg bg-background shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
          {ACCENTS.map((item) => (
            <button
              key={item.name}
              onClick={() => changeAccent(item.name)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-150 hover:scale-125 focus:outline-none ${item.color} ${
                accent === item.name
                  ? "ring-2 ring-foreground dark:ring-white scale-110"
                  : "opacity-60 hover:opacity-100"
              }`}
              title={`Set accent color to ${item.name}`}
              aria-label={`Set accent color to ${item.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
