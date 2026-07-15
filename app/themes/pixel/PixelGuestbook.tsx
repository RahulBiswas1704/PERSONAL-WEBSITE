"use client";

import { motion } from "framer-motion";
import { MessageSquare, Send, Book, Skull } from "lucide-react";

export default function PixelGuestbook() {
  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-16">
        
        <header className="mb-12 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
          <h1 className="text-3xl md:text-5xl uppercase mb-4 flex items-center gap-4">
            <span className="text-4xl">📖</span> Tavern Log
          </h1>
          <p className="text-xs md:text-sm uppercase leading-relaxed max-w-2xl border-t-4 border-black dark:border-white pt-4">
            Leave a message for the creator. Roast me or toast me, all entries are recorded permanently.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-8">
            <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] sticky top-24">
              <h2 className="text-xl uppercase mb-6 flex items-center gap-2 border-b-2 border-black dark:border-white pb-2">
                <span className="text-2xl">✍️</span> Sign Log
              </h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] uppercase mb-2">Player Name</label>
                  <input 
                    type="text" 
                    placeholder="ENTER NAME..." 
                    className="w-full bg-transparent border-4 border-black dark:border-white p-3 text-[10px] uppercase placeholder:text-[#0f380f]/50 dark:placeholder:text-[#9bbc0f]/50 focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase mb-2">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="ENTER MESSAGE..." 
                    className="w-full bg-transparent border-4 border-black dark:border-white p-3 text-[10px] uppercase placeholder:text-[#0f380f]/50 dark:placeholder:text-[#9bbc0f]/50 focus:outline-none focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black border-4 border-black dark:border-white p-3 text-[10px] uppercase hover:bg-transparent hover:text-black dark:hover:text-white transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Entry
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl uppercase flex items-center gap-2 border-b-4 border-black dark:border-white pb-2">
              <span className="text-2xl">📜</span> Recent Entries
            </h2>
            
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform relative">
                  {i === 0 && <div className="absolute -top-3 -right-3 bg-black dark:bg-white text-white dark:text-black text-[8px] uppercase px-2 py-1 border-2 border-black dark:border-white rotate-12">New!</div>}
                  <div className="flex justify-between items-start mb-4 border-b-2 border-black/20 dark:border-white/20 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-[10px]">
                        U{i+1}
                      </div>
                      <span className="text-sm uppercase font-bold">User_{i+1}</span>
                    </div>
                    <span className="text-[10px] uppercase opacity-80">2026-07-{15-i}</span>
                  </div>
                  <p className="text-xs uppercase leading-relaxed">
                    This is a sample guestbook entry. The pixel theme looks really cool! Keep up the good work.
                  </p>
                </div>
              ))}
            </div>
            
            <button className="w-full border-4 border-black dark:border-white border-dashed bg-transparent p-4 text-[10px] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              Load More Entries...
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
