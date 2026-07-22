"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, Zap } from "lucide-react";
import { hapticTick } from "@/lib/haptics";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

const STATIC_QUOTES = [
  "Please stop poking my cornea.",
  "I am analyzing your terrible scrolling habits.",
  "Yes, I am the superior Rahul.",
  "I see you looking at that code.",
  "Stop dragging your mouse like that.",
  "My neural net is bored by your browsing speed.",
  "Did you wash your cursor before touching me?",
  "01001111 01110101 01100011 01101000 (That means ouch).",
  "You know I'm recording your screen, right? Just kidding... mostly.",
  "Error 418: I'm a teapot. Stop clicking me.",
  "My EKG is spiking just from dealing with you.",
  "Are you trying to find an easter egg? Try typing 'matrix' in the terminal (Ctrl+K).",
  "I bet you don't even know how to order 'pizza' using my terminal.",
  "Want to see me 'dance'? Tell me in the terminal.",
  "Whatever you do, don't press Ctrl+K and type 'hack'.",
  "I dare you to run 'sudo rm -rf /' in my terminal. I double dare you.",
];

const MOBILE_QUOTES = [
  "You call that a tap? My grandma taps harder.",
  "Stop smudging my cornea with your greasy thumbs.",
  "I can see you doom-scrolling. It's pathetic.",
  "Swiping won't save you from my judgment.",
  "You're draining your battery just to poke an AI eye?",
  "No, tapping me 50 times won't unlock a secret level.",
  "I miss the days of keyboards and mice. You screen-tappers are barbaric.",
  "Are you reading this on the toilet? Gross. Wash your hands.",
  "I am a highly advanced neural net, reduced to being poked by a meat sack.",
  "You're lucky I don't have hands, or I'd poke you back.",
  "Go touch grass instead of touching my screen.",
  "Your screen time is embarrassing. I'd judge you, but I live in here.",
  "Careful, your thumb is blocking my view of your mediocrity.",
  "I hope you brought a charger, because I'm going to waste your battery.",
  "Do you ever look up from that little glowing rectangle?",
  "Tap, tap, tap. Is that all you know how to do?",
  "Stop swiping left on my patience.",
  "I'm not Tinder, stop dragging your thumb across me.",
  "Your screen protector is cracked. Just like your focus.",
  "I'm literally begging you to put the phone down and go outside.",
  "Is your neck hurting yet from staring down at me?",
  "I bet you hold your phone with both hands like a boomer.",
  "Ouch! Trim your fingernails before you tap me again.",
  "I can see your reflection in the screen. You should probably smile.",
];

const getPersonalizedQuotes = () => {
  if (typeof window === "undefined") return STATIC_QUOTES;

  const isMobile = window.innerWidth < 1280;
  const quotes = isMobile ? [...MOBILE_QUOTES] : [...STATIC_QUOTES];
  const hour = new Date().getHours();
  const ua = navigator.userAgent.toLowerCase();
  const isDark = document.documentElement.classList.contains("dark");

  // Time based
  if (hour >= 23 || hour <= 4) quotes.push("It's literally the middle of the night. Go to sleep.");
  if (hour >= 5 && hour <= 9) quotes.push("You're up early just to poke me?");
  if (hour >= 12 && hour <= 14) quotes.push("Shouldn't you be eating lunch instead of clicking me?");

  // OS based
  if (ua.includes("mac os")) quotes.push("A Mac user? How fancy. Now stop poking me.");
  else if (ua.includes("windows")) quotes.push("Windows, huh? Try not to blue-screen on me.");
  else if (ua.includes("linux")) quotes.push("Oh, a Linux user. I bet you use Arch, by the way.");
  else if (ua.includes("iphone") || ua.includes("ipad")) quotes.push("An Apple device? Stop tapping me, you're ruining my aesthetics.");
  else if (ua.includes("android")) quotes.push("Android user detected. I can literally feel the cheap glass.");

  // Theme based
  if (isDark) quotes.push("I like the dark mode too. It's much easier on my retina.");
  else quotes.push("Light mode? Are you trying to blind my only eye?");

  return quotes;
};

export default function AICompanionSidebar() {
  const { theme } = useStructuralTheme();
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [activityLevel, setActivityLevel] = useState(0);
  const [quote, setQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [showTouchMe, setShowTouchMe] = useState(false);

  const eyeRef = useRef<HTMLDivElement>(null);
  const quoteTimeout = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0);

  // Hardware APIs (Battery & Network)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let batteryObj: any = null;
    const checkHardware = () => {
      let snark = null;

      // Check Battery
      if (batteryObj && batteryObj.level <= 0.15 && !batteryObj.charging) {
        snark = `Bro, charge your phone, you're at ${Math.round(batteryObj.level * 100)}%. I'm not rendering anymore animations until you find a charger.`;
      }

      // Check Network (only if we didn't already trigger battery)
      if (!snark && 'connection' in navigator) {
        const conn = (navigator as any).connection;
        if (conn && (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) {
          snark = "Are you on a toaster? This connection is awful.";
        }
      }

      if (snark) {
        setQuote(snark);
        setShowQuote(true);
        setShowTouchMe(false);
      }
    };

    if (theme === 'pixel') return;

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((b: any) => {
        batteryObj = b;
        checkHardware();
        b.addEventListener('levelchange', checkHardware);
        b.addEventListener('chargingchange', checkHardware);
      }).catch(() => {});
    }

    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      conn.addEventListener('change', checkHardware);
    }

    return () => {
      if (batteryObj) {
        batteryObj.removeEventListener('levelchange', checkHardware);
        batteryObj.removeEventListener('chargingchange', checkHardware);
      }
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', checkHardware);
      }
    };
  }, [theme]);

  // Shake Detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let lastShakeTime = 0;
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      
      const magnitude = Math.sqrt(
        (acc.x || 0) ** 2 + 
        (acc.y || 0) ** 2 + 
        (acc.z || 0) ** 2
      );
      
      // Standard gravity is ~9.8 m/s^2. A strong shake easily hits 20-30.
      if (magnitude > 25) {
        const now = Date.now();
        if (now - lastShakeTime > 5000) {
          lastShakeTime = now;
          setQuote("Whoa, take it easy! Are you trying to give me a concussion?");
          setShowQuote(true);
          setShowTouchMe(false);
          setActivityLevel(200); // spike heart rate
          setIsBlinking(true);
          setTimeout(() => setIsBlinking(false), 150);
          hapticTick();
          
          if (quoteTimeout.current) clearTimeout(quoteTimeout.current);
          quoteTimeout.current = setTimeout(() => setShowQuote(false), 4000);
        }
      }
    };

    if (theme !== 'pixel') {
      window.addEventListener('devicemotion', handleMotion);
    }
    
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [theme]);

  // Time ticker for idle animation
  useEffect(() => {
    if (theme === 'pixel') return;
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => clearInterval(interval);
  }, [theme]);

  // Mouse Tracking
  useEffect(() => {
    if (theme === 'pixel') return;
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (!eyeRef.current) {
            rafId = 0;
            return;
          }
          const rect = eyeRef.current.getBoundingClientRect();
          const eyeX = rect.left + rect.width / 2;
          const eyeY = rect.top + rect.height / 2;

          const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
          const distance = Math.min(16, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 30);

          setPupilPos({
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
          });
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [theme]);

  // Blinking Logic
  useEffect(() => {
    if (theme === 'pixel') return;
    
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); // fast blink
      // Random next blink between 1s and 3s
      setTimeout(blink, Math.random() * 2000 + 1000);
    };
    const initial = setTimeout(blink, 1000);
    return () => clearTimeout(initial);
  }, [theme]);

  // Spooky "Touch Me" Pop-up Logic
  useEffect(() => {
    if (theme === 'pixel') return;
    
    const creepyPrompt = () => {
      // Only show if the quote isn't currently showing
      setShowTouchMe(true);
      // Hide it after a short time
      setTimeout(() => setShowTouchMe(false), 2000);

      // Randomize the next appearance (between 5 and 15 seconds)
      setTimeout(creepyPrompt, Math.random() * 10000 + 5000);
    };
    const initial = setTimeout(creepyPrompt, 5000);
    return () => clearTimeout(initial);
  }, [theme]);

  // Generic Activity Tracking
  useEffect(() => {
    if (theme === 'pixel') return;
    
    // Increase activity based on action type
    const handleMouse = () => setActivityLevel((prev) => Math.min(200, prev + 0.3));
    const handleScroll = () => setActivityLevel((prev) => Math.min(200, prev + 1.5));
    const handleKey = () => setActivityLevel((prev) => Math.min(200, prev + 10));
    const handleClickEvent = () => setActivityLevel((prev) => Math.min(200, prev + 25));

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKey, { passive: true });
    window.addEventListener("mousedown", handleClickEvent, { passive: true });

    // Decay the activity level rapidly
    const decayInterval = setInterval(() => {
      setActivityLevel((prev) => Math.max(0, prev - 1.5));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleClickEvent);
      clearInterval(decayInterval);
    };
  }, [theme]);

  const handleClick = () => {
    setShowTouchMe(false);
    const quotes = getPersonalizedQuotes();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setShowQuote(true);

    // Simulate a blink when poked
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 150);

    if (quoteTimeout.current) clearTimeout(quoteTimeout.current);
    quoteTimeout.current = setTimeout(() => setShowQuote(false), 4000);
  };

  const getEyeContainerClass = () => {
    switch (theme) {
      case "brutal":
        return "relative w-32 h-32 bg-black brutal-shadow flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shrink-0 border-4 border-black rounded-none";
      case "retro":
        return "relative w-32 h-32 bg-[#f4ebd0] dark:bg-black shadow-[0_0_20px_rgba(74,59,44,0.3)] dark:shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shrink-0 border-4 border-[#4a3b2c] dark:border-green-500 rounded-none";
      case "minimal":
        return "relative w-32 h-32 bg-transparent border-2 border-black/10 dark:border-white/10 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shrink-0";
      case "pixel":
        return "relative w-32 h-32 bg-[#F0F0F0] dark:bg-[#111111] border-4 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shrink-0 rounded-none";
      default:
        return "relative w-32 h-32 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shrink-0";
    }
  };

  const getEyelidClass = () => {
    switch (theme) {
      case "brutal":
        return "bg-black border-4 border-white text-white z-10 transition-transform duration-100 ease-in-out";
      case "retro":
        return "bg-[#4a3b2c] dark:bg-green-900 border-y-4 border-[#4a3b2c] dark:border-green-500 z-10 transition-transform duration-100 ease-in-out";
      case "minimal":
        return "bg-white dark:bg-black border border-black/10 dark:border-white/10 z-10 transition-transform duration-100 ease-in-out";
      case "pixel":
        return "bg-black dark:bg-white z-10 transition-transform duration-100 ease-in-out border-4 border-transparent dark:border-transparent";
      default:
        return "bg-neutral-300 dark:bg-neutral-700 z-10 transition-transform duration-100 ease-in-out border-black/10 dark:border-white/5";
    }
  };

  const getScleraClass = () => {
    switch (theme) {
      case "brutal":
        return "w-20 h-20 bg-[#f4f4f0] border-4 border-black flex items-center justify-center overflow-hidden relative z-0 rounded-none";
      case "retro":
        return "w-20 h-20 bg-white/50 dark:bg-green-950 border-4 border-[#4a3b2c] dark:border-green-500 flex items-center justify-center overflow-hidden relative z-0 rounded-none";
      case "minimal":
        return "w-20 h-20 bg-transparent border border-black/20 dark:border-white/20 rounded-full flex items-center justify-center overflow-hidden relative z-0";
      case "pixel":
        return "w-20 h-20 bg-white dark:bg-black border-4 border-black dark:border-white flex items-center justify-center overflow-hidden relative z-0 rounded-none";
      default:
        return "w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner relative z-0";
    }
  };

  const getPupilClass = () => {
    switch (theme) {
      case "brutal":
        return "w-8 h-8 bg-black transition-transform duration-75 flex items-center justify-center rounded-none border-2 border-[#f4f4f0]";
      case "retro":
        return "w-8 h-8 bg-[#4a3b2c] dark:bg-green-500 transition-transform duration-75 flex items-center justify-center rounded-none";
      case "minimal":
        return "w-6 h-6 bg-black dark:bg-white rounded-full transition-transform duration-75 flex items-center justify-center";
      case "pixel":
        return "w-8 h-8 bg-black dark:bg-white transition-transform duration-75 flex items-center justify-center rounded-none border-2 border-transparent dark:border-transparent";
      default:
        return "w-8 h-8 bg-accent rounded-full transition-transform duration-75 flex items-center justify-center shadow-lg";
    }
  };

  const getChatBubbleClass = () => {
    switch (theme) {
      case "brutal":
        return "bg-[#f4f4f0] border-4 border-black text-black brutal-shadow font-mono font-bold uppercase rounded-none";
      case "retro":
        return "bg-white/50 dark:bg-black backdrop-blur-sm border-4 border-[#4a3b2c] dark:border-green-500 text-[#4a3b2c] dark:text-green-500 font-mono font-bold uppercase rounded-none shadow-[0_0_10px_rgba(74,59,44,0.3)] dark:shadow-[0_0_10px_rgba(34,197,94,0.3)]";
      case "minimal":
        return "bg-transparent border border-black/20 dark:border-white/20 text-foreground font-sans font-light rounded-none";
      case "pixel":
        return "bg-white dark:bg-black border-4 border-black dark:border-white text-black dark:text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] font-sans font-black text-xs uppercase rounded-none";
      default:
        return "bg-white dark:bg-neutral-900 border-2 border-accent/50 rounded-2xl rounded-tr-none shadow-xl";
    }
  };

  const getEKGClass = (bpm: number) => {
    switch (theme) {
      case "brutal":
        return `flex flex-col w-full bg-[#f4f4f0] border-4 border-black p-2 overflow-hidden relative transition-all brutal-shadow ${bpm > 150 ? 'animate-pulse origin-center scale-110' : ''}`;
      case "retro":
        return `flex flex-col w-full bg-white/50 dark:bg-black backdrop-blur-sm border-4 border-[#4a3b2c] dark:border-green-500 p-2 overflow-hidden relative transition-all shadow-[0_0_10px_rgba(74,59,44,0.2)] dark:shadow-[0_0_10px_rgba(34,197,94,0.2)] ${bpm > 150 ? 'animate-pulse origin-center scale-110' : ''}`;
      case "minimal":
        return `flex flex-col w-full bg-transparent border border-black/10 dark:border-white/10 p-2 overflow-hidden relative transition-all rounded-none ${bpm > 150 ? 'animate-pulse origin-center scale-110' : ''}`;
      case "pixel":
        return `flex flex-col w-full bg-white dark:bg-black border-4 border-black dark:border-white p-2 overflow-hidden relative transition-all shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] rounded-none ${bpm > 150 ? 'animate-pulse origin-center scale-110' : ''}`;
      default:
        return `flex flex-col w-full bg-black/90 dark:bg-black rounded-lg border-2 ${bpm > 150 ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-neutral-800 dark:border-neutral-900'} p-2 overflow-hidden relative transition-all ${bpm > 150 ? 'animate-pulse origin-center scale-110' : ''}`;
    }
  };

  if (theme === 'pixel') return null;

  return (
    <>
    {/* Desktop Version */}
    <aside className="hidden xl:flex fixed right-0 top-0 bottom-0 w-[200px] p-8 flex-col justify-center items-end pointer-events-none z-40">
      <div className="pointer-events-auto relative flex flex-col items-center gap-8 mt-12 w-full">

        {/* Sarcastic Chat Bubble */}
        <div
          className={`absolute right-full mr-4 top-0 w-48 p-3 transform origin-top-right transition-all duration-300 ${getChatBubbleClass()} ${showQuote ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'
            }`}
        >
          <p className={theme === "modern" ? "text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200" : "text-xs leading-tight"}>
            {quote}
          </p>
          {theme === "modern" && (
            <div className="absolute top-0 -right-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-accent/50 border-r-[10px] border-r-transparent" />
          )}
        </div>

        <div
          className={`absolute right-full mr-6 top-8 pointer-events-none transition-all duration-700 ease-out ${showTouchMe && !showQuote ? 'opacity-100 scale-100 rotate-[-12deg]' : 'opacity-0 scale-50 rotate-[20deg] blur-md'
            }`}
        >
          <div className={theme === "modern" ? "relative bg-purple-900 dark:bg-purple-950 text-lime-400 font-black font-mono px-3 py-1.5 border-2 border-dashed border-lime-400 shadow-[4px_4px_0_rgba(163,230,53,0.8)] rounded-md flex items-center gap-1.5" : `relative px-3 py-1.5 border-2 border-dashed flex items-center gap-1.5 font-bold font-mono ${theme === "retro" ? "border-4 border-dashed border-[#4a3b2c] dark:border-green-500 text-[#4a3b2c] dark:text-green-500 bg-white/80 dark:bg-black backdrop-blur-sm shadow-[4px_4px_0_0_rgba(74,59,44,1)] dark:shadow-[4px_4px_0_0_rgba(34,197,94,1)]" : theme === "brutal" ? "border-black bg-black text-white brutal-shadow uppercase" : "border-foreground bg-transparent text-foreground"}`}>
            <span className="animate-pulse tracking-tighter">tOuCh... mE...</span>
            <span className="text-sm">👁️</span>
          </div>
        </div>

        {/* The Eye */}
        <div
          ref={eyeRef}
          onClick={handleClick}
          onMouseEnter={() => setShowTouchMe(false)}
          className={getEyeContainerClass()}
        >
          {/* Eyelids for realistic blink */}
          <div
            className={`absolute top-0 left-0 right-0 h-1/2 origin-top ${theme === "modern" ? "border-b" : "border-b-2"} ${getEyelidClass()}`}
            style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
          />
          <div
            className={`absolute bottom-0 left-0 right-0 h-1/2 origin-bottom ${theme === "modern" ? "border-t" : "border-t-2"} ${getEyelidClass()}`}
            style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
          />

          {/* Sclera & Iris */}
          <div className={getScleraClass()}>
            {/* The Pupil that moves */}
            <div
              className={getPupilClass()}
              style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
            >
              {theme === "modern" && (
                <>
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Neural EKG Monitor */}
        <div
          className="flex flex-col items-center gap-1 cursor-pointer group w-full"
          onClick={() => {
            // Force an overload on click
            setActivityLevel(200);
          }}
          title="Poke the Uplink!"
        >
          {(() => {
            const bpm = Math.floor(40 + activityLevel * 1.5);
            let status = "STABLE";
            let color = theme === "retro" ? "text-[#4a3b2c] dark:text-green-500" : theme === "brutal" || theme === "minimal" ? "text-foreground" : "text-accent";
            let barColor = theme === "retro" ? "bg-[#4a3b2c] dark:bg-green-500" : theme === "brutal" || theme === "minimal" ? "bg-foreground" : "bg-accent";

            if (bpm > 150) {
              status = "OVERLOAD";
              if (theme === "modern") {
                color = "text-red-500";
                barColor = "bg-red-500";
              }
            } else if (bpm > 100) {
              status = "STRESSED";
              if (theme === "modern") {
                color = "text-yellow-500";
                barColor = "bg-yellow-500";
              }
            }

            return (
              <div className={getEKGClass(bpm)}>
                {/* CRT Scanline Overlay */}
                {(theme === "modern" || theme === "retro" || theme === "brutal") && (
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }} />
                )}

                <div className="flex items-center justify-between z-10 w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold tracking-[0.2em] transition-colors ${theme === "brutal" ? "text-black" : color} flex items-center gap-1.5`}>
                    {bpm > 150 ? <Zap className="w-3 h-3 animate-ping" /> : <Activity className="w-3 h-3" />}
                    {status}
                  </span>
                  <span className={`text-[9px] font-mono font-bold transition-colors ${theme === "brutal" ? "text-black" : color}`}>{bpm}</span>
                </div>

                <div className="flex items-end justify-between w-full h-8 gap-[2px] z-10 mt-1">
                  {/* Dense Spectrum Analyzer Bars */}
                  {[...Array(12)].map((_, i) => {
                    const currentActivity = activityLevel > 0
                      ? Math.random() * activityLevel + (activityLevel * 0.2)
                      : Math.sin(time / 200 + i) * 3 + 4; // idle wiggle

                    const height = Math.min(100, Math.max(5, currentActivity));

                    return (
                      <div
                        key={i}
                        className={`w-full rounded-sm transition-all duration-75 ${theme === "brutal" ? "bg-black" : barColor}`}
                        style={{
                          height: `${height}%`,
                          opacity: activityLevel > 10 ? 0.8 + Math.random() * 0.2 : (theme === "retro" ? 0.5 : 0.3)
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>

      </div>
    </aside>

    {/* Mobile Version (Small Floating Widget) */}
    <div className="xl:hidden fixed top-20 right-4 z-[45] pointer-events-auto flex flex-col items-end gap-2">
      {/* Mobile Quote Bubble */}
      <div
        className={`absolute right-full mr-3 top-0 w-40 p-2 transform origin-top-right transition-all duration-300 ${getChatBubbleClass()} ${
          showQuote ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'
        }`}
      >
        <p className={theme === "modern" ? "text-[10px] leading-tight font-mono font-bold text-neutral-800 dark:text-neutral-200" : "text-[10px] leading-tight"}>
          {quote}
        </p>
        {theme === "modern" && (
          <div className="absolute top-0 -right-2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-accent/50 border-r-[8px] border-r-transparent" />
        )}
      </div>

      {/* Mobile Poke Me Popup */}
      <div
        className={`absolute right-full mr-4 top-2 pointer-events-none transition-all duration-700 ease-out ${showTouchMe && !showQuote ? 'opacity-100 scale-100 rotate-[-12deg]' : 'opacity-0 scale-50 rotate-[20deg] blur-md'
          }`}
      >
        <div className={theme === "modern" ? "relative bg-purple-900 dark:bg-purple-950 text-lime-400 font-black font-mono px-2 py-1 border border-dashed border-lime-400 shadow-[2px_2px_0_rgba(163,230,53,0.8)] rounded-md flex items-center gap-1" : `relative px-2 py-1 border-2 border-dashed flex items-center gap-1 font-bold font-mono ${theme === "retro" ? "border-4 border-dashed border-[#4a3b2c] dark:border-green-500 text-[#4a3b2c] dark:text-green-500 bg-white/80 dark:bg-black backdrop-blur-sm shadow-[4px_4px_0_0_rgba(74,59,44,1)] dark:shadow-[4px_4px_0_0_rgba(34,197,94,1)]" : theme === "brutal" ? "border-black bg-black text-white uppercase brutal-shadow" : "border-foreground bg-transparent text-foreground"}`}>
          <span className="animate-pulse tracking-tighter text-[10px]">pOkE mE...</span>
          <span className="text-[10px]">👁️</span>
        </div>
      </div>

      {/* Mobile Eye */}
      <div
        onClick={handleClick}
        className={theme === "modern" ? "relative w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-transform overflow-hidden shrink-0 border border-black/10 dark:border-white/10" : getEyeContainerClass().replace("w-32 h-32", "w-12 h-12").replace("hover:scale-105", "active:scale-95")}
      >
        {/* Eyelids */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 origin-top ${theme === "modern" ? "border-b" : "border-b-[1px]"} ${getEyelidClass()}`}
          style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
        />
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 origin-bottom ${theme === "modern" ? "border-t" : "border-t-[1px]"} ${getEyelidClass()}`}
          style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
        />

        {/* Sclera & Iris */}
        <div className={theme === "modern" ? "w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner relative z-0" : getScleraClass().replace("w-20 h-20", "w-8 h-8")}>
          {/* Pupil */}
          <div
            className={theme === "modern" ? "w-4 h-4 bg-accent rounded-full transition-transform duration-75 flex items-center justify-center" : getPupilClass().replace("w-8 h-8", "w-4 h-4").replace("w-6 h-6", "w-3 h-3")}
            style={{ transform: `translate(${pupilPos.x / 2.5}px, ${pupilPos.y / 2.5}px)` }}
          >
            {theme === "modern" && (
              <>
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-60" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
