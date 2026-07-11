"use client";

import { useEffect, useState } from "react";
import { Sparkles, MapPin, Clock } from "lucide-react";

export default function FixedLeftSidebar() {
  const [fakeTime, setFakeTime] = useState("");
  const [exactTime, setExactTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      
      // Fake time is exactly 69 minutes early
      const fake = new Date(now.getTime() - 69 * 60000);
      
      const options: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: true };
      const exactOptions: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
      
      setFakeTime(fake.toLocaleTimeString("en-US", options));
      setExactTime(now.toLocaleTimeString("en-US", exactOptions));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="hidden xl:flex fixed left-0 top-0 bottom-0 w-[280px] p-8 flex-col justify-between pointer-events-none z-40">
      {/* Top Section - Expanding Quirky Clock */}
      <div className="pointer-events-auto mt-20 w-full">
        <div className="group relative p-5 rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md hover:border-accent/40 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md cursor-crosshair">
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted uppercase tracking-widest font-bold group-hover:text-muted-light transition-colors">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>West Bengal, IN</span>
            </div>
            {/* Blinking dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent animate-pulse" />
          </div>
          
          <div className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2">
            <p className="text-[10px] font-mono text-muted-light/70 font-bold mb-2 uppercase tracking-widest flex items-center gap-1.5">
               <Clock className="w-3 h-3 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
               My Local Time
            </p>
            <h2 className="text-5xl font-black tracking-tighter text-foreground leading-[1.05] pr-4 relative">
              <span className="inline-block group-hover:opacity-30 group-hover:line-through transition-all duration-500">{fakeTime || "..."}</span>
            </h2>
          </div>
          
          {/* Exact time expanding overlay on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-10">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col justify-end pt-5 border-t border-border/40 mt-5">
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest font-bold mb-2">Wait, just kidding...</p>
              
              <p className="text-base font-serif italic text-foreground mb-4 leading-relaxed">
                That is exactly 69 mins early. <br/>
                <span className="text-sm text-muted-light">(Because I don&apos;t have a 69 in my life 🥲)</span>
              </p>
              
              <div className="bg-background/50 rounded-xl p-3 border border-border/50">
                <p className="text-[10px] font-mono text-muted-light uppercase tracking-widest font-bold mb-1">Real Time</p>
                <p className="text-3xl font-black text-accent tracking-tighter">{exactTime}</p>
              </div>
            </div>
          </div>
          
          {/* Subtle Glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="pointer-events-auto space-y-2">
        <div className="px-4 py-3 rounded-xl bg-neutral-100/40 dark:bg-neutral-900/30 border border-border/50 backdrop-blur-md shadow-sm group hover:border-accent/30 transition-colors overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/50 group-hover:bg-accent transition-colors" />
          <p className="text-xs text-muted-light font-medium leading-relaxed pl-2 group-hover:text-muted transition-colors">
            <span className="text-foreground font-bold">Status:</span> Building something new today.
          </p>
        </div>
      </div>
    </aside>
  );
}
