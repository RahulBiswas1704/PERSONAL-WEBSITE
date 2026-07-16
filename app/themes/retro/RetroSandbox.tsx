import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";
import ShareRoastButton from "@/components/sandbox/ShareRoastButton";
import { Terminal } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

export default function RetroSandbox() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#f4ebd0] dark:bg-black space-y-16 pb-16 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black flex flex-col relative">
      <CRTEffect />
      <div className="absolute top-4 right-4 z-50">
        <ShareRoastButton />
      </div>
      
      {/* Header */}
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-8 shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
            ROAST_ROOM.EXE
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-6 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest w-fit border-2 border-transparent">
          [ BEWARE_OF_CAT ]
        </div>
        
        <p className="text-lg uppercase opacity-80 border-t-4 border-[#4a3b2c] dark:border-green-500 pt-4 mt-4 leading-relaxed font-bold">
          &gt; "Meet Kishmish. She's cute, she's sassy, and she will aggressively insult you in three languages. Proceed at your own risk."
        </p>
      </div>

      <div className="flex-1 w-full relative z-10 flex flex-col items-center justify-center border-4 border-[#4a3b2c] dark:border-green-500 p-6 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e]">
        <LiveRoasterWrapper />
      </div>
    </div>
  );
}
