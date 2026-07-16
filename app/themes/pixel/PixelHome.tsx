"use client";

import { motion } from "framer-motion";
import { ArrowRight, Asterisk, MoveDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import SurpriseMe from "@/components/SurpriseMe";

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
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-24">
      
      {/* Massive Marquee */}
      <div className="w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden border-b-4 border-black dark:border-white bg-transparent py-4 flex whitespace-nowrap mt-16 sm:mt-0">
        <motion.div 
          className="flex gap-8 items-center text-4xl md:text-8xl font-black uppercase tracking-tighter"
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-b-2 border-black dark:border-white pb-16">
          <div className="md:col-span-8">
            <h1 className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] font-black leading-[0.8] tracking-tighter uppercase break-all sm:break-normal">
              RAHUL<br/>BISWAS
            </h1>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <p className="text-xl md:text-3xl font-bold uppercase leading-tight mb-8">
              Welcome to my digital aangan (courtyard). Building beautiful digital products & exploring complex systems.
            </p>
            <MoveDown className="w-16 h-16 animate-bounce" />
          </div>
        </div>

        {/* Recent Posts Section (Kriti) */}
        <div className="mt-16 border-2 border-black dark:border-white p-8 group">
          <div className="flex justify-between items-end border-b-4 border-black dark:border-white pb-4 mb-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter">
              Recent Crafts (Kriti)
            </h2>
            <Link href="/projects" className="hidden sm:inline-block text-2xl font-bold uppercase hover:italic hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts && posts.length > 0 ? posts.map((post) => (
              <Link key={post.slug} href={`/projects/${post.slug}`} className="block border-2 border-black dark:border-white p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                <div className="flex justify-between items-start mb-4 border-b-2 border-current pb-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{post.metadata.title}</h3>
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
          <div className="group border-2 border-black dark:border-white p-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">
              Chamatkar (Magic Box)
            </h2>
            <p className="text-lg font-bold uppercase border-t-2 border-black dark:border-white pt-4 mb-4">Try your luck below:</p>
            <div className="bg-black dark:bg-white text-white dark:text-black p-4 border-2 border-black dark:border-white">
              <SurpriseMe />
            </div>
          </div>
          
          <Link href="/me" className="group block border-2 border-black dark:border-white p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex flex-col justify-between">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 flex justify-between items-end">
              02 <ArrowRight className="w-12 h-12 -rotate-45 group-hover:rotate-0 transition-transform" />
            </h2>
            <p className="text-2xl font-bold uppercase border-t-2 border-current pt-4">About / Profile</p>
          </Link>

          <Link href="/uses" className="group block border-2 border-black dark:border-white p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex flex-col justify-between">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 flex justify-between items-end">
              03 <ArrowRight className="w-12 h-12 -rotate-45 group-hover:rotate-0 transition-transform" />
            </h2>
            <p className="text-2xl font-bold uppercase border-t-2 border-current pt-4">Tools / Uses</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
