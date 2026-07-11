"use client";

import { useEffect, useState } from "react";

const ACCENTS = [
  { name: "amber", bgClass: "bg-amber-500" },
  { name: "emerald", bgClass: "bg-emerald-500" },
  { name: "rose", bgClass: "bg-rose-500" },
  { name: "blue", bgClass: "bg-blue-500" },
  { name: "purple", bgClass: "bg-purple-500" },
];

export default function AccentPicker() {
  const [accent, setAccent] = useState("amber");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedAccent = localStorage.getItem("accent") || "amber";
    
    const timeoutId = setTimeout(() => {
      setAccent(savedAccent);
      document.documentElement.setAttribute("data-accent", savedAccent);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const cycleAccent = () => {
    const currentIndex = ACCENTS.findIndex(a => a.name === accent);
    const nextIndex = (currentIndex + 1) % ACCENTS.length;
    const nextName = ACCENTS[nextIndex].name;
    
    setAccent(nextName);
    localStorage.setItem("accent", nextName);
    document.documentElement.setAttribute("data-accent", nextName);
  };

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      onClick={cycleAccent}
      className="group relative flex items-center justify-center w-9 h-9 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 border-2 border-transparent hover:border-border transition-all duration-300 cursor-pointer overflow-hidden active:scale-75 shadow-sm hover:shadow-md"
      aria-label="Cycle accent color"
    >
      {ACCENTS.map((item, index) => {
        const isActive = accent === item.name;
        // If the item is before the active one in the cycle, it flew up (-translate-y-12). If after, it flew down (translate-y-12).
        // For simplicity, non-active ones just stay down, and fly up when active.
        return (
          <div 
            key={item.name}
            className={`transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] absolute inset-0 flex items-center justify-center ${
              isActive 
                ? "translate-y-0 rotate-0 opacity-100 scale-100" 
                : "translate-y-12 rotate-180 opacity-0 scale-50"
            }`}
          >
            <div className={`w-4 h-4 rounded-full ${item.bgClass} group-hover:scale-125 transition-transform duration-500 shadow-sm`} />
          </div>
        );
      })}
    </button>
  );
}
