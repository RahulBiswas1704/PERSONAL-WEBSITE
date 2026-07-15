"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award } from "lucide-react";

export default function PixelResume() {
  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-4xl mx-auto relative z-10 pt-16">
        
        <header className="mb-12 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl uppercase mb-4 flex items-center gap-4">
              <span className="text-4xl">📄</span> Player Record
            </h1>
            <p className="text-xs md:text-sm uppercase leading-relaxed max-w-xl border-t-4 border-black dark:border-white pt-4">
              Detailed history of player achievements, experience points, and guild affiliations.
            </p>
          </div>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="group shrink-0 inline-flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black border-4 border-black dark:border-white p-4 uppercase text-xs hover:bg-transparent hover:text-black dark:hover:text-white transition-colors">
            <Download className="w-5 h-5 group-hover:animate-bounce" /> Save Record
          </a>
        </header>

        <div className="space-y-12 mb-12">
          
          {/* Experience Section */}
          <section>
            <h2 className="text-2xl uppercase mb-8 flex items-center gap-4 border-b-4 border-black dark:border-white pb-2">
              <span className="bg-black dark:bg-white text-white dark:text-black p-2"><Briefcase className="w-6 h-6" /></span> Work Experience
            </h2>
            
            <div className="space-y-8 pl-4 border-l-4 border-black dark:border-white ml-6">
              
              <div className="relative">
                <div className="absolute w-4 h-4 bg-black dark:bg-white -left-[26px] top-2 border-2 border-[#e0f8d0] dark:border-[#0f380f]" />
                <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                    <h3 className="text-xl uppercase">Senior Frontend Developer</h3>
                    <span className="text-[10px] uppercase bg-black dark:bg-white text-white dark:text-black px-2 py-1 self-start">2021 - Present</span>
                  </div>
                  <p className="text-xs uppercase mb-4 opacity-80 border-b-2 border-black/20 dark:border-white/20 pb-4">Tech Corp Inc.</p>
                  <ul className="text-xs uppercase leading-loose space-y-2 list-disc list-inside">
                    <li>Led the development of the core product UI using React and Next.js.</li>
                    <li>Mentored junior developers and conducted code reviews.</li>
                    <li>Improved application performance by 40%.</li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="absolute w-4 h-4 bg-black dark:bg-white -left-[26px] top-2 border-2 border-[#e0f8d0] dark:border-[#0f380f]" />
                <div className="border-4 border-black dark:border-white bg-transparent p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                    <h3 className="text-xl uppercase">Frontend Developer</h3>
                    <span className="text-[10px] uppercase bg-black dark:bg-white text-white dark:text-black px-2 py-1 self-start">2018 - 2021</span>
                  </div>
                  <p className="text-xs uppercase mb-4 opacity-80 border-b-2 border-black/20 dark:border-white/20 pb-4">Web Solutions LLC</p>
                  <ul className="text-xs uppercase leading-loose space-y-2 list-disc list-inside">
                    <li>Developed responsive web applications for various clients.</li>
                    <li>Collaborated with designers to implement pixel-perfect UI.</li>
                    <li>Integrated RESTful APIs and managed state with Redux.</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-2xl uppercase mb-8 flex items-center gap-4 border-b-4 border-black dark:border-white pb-2">
              <span className="bg-black dark:bg-white text-white dark:text-black p-2"><GraduationCap className="w-6 h-6" /></span> Education
            </h2>
            
            <div className="space-y-8 pl-4 border-l-4 border-black dark:border-white ml-6">
              
              <div className="relative">
                <div className="absolute w-4 h-4 bg-black dark:bg-white -left-[26px] top-2 border-2 border-[#e0f8d0] dark:border-[#0f380f]" />
                <div className="border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform">
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                    <h3 className="text-xl uppercase">B.Sc. Computer Science</h3>
                    <span className="text-[10px] uppercase border-2 border-black dark:border-white px-2 py-1 self-start">2014 - 2018</span>
                  </div>
                  <p className="text-xs uppercase opacity-80">University of Technology</p>
                </div>
              </div>

            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
