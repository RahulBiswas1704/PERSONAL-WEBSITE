"use client";

import { useEffect, useState, useRef } from "react";
import { Activity, Zap } from "lucide-react";

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
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [activityLevel, setActivityLevel] = useState(0);
  const [quote, setQuote] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [showTouchMe, setShowTouchMe] = useState(false);

  const eyeRef = useRef<HTMLDivElement>(null);
  const quoteTimeout = useRef<NodeJS.Timeout | null>(null);
  const [time, setTime] = useState(0);

  // Time ticker for idle animation
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 100);
    return () => clearInterval(interval);
  }, []);

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(16, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 30);

      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking Logic
  useEffect(() => {
    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); // fast blink
      // Random next blink between 1s and 3s
      setTimeout(blink, Math.random() * 2000 + 1000);
    };
    const initial = setTimeout(blink, 1000);
    return () => clearTimeout(initial);
  }, []);

  // Spooky "Touch Me" Pop-up Logic
  useEffect(() => {
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
  }, []);

  // Generic Activity Tracking
  useEffect(() => {
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
  }, []);

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

  return (
    <>
    {/* Desktop Version */}
    <aside className="hidden xl:flex fixed right-0 top-0 bottom-0 w-[200px] p-8 flex-col justify-center items-end pointer-events-none z-40">
      <div className="pointer-events-auto relative flex flex-col items-center gap-8 mt-12 w-full">

        {/* Sarcastic Chat Bubble */}
        <div
          className={`absolute right-full mr-4 top-0 w-48 bg-white dark:bg-neutral-900 border-2 border-accent/50 p-3 rounded-2xl rounded-tr-none shadow-xl transform origin-top-right transition-all duration-300 ${showQuote ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'
            }`}
        >
          <p className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
            {quote}
          </p>
          <div className="absolute top-0 -right-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-accent/50 border-r-[10px] border-r-transparent" />
        </div>

        {/* Quirky Funky Spooky Touch Me Popup */}
        <div
          className={`absolute right-full mr-6 top-8 pointer-events-none transition-all duration-700 ease-out ${showTouchMe && !showQuote ? 'opacity-100 scale-100 rotate-[-12deg]' : 'opacity-0 scale-50 rotate-[20deg] blur-md'
            }`}
        >
          <div className="relative bg-purple-900 dark:bg-purple-950 text-lime-400 font-black font-mono px-3 py-1.5 border-2 border-dashed border-lime-400 shadow-[4px_4px_0_rgba(163,230,53,0.8)] rounded-md flex items-center gap-1.5">
            <span className="animate-pulse tracking-tighter">tOuCh... mE...</span>
            <span className="text-sm">👁️</span>
          </div>
        </div>

        {/* The Eye */}
        <div
          ref={eyeRef}
          onClick={handleClick}
          onMouseEnter={() => setShowTouchMe(false)}
          className="relative w-32 h-32 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform overflow-hidden shrink-0"
        >
          {/* Eyelids for realistic blink */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-neutral-300 dark:bg-neutral-700 z-10 transition-transform duration-100 ease-in-out origin-top border-b border-black/10 dark:border-white/5"
            style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-neutral-300 dark:bg-neutral-700 z-10 transition-transform duration-100 ease-in-out origin-bottom border-t border-black/10 dark:border-white/5"
            style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
          />

          {/* Sclera & Iris */}
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner relative z-0">
            {/* The Pupil that moves */}
            <div
              className="w-8 h-8 bg-accent rounded-full transition-transform duration-75 flex items-center justify-center shadow-lg"
              style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
            >
              <div className="w-3 h-3 bg-black rounded-full" />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full opacity-60" />
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
            let color = "text-accent";
            let barColor = "bg-accent";
            let shake = "";

            if (bpm > 150) {
              status = "OVERLOAD";
              color = "text-red-500";
              barColor = "bg-red-500";
              shake = "animate-pulse origin-center scale-110";
            } else if (bpm > 100) {
              status = "STRESSED";
              color = "text-yellow-500";
              barColor = "bg-yellow-500";
            }

            return (
              <div className={`flex flex-col w-full bg-black/90 dark:bg-black rounded-lg border-2 ${bpm > 150 ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'border-neutral-800 dark:border-neutral-900'} p-2 overflow-hidden relative transition-all ${shake}`}>
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)' }} />

                <div className="flex items-center justify-between z-10 w-full mb-1">
                  <span className={`text-[10px] font-mono font-bold tracking-[0.2em] transition-colors ${color} flex items-center gap-1.5`}>
                    {bpm > 150 ? <Zap className="w-3 h-3 animate-ping" /> : <Activity className="w-3 h-3" />}
                    {status}
                  </span>
                  <span className={`text-[9px] font-mono font-bold ${color} transition-colors`}>{bpm}</span>
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
                        className={`w-full rounded-sm transition-all duration-75 ${barColor}`}
                        style={{
                          height: `${height}%`,
                          opacity: activityLevel > 10 ? 0.8 + Math.random() * 0.2 : 0.3
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
        className={`absolute right-full mr-3 top-0 w-40 bg-white dark:bg-neutral-900 border border-accent/50 p-2 rounded-xl rounded-tr-none shadow-lg transform origin-top-right transition-all duration-300 ${
          showQuote ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'
        }`}
      >
        <p className="text-[10px] leading-tight font-mono font-bold text-neutral-800 dark:text-neutral-200">
          {quote}
        </p>
        <div className="absolute top-0 -right-2 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-accent/50 border-r-[8px] border-r-transparent" />
      </div>

      {/* Mobile Poke Me Popup */}
      <div
        className={`absolute right-full mr-4 top-2 pointer-events-none transition-all duration-700 ease-out ${showTouchMe && !showQuote ? 'opacity-100 scale-100 rotate-[-12deg]' : 'opacity-0 scale-50 rotate-[20deg] blur-md'
          }`}
      >
        <div className="relative bg-purple-900 dark:bg-purple-950 text-lime-400 font-black font-mono px-2 py-1 border border-dashed border-lime-400 shadow-[2px_2px_0_rgba(163,230,53,0.8)] rounded-md flex items-center gap-1">
          <span className="animate-pulse tracking-tighter text-[10px]">pOkE mE...</span>
          <span className="text-[10px]">👁️</span>
        </div>
      </div>

      {/* Mobile Eye */}
      <div
        onClick={handleClick}
        className="relative w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-transform overflow-hidden shrink-0 border border-black/10 dark:border-white/10"
      >
        {/* Eyelids */}
        <div
          className="absolute top-0 left-0 right-0 h-1/2 bg-neutral-300 dark:bg-neutral-700 z-10 transition-transform duration-100 ease-in-out origin-top border-b border-black/10 dark:border-white/5"
          style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-neutral-300 dark:bg-neutral-700 z-10 transition-transform duration-100 ease-in-out origin-bottom border-t border-black/10 dark:border-white/5"
          style={{ transform: isBlinking ? 'scaleY(1)' : 'scaleY(0)' }}
        />

        {/* Sclera & Iris */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-inner relative z-0">
          {/* Pupil */}
          <div
            className="w-4 h-4 bg-accent rounded-full transition-transform duration-75 flex items-center justify-center"
            style={{ transform: `translate(${pupilPos.x / 2.5}px, ${pupilPos.y / 2.5}px)` }}
          >
            <div className="w-1.5 h-1.5 bg-black rounded-full" />
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-60" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
