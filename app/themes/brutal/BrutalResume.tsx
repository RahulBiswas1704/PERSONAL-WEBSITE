"use client";

import { Download, FileText } from "lucide-react";

export default function BrutalResume() {
  return (
    <div className="space-y-12 pb-16 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-screen print:pb-0">
      
      {/* Print Cover Letter */}
      <div className="hidden print:block print:pb-16" style={{ pageBreakAfter: 'always' }}>
        <div className="mb-8 border-b-8 border-black pb-8">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-black mb-2" style={{ fontFamily: 'Impact, monospace' }}>
            Rahul Biswas
          </h1>
          <p className="text-xl uppercase text-black font-bold">
            System & Project Manager
          </p>
        </div>
        
        <div className="space-y-6 text-base text-black uppercase font-bold leading-relaxed">
          <p className="text-lg border-l-4 border-black pl-4">Dear Hiring Manager,</p>
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
            <strong className="text-2xl font-black">Rahul Biswas</strong>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <FileText className="w-12 h-12" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
              RESUME
            </h1>
          </div>
          <div className="bg-black text-[#f4f4f0] p-2 inline-block font-bold uppercase text-xs tracking-widest mt-4">
            DOCUMENT_ID: RB-2026
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-8 text-sm uppercase font-black border-4 border-black p-4 bg-white">
            <a href="tel:+919635968365" className="hover:bg-black hover:text-white transition-colors px-2">+91-9635968365</a>
            <span className="opacity-30">|</span>
            <a href="mailto:rahul.biswas1704@gmail.com" className="hover:bg-black hover:text-white transition-colors px-2">rahul.biswas1704@gmail.com</a>
            <span className="opacity-30">|</span>
            <a href="https://github.com/RahulBiswas1704" target="_blank" rel="noreferrer" className="hover:bg-black hover:text-white transition-colors px-2">github.com/RahulBiswas1704</a>
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
          className="flex items-center gap-2 px-8 py-4 border-8 border-black bg-black text-[#f4f4f0] text-sm font-black uppercase tracking-widest hover:bg-[#f4f4f0] hover:text-black transition-colors print:hidden brutal-shadow whitespace-nowrap"
        >
          <Download className="w-6 h-6" strokeWidth={2} />
          EXECUTE_PRINT
        </button>
      </div>

      <div className="space-y-12">
        {/* Profile */}
        <section className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 border-b-8 border-black pb-2 inline-block">
            EXECUTIVE_SUMMARY
          </h2>
          <p className="text-base sm:text-lg uppercase font-bold leading-relaxed border-l-4 border-black pl-4 bg-white p-4">
            Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions. Whether it's mastering strategic planning or managing unexpected challenges, I thrive on continuous growth.
          </p>
        </section>

        {/* Experience */}
        <section className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-8 border-black pb-2 inline-block">
            OPERATIONAL_HISTORY
          </h2>
          <div className="space-y-12">
            <div className="border-4 border-black bg-white p-6 relative">
              <div className="absolute top-0 right-0 bg-black text-white font-black text-xs px-2 py-1 uppercase">
                NOV 2021 - PRESENT
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 mt-2">Project Manager</h3>
              <p className="opacity-80 uppercase font-black mb-6">ZK Construction Project Pvt. Ltd.</p>
              <ul className="list-disc pl-5 space-y-2 uppercase text-sm font-bold opacity-90">
                <li>Managing Projects & Coordinating Operations</li>
                <li>Organizing Company’s Profile & Documentation</li>
                <li>Executing and Planning Strategic Roadmaps</li>
                <li>Improving Internal Systems for Efficiency</li>
              </ul>
            </div>

            <div className="border-4 border-black bg-white p-6 relative">
              <div className="absolute top-0 right-0 border-2 border-black bg-white text-black font-black text-xs px-2 py-1 uppercase">
                MAR 2020 - OCT 2021
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 mt-2">System Manager</h3>
              <p className="opacity-80 uppercase font-black mb-6">NNTUS E-Commerce India Pvt. Ltd.</p>
              <ul className="list-disc pl-5 space-y-2 uppercase text-sm font-bold opacity-90">
                <li>Managing Accounts & Client Relations</li>
                <li>Control & Maintenance of the Admin Panel</li>
                <li>Create Marketing Related Graphics & Materials</li>
                <li>Create High Quality Executive Presentations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b-8 border-black pb-2 inline-block">
            TRAINING_DATA
          </h2>
          <div className="space-y-6">
            <div className="border-4 border-black bg-white p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-xl font-black uppercase">Dip. Info Technology</h3>
                <p className="text-sm font-bold uppercase mt-1">Krishnanagar Jawaharlal Nehru National Youth Computer Centre</p>
                <p className="text-xs uppercase mt-3 font-black bg-black text-white inline-block px-2 py-1">Completed With 92.5% [370/400]</p>
              </div>
              <div className="border-2 border-black px-2 py-1 text-xs font-black uppercase whitespace-nowrap">
                MAR 2019 - FEB 2020
              </div>
            </div>

            <div className="border-4 border-black bg-white p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-xl font-black uppercase">Dip. Electrical Engg</h3>
                <p className="text-sm font-bold uppercase mt-1">Modern Institute of Engineering & Technology</p>
                <p className="text-xs uppercase mt-3 font-black bg-black text-white inline-block px-2 py-1">1st Sem: 4.5 GPA | 2nd Sem: 6.9 GPA</p>
              </div>
              <div className="border-2 border-black px-2 py-1 text-xs font-black uppercase whitespace-nowrap">
                AUG 2019 - DROPPED OUT
              </div>
            </div>

            <div className="border-4 border-black bg-white p-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-xl font-black uppercase">Secondary Exam</h3>
                <p className="text-sm font-bold uppercase mt-1">Krishnanagar A.V. High School</p>
                <p className="text-xs uppercase mt-3 font-black bg-black text-white inline-block px-2 py-1">Completed with Marks Of 310.</p>
              </div>
              <div className="border-2 border-black px-2 py-1 text-xs font-black uppercase whitespace-nowrap">
                JAN 2013 - FEB 2019
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-8 border-black pb-2">
              TECHNICAL_CAPABILITIES
            </h2>
            <div className="space-y-8">
              <div>
                <p className="uppercase text-sm font-black bg-black text-white inline-block px-2 py-1 mb-4">ADEPT_IN</p>
                <div className="flex flex-wrap gap-2">
                  {['PC Hardware', 'MS Office', 'Data Analysis', 'Biz Planning', 'Team Management'].map((skill) => (
                    <span key={skill} className="px-3 py-1 border-4 border-black bg-white text-xs uppercase font-black">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="uppercase text-sm font-black border-4 border-black bg-white inline-block px-2 py-1 mb-4">LEARNING</p>
                <div className="flex flex-wrap gap-2">
                  {['AI Prompting', 'Photography', 'Video Editing', 'Graphic Design'].map((skill) => (
                    <span key={skill} className="px-3 py-1 border-2 border-dashed border-black bg-white text-xs uppercase font-bold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="border-8 border-black p-8 bg-[#f4f4f0] brutal-shadow">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6 border-b-8 border-black pb-2">
              AUXILIARY_TRAITS
            </h2>
            <div className="space-y-8">
              <div>
                <p className="uppercase text-sm font-black bg-black text-white inline-block px-2 py-1 mb-4">SOFT_SKILLS</p>
                <div className="flex flex-wrap gap-2">
                  {['Team Work', 'Creative', 'Learner', 'Problem Solver', 'Communication', 'Multilingual'].map((skill) => (
                    <span key={skill} className="px-3 py-1 border-4 border-black bg-white text-xs uppercase font-black">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="uppercase text-sm font-black border-4 border-black bg-white inline-block px-2 py-1 mb-4">HOBBIES</p>
                <div className="flex flex-wrap gap-2">
                  {['Reading', 'Tech Savvy', 'Photography'].map((hobby) => (
                    <span key={hobby} className="px-3 py-1 border-2 border-black bg-white text-xs uppercase font-bold">
                      {hobby}
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
          .border-8, .border-4, .border-2, .border { border: 2px solid black !important; }
          .bg-black { background-color: white !important; color: black !important; }
          .text-white { color: black !important; }
          .brutal-shadow { box-shadow: none !important; }
          .bg-\\[\\#f4f4f0\\] { background-color: white !important; }
        }
      `}} />
    </div>
  );
}
