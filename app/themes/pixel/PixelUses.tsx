"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, Keyboard, Mouse, Laptop, Headphones } from "lucide-react";
import { uses as usesData } from "@/app/uses/usesData";

export default function PixelUses({ uses }: { uses: any[] }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Monitor": return <Monitor className="w-6 h-6" />;
      case "Cpu": return <Cpu className="w-6 h-6" />;
      case "Keyboard": return <Keyboard className="w-6 h-6" />;
      case "Mouse": return <Mouse className="w-6 h-6" />;
      case "Laptop": return <Laptop className="w-6 h-6" />;
      case "Headphones": return <Headphones className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-16">
        
        <header className="mb-12 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
          <h1 className="text-3xl md:text-5xl uppercase mb-4 flex items-center gap-4">
            <span className="text-4xl">🎒</span> Inventory
          </h1>
          <p className="text-xs md:text-sm uppercase leading-relaxed max-w-2xl border-t-4 border-black dark:border-white pt-4">
            Equipped items, hardware stats, and software artifacts currently in use.
          </p>
        </header>

        <div className="space-y-12">
          {uses.map((category, idx) => (
            <section key={idx}>
              <h2 className="text-xl uppercase mb-8 flex items-center gap-4 border-b-4 border-black dark:border-white pb-2">
                <span className="bg-black dark:bg-white text-white dark:text-black p-2"><category.icon className="w-6 h-6" /></span> {category.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-4 border-black dark:border-white ml-6">
                {category.items.map((item: any, itemIdx: number) => (
                  <div key={itemIdx} className="relative group">
                    <div className="absolute w-4 h-4 bg-black dark:bg-white -left-[30px] top-4 border-2 border-[#e0f8d0] dark:border-[#0f380f]" />
                    <div className="border-4 border-black dark:border-white bg-transparent p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 hover:bg-[#8bac0f] dark:hover:bg-[#306230] transition-all">
                      <h3 className="text-sm uppercase font-bold mb-2">{item.name}</h3>
                      <p className="text-[10px] uppercase opacity-80 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
