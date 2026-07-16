import GuestbookClient from "@/app/guestbook/GuestbookClient";
import DoNotTapButton from "@/components/DoNotTapButton";
import { Terminal } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

export default function RetroGuestbook() {
  return (
    <div className="min-h-screen bg-[#f4ebd0] dark:bg-black space-y-8 sm:space-y-16 pb-24 sm:pb-16 px-2 sm:px-0 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black overflow-x-hidden">
      <CRTEffect />
      
      {/* Header */}
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 mx-2 sm:mx-0">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest break-all">
            GUESTBOOK.LOG
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-6 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest w-fit border-2 border-transparent">
          [ SIGN_IT ]
        </div>
        
        <p className="text-lg uppercase opacity-80 border-t-4 border-[#4a3b2c] dark:border-green-500 pt-4 mt-4 leading-relaxed font-bold">
          &gt; "Leave a message, tell a joke, or just say hi to whoever wanders here next."
        </p>
      </div>
      
      <div className="relative z-10 border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] mx-2 sm:mx-0">
        <GuestbookClient />
      </div>

      {/* Global "DO NOT TAP" Button */}
      <div className="relative z-10">
        <DoNotTapButton />
      </div>
    </div>
  );
}
