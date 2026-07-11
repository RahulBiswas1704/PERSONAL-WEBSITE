"use client";

import { useEffect, useState } from "react";

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

  const changeAccent = (name: string) => {
    setAccent(name);
    localStorage.setItem("accent", name);
    document.documentElement.setAttribute("data-accent", name);
  };

  if (!mounted) {
    return <div className="w-[100px] h-6" />; // Blank placeholder to match dimensions on server
  }

  return (
    <div className="flex items-center gap-1.5 border border-border rounded-full px-2 py-1 bg-neutral-50/50 dark:bg-neutral-900/30">
      {ACCENTS.map((item) => (
        <button
          key={item.name}
          onClick={() => changeAccent(item.name)}
          className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-150 hover:scale-125 focus:outline-none ${item.color} ${
            accent === item.name
              ? "ring-2 ring-foreground dark:ring-white scale-110"
              : "opacity-60 hover:opacity-100"
          }`}
          title={`Set accent color to ${item.name}`}
          aria-label={`Set accent color to ${item.name}`}
        />
      ))}
    </div>
  );
}
