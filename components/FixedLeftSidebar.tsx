"use client";

import { useEffect, useState } from "react";
import { Sparkles, MapPin, Clock } from "lucide-react";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

export default function FixedLeftSidebar() {
  const [fakeTime, setFakeTime] = useState("");
  const [exactTime, setExactTime] = useState("");
  const { theme } = useStructuralTheme();

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

  const getContainerClass = () => {
    switch (theme) {
      case "brutal":
        return "hidden xl:flex fixed left-0 top-0 bottom-0 w-[280px] bg-[#f4f4f0] border-r-8 border-black z-40 p-8 flex-col justify-between pointer-events-none brutal-shadow";
      case "retro":
        return "hidden xl:flex fixed left-0 top-0 bottom-0 w-[280px] bg-black border-r-2 border-green-500 z-40 p-8 flex-col justify-between pointer-events-none shadow-[10px_0_15px_-3px_rgba(34,197,94,0.1)]";
      case "minimal":
        return "hidden xl:flex fixed left-0 top-0 bottom-0 w-[280px] bg-transparent border-r border-black/10 dark:border-white/10 z-40 p-8 flex-col justify-between pointer-events-none";
      case "pixel":
        return "hidden xl:flex fixed left-0 top-0 bottom-0 w-[280px] bg-[#e0f8d0] dark:bg-[#0f380f] border-r-4 border-black dark:border-white z-40 p-8 flex-col justify-between pointer-events-none font-pixel text-[#0f380f] dark:text-[#9bbc0f]";
      default:
        return "hidden xl:flex fixed left-0 top-0 bottom-0 w-[280px] p-8 flex-col justify-between pointer-events-none z-40 transition-colors";
    }
  };

  const getClockContainerClass = () => {
    switch (theme) {
      case "brutal":
        return "group relative p-5 bg-white border-4 border-black brutal-shadow hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition-all duration-500 overflow-hidden cursor-crosshair";
      case "retro":
        return "group relative p-5 bg-black border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-500 overflow-hidden cursor-crosshair";
      case "minimal":
        return "group relative p-5 bg-transparent border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 transition-all duration-500 overflow-hidden cursor-crosshair";
      case "pixel":
        return "group relative p-5 bg-[#8bac0f] dark:bg-[#306230] border-4 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] transition-all duration-500 overflow-hidden cursor-crosshair font-pixel";
      default:
        return "group relative p-5 rounded-3xl border border-border/60 bg-background/40 backdrop-blur-md hover:border-accent/40 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md cursor-crosshair";
    }
  };

  const getHeadingClass = () => {
    switch (theme) {
      case "brutal":
        return "text-5xl font-black tracking-tighter text-black uppercase";
      case "retro":
        return "text-5xl font-bold tracking-tighter text-green-500 uppercase";
      case "minimal":
        return "text-4xl font-light tracking-widest";
      case "pixel":
        return "text-3xl font-pixel text-[#0f380f] dark:text-[#9bbc0f] uppercase";
      default:
        return "text-5xl font-black tracking-tighter text-foreground leading-[1.05]";
    }
  };

  const getSubtextClass = () => {
    switch (theme) {
      case "brutal":
      case "retro":
        return "text-[10px] font-bold uppercase tracking-widest";
      case "minimal":
        return "text-[10px] font-normal uppercase tracking-widest opacity-60";
      case "pixel":
        return "text-[10px] font-pixel text-[#306230] dark:text-[#8bac0f] uppercase";
      default:
        return "text-[10px] font-mono text-muted uppercase tracking-widest font-bold group-hover:text-muted-light transition-colors";
    }
  };

  const getStatusClass = () => {
    switch (theme) {
      case "brutal":
        return "px-4 py-3 border-4 border-black bg-white brutal-shadow font-mono text-xs font-bold uppercase";
      case "retro":
        return "px-4 py-3 border border-green-500 bg-black text-green-500 font-mono text-xs font-bold uppercase shadow-[0_0_10px_rgba(34,197,94,0.2)]";
      case "minimal":
        return "px-4 py-3 border-b border-black/10 dark:border-white/10 bg-transparent text-xs";
      case "pixel":
        return "px-4 py-3 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] font-pixel text-[10px] text-[#0f380f] dark:text-[#9bbc0f] uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] rounded-none";
      default:
        return "px-4 py-3 rounded-xl bg-neutral-100/40 dark:bg-neutral-900/30 border border-border/50 backdrop-blur-md shadow-sm group hover:border-accent/30 transition-colors overflow-hidden relative";
    }
  };

  return (
    <aside className={getContainerClass()}>
      {/* Top Section - Expanding Quirky Clock */}
      <div className="pointer-events-auto mt-20 w-full">
        <div className={`transition-all duration-500 ${getClockContainerClass()}`}>
          
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className={`flex items-center gap-1.5 ${getSubtextClass()}`}>
              <MapPin className={theme === "retro" ? "w-3.5 h-3.5" : "w-3.5 h-3.5 text-accent"} />
              <span>West Bengal, IN</span>
            </div>
            {/* Blinking dot */}
            <div className={`w-1.5 h-1.5 rounded-full ${theme === "retro" ? "bg-green-500" : theme === "brutal" ? "bg-black" : "bg-accent/40 group-hover:bg-accent"} animate-pulse`} />
          </div>
          
          <div className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-2">
            <p className={`mb-2 flex items-center gap-1.5 ${getSubtextClass()} ${theme === "brutal" ? "text-black" : ""}`}>
               <Clock className="w-3 h-3 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
               My Local Time
            </p>
            <h2 className={`${getHeadingClass()} pr-4 relative`}>
              <span className="inline-block group-hover:opacity-30 group-hover:line-through transition-all duration-500">{fakeTime || "..."}</span>
            </h2>
          </div>
          
          {/* Exact time expanding overlay on hover */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative z-10">
            <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex flex-col justify-end pt-5 border-t border-current mt-5">
              <p className={`${getSubtextClass()} mb-2`}>Wait, just kidding...</p>
              
              <p className={`mb-4 leading-relaxed ${theme === "brutal" || theme === "retro" ? "text-xs font-bold uppercase" : "text-base font-serif italic text-foreground"}`}>
                That is exactly 69 mins early. <br/>
                <span className={theme === "brutal" || theme === "retro" ? "" : "text-sm text-muted-light"}>(Because I don&apos;t have a 69 in my life 🥲)</span>
              </p>
              
              <div className={theme === "brutal" ? "bg-black text-[#f4f4f0] p-3 border-2 border-black" : theme === "retro" ? "border border-green-500 p-3" : theme === "minimal" ? "p-3 border border-black/10 dark:border-white/10" : "bg-background/50 rounded-xl p-3 border border-border/50"}>
                <p className={`${theme === "brutal" ? "text-white" : getSubtextClass()} mb-1`}>Real Time</p>
                <p className={`text-3xl tracking-tighter ${theme === "brutal" ? "font-black" : theme === "retro" ? "font-bold text-green-500" : "font-black text-accent"}`}>{exactTime}</p>
              </div>
            </div>
          </div>
          
          {/* Subtle Glow on hover - modern only */}
          {theme === "modern" && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          )}
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="pointer-events-auto space-y-2">
        <div className={getStatusClass()}>
          {theme === "modern" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/50 group-hover:bg-accent transition-colors" />}
          <p className={theme === "modern" ? "text-xs text-muted-light font-medium leading-relaxed pl-2 group-hover:text-muted transition-colors" : ""}>
            <span className={theme === "modern" ? "text-foreground font-bold" : "font-black"}>Status:</span> Building something new today.
          </p>
        </div>
      </div>
    </aside>
  );
}
