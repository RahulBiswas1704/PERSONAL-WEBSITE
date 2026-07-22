"use client";

import { motion } from "framer-motion";
import { ArrowRight, Asterisk, MoveDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import SurpriseMe from "@/components/SurpriseMe";
import PixelProjects from "./PixelProjects";
import PixelMe from "./PixelMe";
import PixelResume from "./PixelResume";
import PixelGuestbook from "./PixelGuestbook";
import { projects } from "@/lib/projects";

export default function PixelHome({ posts }: { posts: any[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-[100vw] relative left-1/2 -translate-x-1/2 min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-sans selection:bg-[#CCFF00] selection:text-black pb-24">
      
      {/* Massive Marquee */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-b border-black/20 dark:border-white/20 bg-transparent py-4 flex whitespace-nowrap mt-16 sm:mt-0">
        <motion.div 
          className="flex gap-8 items-center text-4xl md:text-8xl font-black uppercase tracking-tighter text-stroke-2 dark:text-stroke-2"
          animate={{ x: mounted ? [0, -2000] : 0 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span>System Manager</span>
          <Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>Creative Developer</span>
          <Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>Digital Aangan</span>
          <Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>West Bengal</span>
          <Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>System Manager</span>
          <Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>Creative Developer</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-24">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-b border-black/20 dark:border-white/20 pb-16">
          <div className="md:col-span-8">
            <h1 className="text-7xl sm:text-[8rem] md:text-[11rem] lg:text-[14rem] font-black leading-[0.85] tracking-[-0.04em] uppercase break-all sm:break-normal text-stroke-2 hover-fill transition-colors duration-300 cursor-default">
              RAHUL<br/>BISWAS
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <p className="text-xl md:text-2xl font-bold uppercase leading-tight mb-8">
              Welcome to my digital aangan (courtyard). Building beautiful digital products & exploring complex systems.
            </p>
            <MoveDown className="w-12 h-12 animate-bounce opacity-50" />
          </div>
        </div>

        {/* Recent Posts Section (Kriti) */}
        <div className="mt-16 border border-black/20 dark:border-white/20 p-8 group">
          <div className="flex justify-between items-end border-b border-black/20 dark:border-white/20 pb-4 mb-8">
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-[-0.04em]">
              Recent Crafts (Kriti)
            </h2>
            <Link href="#projects" className="hidden sm:inline-block text-xl font-bold uppercase hover:text-[#CCFF00] transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? posts.map((post) => (
              <Link key={post.slug} href={`/projects/${post.slug}`} className="block border border-black/20 dark:border-white/20 p-6 hover-shimmer transition-colors">
                <div className="flex justify-between items-start mb-4 border-b border-black/20 dark:border-white/20 pb-2">
                  <h3 className="text-xl font-black uppercase tracking-tighter">{post.metadata.title}</h3>
                </div>
                <p className="text-lg font-bold uppercase leading-snug mb-4">
                  {post.metadata.summary}
                </p>
                <div className="text-sm font-bold uppercase">
                  {formatDate(post.metadata.date)}
                </div>
              </Link>
            )) : (
              <p className="text-xl font-bold uppercase">No projects found.</p>
            )}
          </div>
        </div>

        {/* Directory Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group border border-black/20 dark:border-white/20 p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter mb-4">
                Chamatkar (Magic Box)
              </h2>
              <p className="text-sm sm:text-base font-bold uppercase border-t border-black/20 dark:border-white/20 pt-4 mb-4">Try your luck below:</p>
            </div>
            <div className="bg-black dark:bg-white text-white dark:text-black p-4 border border-black dark:border-white hover-shimmer cursor-pointer text-center">
              <SurpriseMe />
            </div>
          </div>
          
          <Link href="#me" className="group block border border-black/20 dark:border-white/20 p-8 hover-shimmer transition-colors flex flex-col justify-between">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 flex justify-between items-end">
              02 <ArrowRight className="w-12 h-12 -rotate-45 group-hover:rotate-0 transition-transform" />
            </h2>
            <p className="text-xl font-bold uppercase border-t border-black/20 dark:border-white/20 pt-4">About / Profile</p>
          </Link>

          <Link href="#guestbook" className="group block border border-black/20 dark:border-white/20 p-8 hover-shimmer transition-colors flex flex-col justify-between">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 flex justify-between items-end">
              03 <ArrowRight className="w-12 h-12 -rotate-45 group-hover:rotate-0 transition-transform" />
            </h2>
            <p className="text-xl font-bold uppercase border-t border-black/20 dark:border-white/20 pt-4">Sign Guestbook</p>
          </Link>
        </div>
      </div>

      {/* -------------------- PROJECTS SECTION -------------------- */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-black/20 dark:border-white/20 bg-[#CCFF00] dark:bg-[#CCFF00] text-black py-4 flex whitespace-nowrap mt-24">
        <motion.div 
          className="flex gap-8 items-center text-4xl md:text-8xl font-black uppercase tracking-tighter"
          animate={{ x: mounted ? [-2000, 0] : 0 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span>SELECTED WORKS</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PROJECTS</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PORTFOLIO</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>SELECTED WORKS</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PROJECTS</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PORTFOLIO</span>
        </motion.div>
      </div>

      <PixelProjects projects={projects} />

      {/* -------------------- ABOUT SECTION -------------------- */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-black/20 dark:border-white/20 bg-black dark:bg-white text-white dark:text-black py-4 flex whitespace-nowrap mt-24">
        <motion.div 
          className="flex gap-8 items-center text-4xl md:text-8xl font-black uppercase tracking-tighter"
          animate={{ x: mounted ? [0, -2000] : 0 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span>WHO AM I?</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PROFILE</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>BACKGROUND</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>WHO AM I?</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PROFILE</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>BACKGROUND</span>
        </motion.div>
      </div>

      <PixelMe />

      {/* -------------------- RESUME SECTION -------------------- */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-black/20 dark:border-white/20 bg-[#CCFF00] dark:bg-[#CCFF00] text-black py-4 flex whitespace-nowrap mt-24">
        <motion.div 
          className="flex gap-8 items-center text-4xl md:text-8xl font-black uppercase tracking-tighter"
          animate={{ x: mounted ? [-2000, 0] : 0 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span>PAPER TRAIL</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>RESUME</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>EXPERIENCE</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>PAPER TRAIL</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>RESUME</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>EXPERIENCE</span>
        </motion.div>
      </div>

      <PixelResume />

      {/* -------------------- GUESTBOOK SECTION -------------------- */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-black/20 dark:border-white/20 bg-black dark:bg-white text-white dark:text-black py-4 flex whitespace-nowrap mt-24">
        <motion.div 
          className="flex gap-8 items-center text-4xl md:text-8xl font-black uppercase tracking-tighter"
          animate={{ x: mounted ? [0, -2000] : 0 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
        >
          <span>LEAVE A MARK</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>GUESTBOOK</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>SAY HELLO</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>LEAVE A MARK</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>GUESTBOOK</span><Asterisk className="w-12 h-12 md:w-20 md:h-20 shrink-0" />
          <span>SAY HELLO</span>
        </motion.div>
      </div>

      <PixelGuestbook />
    </div>
  );
}
