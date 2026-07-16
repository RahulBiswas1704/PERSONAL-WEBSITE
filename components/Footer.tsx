"use client";

import Link from "next/link";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useStructuralTheme();

  const getFooterClass = () => {
    switch (theme) {
      case "brutal":
        return "w-full border-t-8 border-black bg-[#f4f4f0] py-8 mt-auto";
      case "retro":
        return "w-full border-t-4 border-[#4a3b2c] dark:border-green-500 bg-[#f4ebd0] dark:bg-black py-8 mt-auto shadow-[0_0_15px_rgba(74,59,44,0.2)] dark:shadow-[0_0_15px_rgba(34,197,94,0.2)]";
      case "minimal":
        return "w-full border-t border-black/10 dark:border-white/10 bg-transparent py-8 mt-auto";
      case "pixel":
        return "w-full border-t-4 border-black dark:border-white bg-[#F0F0F0] dark:bg-[#111111] py-8 mt-auto font-sans";
      default:
        return "w-full border-t border-border bg-background py-8 transition-colors mt-auto";
    }
  };

  const getTextClass = () => {
    switch (theme) {
      case "brutal":
        return "text-xs font-black uppercase text-black tracking-widest";
      case "retro":
        return "text-xs font-bold uppercase text-[#4a3b2c] dark:text-green-500 tracking-widest";
      case "minimal":
        return "text-xs font-light text-foreground uppercase tracking-widest";
      case "pixel":
        return "text-xs font-black uppercase text-black dark:text-white tracking-widest";
      default:
        return "text-xs text-muted-light";
    }
  };

  const getSubtextClass = () => {
    switch (theme) {
      case "brutal":
        return "font-bold uppercase text-black bg-white px-2 py-1 border-2 border-black";
      case "retro":
        return "font-bold uppercase text-[#4a3b2c]/70 dark:text-green-500/70";
      case "minimal":
        return "font-light opacity-50 uppercase";
      case "pixel":
        return "font-bold uppercase text-black dark:text-white bg-transparent px-2 py-1 border-2 border-black dark:border-white mt-2 sm:mt-0";
      default:
        return "text-zinc-500 italic";
    }
  };

  const getLinkClass = () => {
    switch (theme) {
      case "brutal":
        return "hover:bg-black hover:text-white px-2 py-1 border-2 border-transparent hover:border-black transition-colors";
      case "retro":
        return "hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black px-2 py-1 transition-colors";
      case "minimal":
        return "text-neutral-500 hover:text-black dark:hover:text-white transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:bg-black dark:after:bg-white after:transition-transform after:duration-300";
      case "pixel":
        return "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-2 py-1 border-2 border-transparent hover:border-black dark:hover:border-white transition-colors inline-block";
      default:
        return "hover-link";
    }
  };

  return (
    <footer className={getFooterClass()}>
      <div className={`max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${getTextClass()}`}>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <span className={theme === "brutal" || theme === "pixel" ? "bg-black text-white dark:bg-white dark:text-black px-2 py-1" : ""}>&copy; {currentYear} Rahul.</span>
          <span className={`${getSubtextClass()} hidden sm:inline-block`}>Built with Next.js, caffeine, and mild panic.</span>
          <span className={`${getSubtextClass()} sm:hidden`}>Fueled by caffeine & Next.js.</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap justify-center shrink-0 whitespace-nowrap">
          <a
            href="https://github.com/RahulBiswas1704"
            target="_blank"
            rel="noopener noreferrer"
            className={getLinkClass()}
          >
            GitHub
          </a>
          <span className={theme === "retro" ? "text-[#4a3b2c] dark:text-green-500" : theme === "minimal" ? "opacity-30" : "text-border"}>/</span>
          <a
            href="https://www.linkedin.com/in/rahul-biswas1704/"
            target="_blank"
            rel="noopener noreferrer"
            className={getLinkClass()}
          >
            LinkedIn
          </a>
          <span className={theme === "retro" ? "text-[#4a3b2c] dark:text-green-500" : theme === "minimal" ? "opacity-30" : "text-border"}>/</span>
          <a
            href="mailto:rahul.biswas1704@gmail.com"
            className={getLinkClass()}
          >
            Email
          </a>
          <span className={theme === "retro" ? "text-[#4a3b2c] dark:text-green-500" : theme === "minimal" ? "opacity-30" : "text-border"}>/</span>
          <Link href="/uses" className={getLinkClass()}>
            Uses
          </Link>
        </div>
      </div>
    </footer>
  );
}
