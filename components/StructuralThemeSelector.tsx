"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import { LayoutTemplate } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function StructuralThemeSelector() {
  const { theme, setTheme, availableThemes } = useStructuralTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={theme === "brutal" ? "p-2 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-colors text-black" : theme === "retro" ? "p-2 text-[#4a3b2c] dark:text-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors" : theme === "pixel" ? "p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-none border-2 border-transparent hover:border-black dark:hover:border-white" : "p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"}
        aria-label="Change Website Layout Theme"
        title="Change Layout Theme"
      >
        <LayoutTemplate className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50 origin-top-right"
          >
            <div className="px-3 py-2 border-b border-neutral-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Layout Theme
            </div>
            {availableThemes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  if (t.locked) {
                    const pwd = window.prompt("This theme is a work in progress. Enter password to unlock:");
                    if (pwd !== "Rahul.1704#") {
                      alert("Incorrect password.");
                      return;
                    }
                  }
                  setTheme(t.id);
                  setIsOpen(false);
                  router.refresh();
                }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                  theme === t.id
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{t.icon}</span>
                <span className="flex-1">{t.label}</span>
                {t.locked && <span className="text-xs opacity-50" title="Locked">🔒</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
