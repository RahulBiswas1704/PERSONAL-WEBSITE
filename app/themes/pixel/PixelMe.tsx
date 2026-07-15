"use client";

import { motion } from "framer-motion";
import { User, Code, Heart, Award } from "lucide-react";

export default function PixelMe() {
  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-16">
        
        <header className="mb-12 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
          <h1 className="text-3xl md:text-5xl uppercase mb-4 flex items-center gap-4">
            <span className="text-4xl">👤</span> Character Stats
          </h1>
          <p className="text-xs md:text-sm uppercase leading-relaxed max-w-2xl border-t-4 border-black dark:border-white pt-4">
            Player profile, attributes, and background lore.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
            <h2 className="text-xl uppercase mb-6 border-b-2 border-black dark:border-white pb-2 flex items-center gap-2">
              <User className="w-5 h-5" /> Base Attributes
            </h2>
            <div className="space-y-4 text-xs uppercase">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Logic (Development)</span>
                  <span>Lvl. 42</span>
                </div>
                <div className="w-full h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white p-0.5">
                  <div className="h-full bg-black dark:bg-white w-[85%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Creativity (Design)</span>
                  <span>Lvl. 38</span>
                </div>
                <div className="w-full h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white p-0.5">
                  <div className="h-full bg-black dark:bg-white w-[75%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Endurance (Coffee)</span>
                  <span>Lvl. 99</span>
                </div>
                <div className="w-full h-3 bg-black/10 dark:bg-white/10 border-2 border-black dark:border-white p-0.5">
                  <div className="h-full bg-black dark:bg-white w-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
            <h2 className="text-xl uppercase mb-6 border-b-2 border-black dark:border-white pb-2 flex items-center gap-2">
              <Code className="w-5 h-5" /> Active Skills
            </h2>
            <ul className="space-y-3 text-xs uppercase leading-relaxed list-disc list-inside">
              <li>TypeScript / JavaScript (Master)</li>
              <li>React / Next.js (Expert)</li>
              <li>Tailwind CSS (Adept)</li>
              <li>Node.js / Express (Journeyman)</li>
              <li>UI/UX Design (Scholar)</li>
            </ul>
          </div>

        </div>

        <div className="border-4 border-black dark:border-white bg-transparent p-6 md:p-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
           <h2 className="text-xl uppercase mb-6 border-b-2 border-black dark:border-white pb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" /> Lore / Backstory
            </h2>
            <div className="text-xs md:text-sm uppercase leading-loose space-y-6">
              <p>
                Greetings, traveler. I am a frontend developer who loves turning complex problems into elegant, user-friendly solutions. My journey began with a simple "Hello World", and since then, I've been on a continuous quest to level up my skills.
              </p>
              <p>
                When I'm not writing code or debugging mysterious errors, you can find me exploring new technologies, contributing to open-source, or analyzing the latest design trends. I believe in writing code that is not only functional but also maintainable and accessible.
              </p>
            </div>
        </div>

      </div>
    </div>
  );
}
