import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";
import ShareRoastButton from "@/components/sandbox/ShareRoastButton";
import { Terminal, AlertTriangle } from "lucide-react";

export default function RetroSandbox() {
  return (
    <div className="space-y-16 pb-16 font-mono text-amber-500 selection:bg-amber-500 selection:text-black flex flex-col min-h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div className="border-4 border-amber-500 p-8 shadow-[8px_8px_0px_0px_rgba(245,158,11,1)] bg-black relative">
        <div className="absolute top-4 right-4 animate-pulse text-amber-500 flex items-center gap-2 border-2 border-amber-500 px-2 py-1">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">WARNING: HOSTILE AI</span>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
            ROAST_ROOM.EXE
          </h1>
        </div>
        <p className="text-lg uppercase opacity-80 border-t-2 border-amber-500/50 pt-4 mt-4 leading-relaxed">
          &gt; Loading Kishmish module...
          <br />
          &gt; Proceed at your own risk. This entity will aggressively insult you.
        </p>
      </div>

      <div className="flex justify-between items-center px-4">
        <span className="uppercase text-sm tracking-widest opacity-50">&lt; SYSTEM_READY /&gt;</span>
        <ShareRoastButton />
      </div>

      <div className="flex-1 w-full border-4 border-amber-500 p-4 sm:p-8 bg-black relative shadow-[8px_8px_0px_0px_rgba(245,158,11,1)]">
        <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <LiveRoasterWrapper />
        </div>
      </div>
    </div>
  );
}
