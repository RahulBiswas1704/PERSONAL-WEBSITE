"use client";

import { Download, Terminal } from "lucide-react";

export default function RetroResume() {
  return (
    <div className="space-y-16 pb-16 font-mono text-violet-500 selection:bg-violet-500 selection:text-black print:pb-0">
      
      {/* Cover Letter (Print Only) */}
      <div className="hidden print:block print:pb-16" style={{ pageBreakAfter: 'always' }}>
        <div className="mb-8 border-b-4 border-black pb-8">
          <h1 className="text-4xl font-bold uppercase tracking-widest text-black mb-2">
            Rahul Biswas
          </h1>
          <p className="text-lg uppercase text-black font-bold">
            System & Project Manager
          </p>
        </div>
        
        <div className="space-y-6 text-base text-black uppercase font-bold leading-relaxed">
          <p className="text-lg">Dear Hiring Manager,</p>
          <p>
            With a strong foundation in system management and project coordination, I am excited to submit my resume for your consideration. Throughout my career at ZK Construction and Unique Star, I have demonstrated a consistent ability to execute strategic roadmaps, optimize internal systems, and bridge the gap between technical execution and client relations.
          </p>
          <p>
            My background blends hands-on operational management with a deep curiosity for modern technology. I thrive in dynamic environments where managing complex projects and unexpected challenges is the norm. I am particularly proud of my ability to build comprehensive company profiles, streamline documentation, and lead teams toward unified goals.
          </p>
          <p>
            I am eager to bring my proactive problem-solving mindset, analytical skills, and technical adaptability to your team. Thank you for your time and consideration. I look forward to the possibility of discussing how my experience aligns with your organization's needs.
          </p>
          <div className="pt-8 flex flex-col">
            <span className="mb-2">Sincerely,</span>
            <strong className="text-xl">Rahul Biswas</strong>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-4 border-violet-500 p-8 shadow-[8px_8px_0px_0px_rgba(139,92,246,1)] bg-black flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Terminal className="w-8 h-8 animate-pulse" />
            <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
              RESUME.DOC
            </h1>
          </div>
          <p className="text-lg uppercase opacity-80 border-t-2 border-violet-500/50 pt-4 mt-4 leading-relaxed">
            &gt; System & Project Manager by day, curious learner by night.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm uppercase font-bold border-2 border-violet-500 p-3">
            <a href="tel:+919635968365" className="hover:bg-violet-500 hover:text-black transition-colors px-2">+91-9635968365</a>
            <span className="opacity-50">|</span>
            <a href="mailto:rahul.biswas1704@gmail.com" className="hover:bg-violet-500 hover:text-black transition-colors px-2">rahul.biswas1704@gmail.com</a>
            <span className="opacity-50">|</span>
            <a href="https://github.com/RahulBiswas1704" target="_blank" rel="noreferrer" className="hover:bg-violet-500 hover:text-black transition-colors px-2">github.com/RahulBiswas1704</a>
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
          className="flex items-center gap-2 px-6 py-3 border-4 border-violet-500 bg-black text-violet-500 text-sm font-bold uppercase tracking-widest hover:bg-violet-500 hover:text-black transition-colors print:hidden shadow-[4px_4px_0px_0px_rgba(139,92,246,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
        >
          <Download className="w-5 h-5" />
          DOWNLOAD_PDF
        </button>
      </div>

      <div className="space-y-12">
        {/* Profile */}
        <section className="border-4 border-violet-500 p-6 bg-black">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4 border-b-2 border-violet-500 pb-2">## PROFILE</h2>
          <p className="text-base uppercase leading-relaxed opacity-90">
            Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions. Whether it's mastering strategic planning or managing unexpected challenges, I thrive on continuous growth.
          </p>
        </section>

        {/* Experience */}
        <section className="border-4 border-violet-500 p-6 bg-black">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-violet-500 pb-2">## EXPERIENCE</h2>
          <div className="space-y-8">
            <div className="border-l-4 border-violet-500 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h3 className="text-lg font-bold uppercase">Project Manager</h3>
                <span className="text-sm border border-violet-500 px-2 py-1 uppercase mt-2 sm:mt-0">Nov 2021 - Present</span>
              </div>
              <p className="opacity-80 uppercase font-bold mb-4">ZK Construction Project Pvt. Ltd.</p>
              <ul className="list-disc pl-5 space-y-2 uppercase text-sm opacity-90">
                <li>Managing Projects & Coordinating Operations</li>
                <li>Organizing Company’s Profile & Documentation</li>
                <li>Executing and Planning Strategic Roadmaps</li>
                <li>Improving Internal Systems for Efficiency</li>
              </ul>
            </div>

            <div className="border-l-4 border-violet-500 pl-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <h3 className="text-lg font-bold uppercase">System Manager</h3>
                <span className="text-sm border border-violet-500 px-2 py-1 uppercase mt-2 sm:mt-0">Mar 2020 - Oct 2021</span>
              </div>
              <p className="opacity-80 uppercase font-bold mb-4">NNTUS E-Commerce India Pvt. Ltd.</p>
              <ul className="list-disc pl-5 space-y-2 uppercase text-sm opacity-90">
                <li>Managing Accounts & Client Relations</li>
                <li>Control & Maintenance of the Admin Panel</li>
                <li>Create Marketing Related Graphics & Materials</li>
                <li>Create High Quality Executive Presentations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="border-4 border-violet-500 p-6 bg-black">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-violet-500 pb-2">## EDUCATION</h2>
          <div className="space-y-6">
            <div className="border border-violet-500/50 p-4">
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="text-base font-bold uppercase">Dip. Info Technology</h3>
                <span className="text-sm opacity-80 uppercase">Mar 2019 - Feb 2020</span>
              </div>
              <p className="text-sm opacity-90 uppercase">Krishnanagar Jawaharlal Nehru National Youth Computer Centre</p>
              <p className="text-xs uppercase mt-2 font-bold bg-violet-900 text-violet-100 w-fit px-2 py-1">Completed With 92.5% [370/400]</p>
            </div>

            <div className="border border-violet-500/50 p-4">
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="text-base font-bold uppercase">Dip. Electrical Engg</h3>
                <span className="text-sm opacity-80 uppercase">Aug 2019 - Dropped out</span>
              </div>
              <p className="text-sm opacity-90 uppercase">Modern Institute of Engineering & Technology</p>
              <p className="text-xs uppercase mt-2 font-bold bg-violet-900 text-violet-100 w-fit px-2 py-1">1st Sem: 4.5 GPA | 2nd Sem: 6.9 GPA</p>
            </div>

            <div className="border border-violet-500/50 p-4">
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="text-base font-bold uppercase">Secondary Exam</h3>
                <span className="text-sm opacity-80 uppercase">Jan 2013 - Feb 2019</span>
              </div>
              <p className="text-sm opacity-90 uppercase">Krishnanagar A.V. High School</p>
              <p className="text-xs uppercase mt-2 font-bold bg-violet-900 text-violet-100 w-fit px-2 py-1">Completed with Marks Of 310.</p>
            </div>
          </div>
        </section>

        {/* Skills & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="border-4 border-violet-500 p-6 bg-black">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-violet-500 pb-2">## SKILLS</h2>
            <div className="space-y-6">
              <div>
                <p className="uppercase text-sm font-bold opacity-80 mb-3">ADEPT_IN:</p>
                <div className="flex flex-wrap gap-2">
                  {['PC Hardware', 'MS Office', 'Data Analysis', 'Biz Planning', 'Team Management'].map((skill) => (
                    <span key={skill} className="px-2 py-1 border-2 border-violet-500 text-xs uppercase font-bold hover:bg-violet-500 hover:text-black cursor-default">
                      [{skill}]
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="uppercase text-sm font-bold opacity-80 mb-3">LEARNING:</p>
                <div className="flex flex-wrap gap-2">
                  {['AI Prompting', 'Photography', 'Video Editing', 'Graphic Design'].map((skill) => (
                    <span key={skill} className="px-2 py-1 border border-violet-500/50 text-xs uppercase opacity-80 hover:bg-violet-500 hover:text-black hover:opacity-100 cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-4 border-violet-500 p-6 bg-black">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 border-b-2 border-violet-500 pb-2">## PERSONAL_INFO</h2>
            <div className="space-y-6">
              <div>
                <p className="uppercase text-sm font-bold opacity-80 mb-3">SOFT_SKILLS:</p>
                <div className="flex flex-wrap gap-2">
                  {['Team Work', 'Creative', 'Learner', 'Problem Solver', 'Communication', 'Multilingual'].map((skill) => (
                    <span key={skill} className="px-2 py-1 border-2 border-violet-500 text-xs uppercase font-bold hover:bg-violet-500 hover:text-black cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="uppercase text-sm font-bold opacity-80 mb-3">HOBBIES:</p>
                <div className="flex flex-wrap gap-2">
                  {['Reading', 'Tech Savvy', 'Photography'].map((hobby) => (
                    <span key={hobby} className="px-2 py-1 border-2 border-violet-500 text-xs uppercase font-bold hover:bg-violet-500 hover:text-black cursor-default">
                      &gt; {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Print-specific CSS overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          html, body, main { 
            background: white !important; 
            color: black !important;
            font-size: 10pt;
            font-family: monospace;
          }
          header, footer, nav, #visitor-tracker { 
            display: none !important; 
          }
          .border-4, .border-2, .border { border: 2px solid black !important; }
          .bg-black { background-color: white !important; color: black !important; }
          .text-violet-500 { color: black !important; }
          .border-violet-500 { border-color: black !important; }
          .shadow-\\[8px_8px_0px_0px_rgba\\(139\\,92\\,246\\,1\\)\\] { box-shadow: none !important; }
        }
      `}} />
    </div>
  );
}
