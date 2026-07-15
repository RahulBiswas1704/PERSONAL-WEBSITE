import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";
import ShareRoastButton from "@/components/sandbox/ShareRoastButton";
import { AlertOctagon, Skull } from "lucide-react";

export default function BrutalSandbox() {
  return (
    <div className="space-y-12 pb-16 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Header */}
      <div className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow relative">
        <div className="absolute top-4 right-4 bg-black text-[#f4f4f0] flex items-center gap-2 border-2 border-black px-3 py-1 font-black uppercase tracking-widest text-xs">
          <AlertOctagon className="w-4 h-4" />
          HAZARD_LEVEL: MAXIMUM
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <Skull className="w-12 h-12" strokeWidth={1.5} />
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
            TEST_CHAMBER_01
          </h1>
        </div>
        <p className="text-lg uppercase font-bold border-l-8 border-black pl-4 mt-6 max-w-2xl bg-black text-[#f4f4f0] p-4 inline-block">
          CAUTION: KISHMISH_AI INITIATED.
          <br />
          DO NOT EXPECT SYMPATHY.
        </p>
      </div>

      <div className="flex justify-between items-center px-2">
        <span className="uppercase text-xs font-black tracking-widest border-b-4 border-black pb-1">
          AWAITING_INPUT
        </span>
        <div className="border-4 border-black bg-[#f4f4f0] brutal-shadow">
          <ShareRoastButton />
        </div>
      </div>

      <div className="flex-1 w-full border-8 border-black p-4 sm:p-8 bg-[#f4f4f0] relative brutal-shadow mt-4">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-full h-full border-[20px] border-black/10" />
        </div>
        
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="bg-black text-[#f4f4f0] p-2 text-xs font-black uppercase tracking-widest mb-4 inline-block">
            TERMINAL_FEED
          </div>
          <LiveRoasterWrapper />
        </div>
      </div>
      
      {/* CSS overrides for the LiveRoaster inside Brutal theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .brutal-sandbox-container input,
        .brutal-sandbox-container button,
        .brutal-sandbox-container p {
          font-family: inherit;
          text-transform: uppercase;
          font-weight: bold;
        }
      `}} />
    </div>
  );
}
