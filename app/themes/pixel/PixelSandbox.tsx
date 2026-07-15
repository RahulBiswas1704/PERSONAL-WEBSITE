"use client";

import { motion } from "framer-motion";
import { Wrench, FlaskConical, Beaker } from "lucide-react";

export default function PixelSandbox() {
  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-16">
        
        <header className="mb-12 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
          <h1 className="text-3xl md:text-5xl uppercase mb-4 flex items-center gap-4">
            <span className="text-4xl">🧪</span> Kishmish Sandbox
          </h1>
          <p className="text-xs md:text-sm uppercase leading-relaxed max-w-2xl border-t-4 border-black dark:border-white pt-4">
            A testing ground for chaotic experiments, mini-games, and unpolished features. Proceed with caution.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:-translate-y-2 transition-transform cursor-pointer group">
            <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 group-hover:animate-spin">
              <FlaskConical className="w-8 h-8" />
            </div>
            <h2 className="text-xl uppercase mb-4 border-b-2 border-black dark:border-white pb-2">CSS Battles</h2>
            <p className="text-xs uppercase leading-relaxed opacity-80">
              Various CSS art and animations I've created while bored. Pure CSS, no JS.
            </p>
          </div>

          <div className="border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:-translate-y-2 transition-transform cursor-pointer group">
            <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 group-hover:animate-pulse">
              <Wrench className="w-8 h-8" />
            </div>
            <h2 className="text-xl uppercase mb-4 border-b-2 border-black dark:border-white pb-2">Mini Games</h2>
            <p className="text-xs uppercase leading-relaxed opacity-80">
              Small JavaScript games. Snake, Pong, and maybe a weird Flappy Bird clone.
            </p>
          </div>

          <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] md:col-span-2">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 animate-bounce">
                <Beaker className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-xl uppercase mb-4">Under Construction</h2>
                <p className="text-xs uppercase leading-relaxed opacity-80">
                  More experiments are being brewed in the laboratory. Check back later for new chaotic creations.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
