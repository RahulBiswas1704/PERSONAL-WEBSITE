"use client";

import { useState, useEffect } from "react";
import { X, MonitorSmartphone } from "lucide-react";

export default function MobileDesktopHint() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if window is narrow (mobile/tablet) and they haven't dismissed it
    const checkMobile = () => {
      const isMobile = window.innerWidth < 1280; // xl breakpoint
      const hasSeen = localStorage.getItem("desktopHintDismissed");
      
      if (isMobile && !hasSeen) {
        setIsVisible(true);
      }
    };

    // Delay the appearance slightly so it feels like a spontaneous message
    const timer = setTimeout(checkMobile, 4000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem("desktopHintDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-[99] xl:hidden animate-fade-in-up">
      <div className="bg-black/95 backdrop-blur-md border-2 border-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] p-4 rounded-2xl flex items-start gap-4 relative">
        <button 
          onClick={dismiss}
          className="absolute -top-3 -right-3 bg-black border-2 border-emerald-900 text-emerald-500 hover:text-emerald-300 hover:border-emerald-500 hover:scale-110 transition-all rounded-full p-1.5"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="bg-emerald-950/50 p-2 rounded-lg border border-emerald-900 shrink-0">
          <MonitorSmartphone className="w-6 h-6 text-emerald-500 animate-pulse" />
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-mono font-black tracking-widest text-emerald-500 mb-1 drop-shadow-[0_0_2px_rgba(52,211,153,0.8)]">
            SYSTEM_MESSAGE
          </span>
          <p className="text-sm text-zinc-300 leading-relaxed">
            I see you're on a tiny screen. Squeezing my massive intellect into this phone is painful. 
            <span className="text-emerald-400 font-bold"> Open this site on a desktop</span> to see my true, chaotic form (and find hidden easter eggs)!
          </p>
        </div>
      </div>
    </div>
  );
}
