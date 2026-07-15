"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PixelHome() {
  const [typedText, setTypedText] = useState("");
  const fullText = "SYSTEM_INITIALIZED_\\nWELCOME_PLAYER_1";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-20">
        
        {/* Terminal/Screen Header */}
        <div className="border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 mb-12 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
          <div className="flex items-center gap-4 mb-4 border-b-4 border-black dark:border-white pb-4">
            <div className="w-16 h-16 bg-black dark:bg-white flex items-center justify-center animate-pulse">
              <Terminal className="w-8 h-8 text-[#8bac0f] dark:text-[#306230]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl uppercase leading-tight mb-2">
                Rahul <br /> Mondal
              </h1>
              <p className="text-xs uppercase tracking-widest opacity-80">Lvl. 99 Developer</p>
            </div>
          </div>
          <div className="h-16 flex items-center">
            <p className="text-xs md:text-sm uppercase whitespace-pre-wrap leading-relaxed">
              {typedText}<span className="animate-ping">_</span>
            </p>
          </div>
        </div>

        {/* Action Menu (like an RPG command menu) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          
          <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
            <h2 className="text-xl uppercase mb-6 flex items-center gap-2 border-b-2 border-black dark:border-white pb-2">
              <span className="text-2xl">⚔️</span> Actions
            </h2>
            <div className="flex flex-col gap-4">
              <Link href="/projects" className="group flex items-center gap-3 text-sm uppercase hover:pl-4 transition-all">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                Quest Log (Projects)
              </Link>
              <Link href="/me" className="group flex items-center gap-3 text-sm uppercase hover:pl-4 transition-all">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                Character (About Me)
              </Link>
              <Link href="/uses" className="group flex items-center gap-3 text-sm uppercase hover:pl-4 transition-all">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                Inventory (Uses)
              </Link>
            </div>
          </div>

          <div className="border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
            <h2 className="text-xl uppercase mb-6 flex items-center gap-2 border-b-2 border-black dark:border-white pb-2">
              <span className="text-2xl">🛡️</span> Current Status
            </h2>
            <ul className="space-y-4 text-xs uppercase leading-relaxed">
              <li className="flex justify-between border-b-2 border-black/20 dark:border-white/20 pb-2">
                <span>HP:</span>
                <span>999/999</span>
              </li>
              <li className="flex justify-between border-b-2 border-black/20 dark:border-white/20 pb-2">
                <span>MP (Coffee):</span>
                <span>MAX</span>
              </li>
              <li className="flex justify-between border-b-2 border-black/20 dark:border-white/20 pb-2">
                <span>Location:</span>
                <span>West Bengal, IN</span>
              </li>
              <li className="flex justify-between">
                <span>Objective:</span>
                <span>Building cool stuff</span>
              </li>
            </ul>
          </div>

        </div>
        
      </div>
    </div>
  );
}
