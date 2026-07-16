"use client";

import { Share2 } from "lucide-react";
import { hapticHeavy } from "@/lib/haptics";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

export default function ShareRoastButton() {
  const { theme } = useStructuralTheme();

  const handleShare = () => {
    hapticHeavy();
    const shareData = {
      title: "Roast Room",
      text: "I found this AI that aggressively roasts people in 3 languages. You have to try this. 🐈‍⬛🔥",
      url: "https://rahul-biswas.vercel.app/sandbox",
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${shareData.text}\n\n${shareData.url}`);
      alert("Link copied to clipboard! Send it to a friend to get them roasted.");
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case 'retro':
        return "absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#f4ebd0] dark:bg-black text-[#4a3b2c] dark:text-green-500 font-bold font-mono text-xs sm:text-sm uppercase tracking-wider border-2 border-dashed border-[#4a3b2c] dark:border-green-500 rounded-none shadow-[4px_4px_0_0_rgba(74,59,44,1)] dark:shadow-[4px_4px_0_0_rgba(34,197,94,1)] hover:scale-105 active:scale-95 transition-all z-20 group";
      case 'brutal':
        return "absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black text-white font-bold font-mono text-xs sm:text-sm uppercase tracking-wider border-4 border-black brutal-shadow hover:-translate-y-1 transition-all z-20 group";
      case 'pixel':
        return "absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0f380f] dark:bg-[#9bbc0f] text-[#9bbc0f] dark:text-[#0f380f] font-pixel text-[10px] uppercase border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform z-20 group";
      case 'minimal':
        return "absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-black dark:bg-white text-white dark:text-black font-sans font-light text-xs sm:text-sm tracking-wider rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all z-20 group";
      default:
        return "absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold font-mono text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-20 group";
    }
  };

  return (
    <button
      onClick={handleShare}
      className={getButtonClass()}
    >
      <span className="hidden sm:inline">Roast a Friend</span>
      <span className="sm:hidden">Share</span>
      <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
    </button>
  );
}
