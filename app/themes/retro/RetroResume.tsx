"use client";

import { Terminal, Printer } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

export default function RetroResume() {
  return (
    <div className="min-h-screen bg-[#f4ebd0] dark:bg-black space-y-8 sm:space-y-16 pb-24 sm:pb-16 px-2 sm:px-0 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black print:pb-0 overflow-x-hidden">
      <CRTEffect />
      
      {/* Cover Letter (Print Only) */}
      <div className="hidden print:block print:pb-16" style={{ pageBreakAfter: 'always' }}>
        <div className="border-b-4 border-[#4a3b2c] dark:border-green-500 pb-8 mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-widest break-all">
            HELLO.TXT
          </h1>
          <div className="mt-4 inline-block border-2 border-current px-4 py-1.5 text-sm font-bold uppercase tracking-widest">
            [ COVER_LETTER ]
          </div>
          <p className="text-xl mt-8 font-bold">
            &gt; "Building bridges between technical execution and business operations."
          </p>
        </div>
        
        <div className="space-y-6 text-base leading-relaxed">
          <p className="font-bold text-xl uppercase">&gt; DEAR HIRING MANAGER,</p>
          <p className="opacity-90 uppercase">
            With a strong foundation in system management and project coordination, I am excited to submit my resume for your consideration. Throughout my career at ZK Construction and Unique Star, I have demonstrated a consistent ability to execute strategic roadmaps, optimize internal systems, and bridge the gap between technical execution and client relations.
          </p>
          <p className="opacity-90 uppercase">
            My background blends hands-on operational management with a deep curiosity for modern technology. I thrive in dynamic environments where managing complex projects and unexpected challenges is the norm. I am particularly proud of my ability to build comprehensive company profiles, streamline documentation, and lead teams toward unified goals.
          </p>
          <p className="opacity-90 uppercase">
            I am eager to bring my proactive problem-solving mindset, analytical skills, and technical adaptability to your team. Thank you for your time and consideration. I look forward to the possibility of discussing how my experience aligns with your organization's needs.
          </p>
          <div className="pt-8 flex flex-col">
            <span className="mb-2 uppercase opacity-80">EOF</span>
            <strong className="text-2xl font-bold uppercase">RAHUL BISWAS</strong>
            <span className="text-sm font-bold mt-1 uppercase tracking-widest opacity-90">&gt; SYSTEM & PROJECT MANAGER</span>
          </div>
        </div>
      </div>

      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 mx-2 sm:mx-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest break-all">
                RESUME.DOC
              </h1>
            </div>
            <div className="mt-4 sm:mt-6 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest w-fit border-2 border-transparent">
              [ RAHUL_BISWAS ]
            </div>
            
            <p className="text-lg uppercase opacity-80 border-t-4 border-[#4a3b2c] dark:border-green-500 pt-4 mt-4 leading-relaxed font-bold">
              &gt; "System & Project Manager by day, curious learner by night."
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-4 text-sm font-bold">
              <a href="tel:+919635968365" className="hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black border-2 border-current px-2 py-1 transition-colors uppercase">+91-9635968365</a>
              <span className="hidden sm:inline">&bull;</span>
              <a href="mailto:rahul.biswas1704@gmail.com" className="hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black border-2 border-current px-2 py-1 transition-colors uppercase">rahul.biswas1704@gmail.com</a>
              <span className="hidden sm:inline">&bull;</span>
              <a href="https://github.com/RahulBiswas1704" target="_blank" className="hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black border-2 border-current px-2 py-1 transition-colors uppercase">github.com/RahulBiswas1704</a>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
              const isInstagram = (ua.indexOf('Instagram') > -1);
              const isFacebook = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
              const isInAppBrowser = isInstagram || isFacebook || /Snapchat|LinkedIn/i.test(ua);
              
              if (isInAppBrowser) {
                alert("It looks like you are using an in-app browser (like Instagram or Facebook), which blocks PDF downloads.\n\nPlease tap the menu (three dots) in the top right and select 'Open in system browser', 'Open in Chrome', or 'Open in Safari' to download the resume.");
              } else {
                window.print();
              }
            }}
            className="w-full md:w-auto px-6 py-3 border-4 border-[#4a3b2c] dark:border-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors uppercase font-bold tracking-widest flex items-center justify-center gap-2 print:hidden group md:self-auto bg-[#f4ebd0] dark:bg-black"
          >
            <Printer className="w-5 h-5 group-hover:animate-pulse" />
            [ PRINT_PDF ]
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] mx-2 sm:mx-0">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2 flex items-center gap-2">
          <span className="animate-pulse">_</span> SYS_PROFILE
        </h2>
        <p className="text-base uppercase opacity-90 leading-relaxed font-bold">
          &gt; Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions. Whether it's mastering strategic planning or managing unexpected challenges, I thrive on continuous growth.
        </p>
      </section>

      {/* Work Experience Section */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] mx-2 sm:mx-0">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2 flex items-center gap-2">
          <span className="animate-pulse">_</span> EXEC_EXPERIENCE
        </h2>
        
        <div className="space-y-8">
          <div className="space-y-2 relative pl-4 border-l-4 border-[#4a3b2c] dark:border-green-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-xl font-bold uppercase">Project Manager</h3>
              <span className="inline-block px-3 py-1 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black border-2 border-transparent text-xs font-bold shrink-0">NOV_2021 - PRESENT</span>
            </div>
            <p className="uppercase font-bold text-sm tracking-wide border-2 border-current px-2 py-1 w-fit">&gt; ZK Construction (ZK Construction Project Pvt. Ltd.)</p>
            <ul className="text-sm uppercase opacity-90 leading-relaxed list-none space-y-1.5 font-bold mt-3">
              <li>[+] Managing Projects & Coordinating Operations</li>
              <li>[+] Organizing Company's Profile & Documentation</li>
              <li>[+] Executing and Planning Strategic Roadmaps</li>
              <li>[+] Improving Internal Systems for Efficiency</li>
            </ul>
          </div>

          <div className="space-y-2 relative pl-4 border-l-4 border-[#4a3b2c] dark:border-green-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-xl font-bold uppercase">System Manager</h3>
              <span className="inline-block px-3 py-1 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black border-2 border-transparent text-xs font-bold shrink-0">MAR_2020 - OCT_2021</span>
            </div>
            <p className="uppercase font-bold text-sm tracking-wide border-2 border-current px-2 py-1 w-fit">&gt; Unique Star (NNTUS E-Commerce India Pvt. Ltd.)</p>
            <ul className="text-sm uppercase opacity-90 leading-relaxed list-none space-y-1.5 font-bold mt-3">
              <li>[+] Managing Accounts & Client Relations</li>
              <li>[+] Control & Maintenance of the Admin Panel</li>
              <li>[+] Create Marketing Related Graphics & Materials</li>
              <li>[+] Create High Quality Executive Presentations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] mx-2 sm:mx-0">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2 flex items-center gap-2">
          <span className="animate-pulse">_</span> SYS_EDUCATION
        </h2>
        
        <div className="space-y-6">
          <div className="space-y-1 border-4 border-[#4a3b2c] dark:border-green-500 p-4 bg-white/50 dark:bg-black/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold uppercase">&gt; Diploma In Information Technology</h3>
              <span className="text-xs font-bold border-2 border-[#4a3b2c] dark:border-green-500 px-2 py-1 shrink-0">MAR_2019 - FEB_2020</span>
            </div>
            <p className="uppercase text-sm font-bold opacity-90 mt-2">Krishnanagar Jawaharlal Nehru National Youth Computer Centre</p>
            <p className="uppercase text-xs mt-2 font-bold bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-2 py-1 w-fit">STATUS: COMPLETED WITH 92.5% [370/400]</p>
          </div>

          <div className="space-y-1 border-4 border-[#4a3b2c] dark:border-green-500 p-4 bg-white/50 dark:bg-black/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold uppercase">&gt; Diploma In Electrical Engineering</h3>
              <span className="text-xs font-bold border-2 border-[#4a3b2c] dark:border-green-500 px-2 py-1 shrink-0">AUG_2019 - ABORTED</span>
            </div>
            <p className="uppercase text-sm font-bold opacity-90 mt-2">Modern Institute of Engineering & Technology</p>
            <p className="uppercase text-xs mt-2 font-bold bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-2 py-1 w-fit">LOGS: 1ST_SEM[GPA:4.5] | 2ND_SEM[GPA:6.9]</p>
          </div>

          <div className="space-y-1 border-4 border-[#4a3b2c] dark:border-green-500 p-4 bg-white/50 dark:bg-black/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold uppercase">&gt; Secondary Exam</h3>
              <span className="text-xs font-bold border-2 border-[#4a3b2c] dark:border-green-500 px-2 py-1 shrink-0">JAN_2013 - FEB_2019</span>
            </div>
            <p className="uppercase text-sm font-bold opacity-90 mt-2">Krishnanagar A.V. High School</p>
            <p className="uppercase text-xs mt-2 font-bold bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-2 py-1 w-fit">STATUS: COMPLETED [MARKS:310]</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10 print:flex print:flex-col mx-2 sm:mx-0">
        {/* Skills Section */}
        <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-white/50 dark:bg-black/50 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e]">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2 flex items-center gap-2">
            <span className="animate-pulse">_</span> SYS_CAPABILITIES
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold mb-3 uppercase tracking-wider opacity-80">&gt; ADEPT_IN:</p>
              <div className="flex flex-wrap gap-2">
                {['PC Hardware Skills', 'Microsoft Office', 'Analyzing Data', 'Business Planning & Execution', 'Managing Teams'].map((skill, i) => (
                  <span key={skill} className="px-3 py-1.5 border-2 border-[#4a3b2c] dark:border-green-500 text-xs font-bold uppercase hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors cursor-default bg-[#f4ebd0] dark:bg-black">
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold mb-3 uppercase tracking-wider opacity-80">&gt; COMPILING_MODULES:</p>
              <div className="flex flex-wrap gap-2">
                {['AI Prompt Engineering', 'Photography', 'Video Editing', 'Graphic Designing'].map((skill, i) => (
                  <span key={skill} className="px-3 py-1.5 border-2 border-[#4a3b2c] dark:border-green-500 text-xs font-bold uppercase hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors cursor-default bg-[#f4ebd0] dark:bg-black opacity-80">
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e]">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2 flex items-center gap-2">
            <span className="animate-pulse">_</span> SYS_METRICS
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold mb-3 uppercase tracking-wider opacity-80">&gt; SOFT_SKILLS</p>
              <div className="flex flex-wrap gap-2">
                {['Team Work', 'Creative Thinking', 'Life-long Learner', 'Problem Solver', 'Communication Skills', 'Multilingual'].map((skill, i) => (
                  <span key={skill} className="px-3 py-1.5 border-2 border-[#4a3b2c] dark:border-green-500 text-xs font-bold uppercase hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors cursor-default bg-white/50 dark:bg-black/50">
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold mb-3 uppercase tracking-wider opacity-80">&gt; IDLE_PROCESSES</p>
              <div className="flex flex-wrap gap-2">
                {['Reading', 'Tech Savvy', 'Photography'].map((hobby, i) => (
                  <span key={hobby} className="px-3 py-1.5 border-2 border-[#4a3b2c] dark:border-green-500 text-xs font-bold uppercase hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors cursor-default bg-white/50 dark:bg-black/50">
                    [{hobby}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Print-specific CSS overrides for Retro */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          html, body { 
            background: white !important; 
            color: black !important;
            font-size: 11pt;
          }
          .dark html, .dark body { 
            background: white !important; 
            color: black !important; 
          }
          header, footer, nav, #visitor-tracker { 
            display: none !important; 
          }
          .animate-pulse { animation: none !important; }
          .shadow-\\[8px_8px_0px_0px_\\#4a3b2c\\], 
          .dark\\:shadow-\\[8px_8px_0px_0px_\\#22c55e\\],
          .shadow-\\[4px_4px_0px_0px_\\#4a3b2c\\], 
          .dark\\:shadow-\\[4px_4px_0px_0px_\\#22c55e\\] {
             box-shadow: none !important;
          }
          .bg-\\[\\#f4ebd0\\], .dark\\:bg-black, .bg-white\\/50, .dark\\:bg-black\\/50 {
             background-color: transparent !important;
          }
          .border-\\[\\#4a3b2c\\], .dark\\:border-green-500 {
             border-color: #000 !important;
          }
          .text-\\[\\#4a3b2c\\], .dark\\:text-green-500 {
             color: #000 !important;
          }
          .bg-\\[\\#4a3b2c\\], .dark\\:bg-green-500 {
             background-color: #000 !important;
             color: #fff !important;
          }
          .text-\\[\\#f4ebd0\\], .dark\\:text-black {
             color: #fff !important;
          }
        }
      `}} />
    </div>
  );
}
