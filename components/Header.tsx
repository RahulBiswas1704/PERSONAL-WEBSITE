"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";
import ShareModal from "./ShareModal";
import { Share } from "lucide-react";
import StructuralThemeSelector from "./StructuralThemeSelector";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

export default function Header() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { theme } = useStructuralTheme();

  const getHeaderClass = () => {
    switch (theme) {
      case "brutal":
        return "w-full border-b-4 border-black bg-[#f4f4f0] sticky top-0 z-50 brutal-shadow";
      case "retro":
        return "w-full border-b-4 border-[#4a3b2c] dark:border-green-500 bg-[#f4ebd0] dark:bg-black sticky top-0 z-50 shadow-[0_0_15px_rgba(74,59,44,0.2)] dark:shadow-[0_0_15px_rgba(34,197,94,0.2)] font-mono";
      case "minimal":
        return "w-full border-b border-black/10 dark:border-white/10 bg-background/90 backdrop-blur-md sticky top-0 z-50";
      case "pixel":
        return "w-full border-b-4 border-black dark:border-white bg-[#F0F0F0] dark:bg-[#111111] sticky top-0 z-50 font-sans text-black dark:text-white";
      default:
        return "w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors";
    }
  };

  const getLogoClass = () => {
    switch (theme) {
      case "brutal":
        return "font-black text-xl uppercase tracking-tighter text-black bg-white px-2 py-1 border-2 border-black";
      case "retro":
        return "font-bold text-xl uppercase text-[#4a3b2c] dark:text-green-500 tracking-widest";
      case "minimal":
        return "font-light text-base tracking-widest uppercase";
      case "pixel":
        return "font-black text-xl uppercase tracking-tighter text-black dark:text-white bg-transparent px-2 py-1 border-2 border-black dark:border-white";
      default:
        return "font-bold text-sm sm:text-base hover:text-accent transition-colors duration-150";
    }
  };

  const getNavClass = () => {
    switch (theme) {
      case "brutal":
        return "text-xs font-black uppercase tracking-widest border-2 border-transparent hover:border-black hover:bg-black hover:text-white px-2 py-1 transition-colors";
      case "retro":
        return "text-xs font-bold uppercase tracking-widest text-[#4a3b2c] dark:text-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black px-2 py-1 transition-colors";
      case "minimal":
        return "text-xs font-light tracking-widest uppercase hover:opacity-50 transition-opacity";
      case "pixel":
        return "text-xs font-black uppercase tracking-widest border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-2 py-1 transition-colors";
      default:
        return "text-sm font-medium hover-link";
    }
  };

  return (
    <header className={getHeaderClass()}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className={getLogoClass()}>
          {theme === "retro" ? "RB_SYS" : theme === "pixel" ? "RAHUL" : "Rahul"}
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden sm:flex items-center gap-2 sm:gap-4">
            <Link href="/projects" className={getNavClass()}>
              Projects
            </Link>
            <Link href="/me" className={getNavClass()}>
              Me
            </Link>
            <Link href="/sandbox" className={getNavClass()}>
              Kishmish
            </Link>
            <Link href="/guestbook" className={getNavClass()}>
              Guestbook
            </Link>
            <Link href="/resume" className={getNavClass()}>
              Resume
            </Link>
          </nav>
          <div className={`flex items-center gap-1 sm:gap-2 ${theme === "brutal" ? "border-l-4 border-black pl-4" : theme === "retro" ? "border-l-4 border-[#4a3b2c] dark:border-green-500 pl-4" : theme === "pixel" ? "border-l-4 border-black dark:border-white pl-4" : theme === "minimal" ? "border-l border-black/10 dark:border-white/10 pl-4" : "sm:border-l sm:border-border sm:pl-4"}`}>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className={theme === "brutal" ? "p-2 border-2 border-transparent hover:border-black hover:bg-black hover:text-white transition-colors text-black" : theme === "retro" ? "p-2 text-[#4a3b2c] dark:text-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors" : theme === "pixel" ? "p-2 border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors" : "p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"}
              aria-label="Share this page"
            >
              <Share className="w-4 h-4" />
            </button>
            <StructuralThemeSelector />
            {theme === "modern" && <AccentPicker />}
            {theme !== "brutal" && <ThemeToggle />}
          </div>
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </header>
  );
}
