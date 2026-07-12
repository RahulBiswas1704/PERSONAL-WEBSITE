"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { hapticHeavy } from "@/lib/haptics";

const QUIRKY_MESSAGES = [
  "I literally told you not to tap it.",
  "Why are you like this?",
  "Curiosity killed the CSS.",
  "My retinas are burning.",
  "This is why we can't have nice things.",
];

export default function DoNotTapButton() {
  const [isTapped, setIsTapped] = useState(false);
  const [message, setMessage] = useState("");

  const handleTap = () => {
    if (isTapped) return;
    
    setIsTapped(true);
    setMessage(QUIRKY_MESSAGES[Math.floor(Math.random() * QUIRKY_MESSAGES.length)]);
    hapticHeavy();
    
    // Invert colors globally
    document.documentElement.classList.add('invert-colors');
    
    // Reset after 3 seconds
    setTimeout(() => {
      document.documentElement.classList.remove('invert-colors');
      setIsTapped(false);
    }, 3000);
  };

  return (
    <div className="flex justify-center mt-20 mb-8 w-full animate-fade-in-up relative" style={{ animationDelay: '0.5s' }}>
      {isTapped && (
        <div className="absolute -top-12 bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black font-mono text-sm px-4 py-2 rounded-xl font-bold shadow-2xl animate-fade-in-up z-50 transform -rotate-2 whitespace-nowrap">
          {message}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-900 dark:bg-neutral-100 transform rotate-45" />
        </div>
      )}
      <button
        onClick={handleTap}
        disabled={isTapped}
        className={`
          relative overflow-hidden group px-8 py-4 sm:px-12 sm:py-6 rounded-full 
          border-4 border-red-600 bg-red-500/10 dark:bg-red-950/30
          flex items-center gap-3 sm:gap-4 transition-all duration-300
          ${isTapped ? 'scale-95 opacity-50 cursor-not-allowed' : 'hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.8)]'}
        `}
      >
        {/* Warning stripes background effect on hover */}
        <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)] transition-opacity duration-300" />
        
        <AlertTriangle className={`w-6 h-6 sm:w-8 sm:h-8 text-red-600 group-hover:text-white ${isTapped ? 'animate-spin' : 'animate-pulse'}`} />
        <span className="font-black text-red-600 group-hover:text-white tracking-widest uppercase text-base sm:text-xl">
          {isTapped ? "ERROR 666" : "DO NOT TAP"}
        </span>
      </button>
    </div>
  );
}
