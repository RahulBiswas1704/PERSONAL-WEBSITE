"use client";

import { Share2 } from "lucide-react";
import { hapticHeavy } from "@/lib/haptics";

export default function ShareRoastButton() {
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

  return (
    <button
      onClick={handleShare}
      className="absolute top-4 right-4 md:top-8 md:right-8 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold font-mono text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-20 group"
    >
      <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
      <span className="hidden sm:inline">Roast a Friend</span>
      <span className="sm:hidden">Share</span>
    </button>
  );
}
