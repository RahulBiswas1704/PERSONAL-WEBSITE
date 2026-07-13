"use client";

import { memo } from "react";
import { MousePointerClick } from "lucide-react";

import { ClickRecord } from "@/lib/analyticsDb";

interface LiveHeatmapProps {
  clicks: ClickRecord[];
}

const LiveHeatmap = ({ clicks }: LiveHeatmapProps) => {
  // Filter clicks that have X/Y data
  const validClicks = clicks.filter(c => typeof c.x === 'number' && typeof c.y === 'number');

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-b from-blue-950/40 to-black/60 border border-blue-500/20 shadow-xl flex items-center justify-center">
      {/* Wireframe background to simulate a website layout */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         <div className="w-full h-12 border-b border-blue-500/50 flex items-center px-4 gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500/50" />
            <div className="w-24 h-4 rounded-md bg-blue-500/50" />
            <div className="ml-auto w-16 h-4 rounded-md bg-blue-500/50" />
         </div>
         <div className="p-8 flex flex-col gap-6">
            <div className="w-2/3 h-12 rounded-xl bg-blue-500/30 mx-auto mt-10" />
            <div className="w-1/2 h-6 rounded-md bg-blue-500/20 mx-auto" />
            <div className="grid grid-cols-3 gap-4 mt-12">
               <div className="aspect-square rounded-2xl bg-blue-500/10" />
               <div className="aspect-square rounded-2xl bg-blue-500/10" />
               <div className="aspect-square rounded-2xl bg-blue-500/10" />
            </div>
         </div>
      </div>

      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-blue-500/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Live XY Heatmap</span>
      </div>

      {/* Render Heatmap Dots */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {validClicks.map((click, idx) => (
          <div 
            key={idx}
            className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full bg-blue-500 mix-blend-screen opacity-60 blur-md pointer-events-none"
            style={{ left: `${click.x}%`, top: `${click.y}%` }}
          />
        ))}
        {/* Core hotspots (sharper centers) */}
        {validClicks.map((click, idx) => (
          <div 
            key={`core-${idx}`}
            className="absolute w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white opacity-80 pointer-events-none"
            style={{ left: `${click.x}%`, top: `${click.y}%` }}
          />
        ))}
      </div>

      {validClicks.length === 0 && (
        <div className="relative z-20 flex flex-col items-center opacity-50">
          <MousePointerClick className="w-8 h-8 text-blue-400 mb-2" />
          <p className="text-xs font-mono text-blue-200">Awaiting user clicks...</p>
        </div>
      )}
    </div>
  );
};

export default memo(LiveHeatmap);
