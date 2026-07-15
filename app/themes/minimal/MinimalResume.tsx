"use client";

import { Download } from "lucide-react";

export default function MinimalResume() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16 font-sans print:pb-0">
      
      {/* Cover Letter (Print Only) */}
      <div className="hidden print:block print:pb-16" style={{ pageBreakAfter: 'always' }}>
        <div className="mb-8 border-b border-neutral-300 pb-8">
          <h1 className="text-4xl font-normal tracking-tight text-black mb-2">
            Rahul Biswas
          </h1>
          <p className="text-lg text-neutral-600">
            System & Project Manager
          </p>
        </div>
        
        <div className="space-y-6 text-base text-black leading-relaxed">
          <p className="font-medium text-lg">Dear Hiring Manager,</p>
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
            <strong className="text-xl font-medium">Rahul Biswas</strong>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-indigo-100 dark:border-indigo-900/30 pb-8">
        <div>
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white mb-4">
            Resume
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed mb-6">
            System & Project Manager by day, curious learner by night.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <a href="tel:+919635968365" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">+91-9635968365</a>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <a href="mailto:rahul.biswas1704@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">rahul.biswas1704@gmail.com</a>
            <span className="text-neutral-300 dark:text-neutral-700">|</span>
            <a href="https://github.com/RahulBiswas1704" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">github.com/RahulBiswas1704</a>
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
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors print:hidden"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="space-y-16">
        {/* Profile */}
        <section>
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Profile</h2>
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-3xl">
            Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions. Whether it's mastering strategic planning or managing unexpected challenges, I thrive on continuous growth.
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Experience</h2>
          <div className="space-y-12">
            <div>
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-xl font-medium text-foreground">Project Manager</h3>
                <span className="text-neutral-500 font-mono text-sm">Nov 2021 &mdash; Present</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">ZK Construction Project Pvt. Ltd.</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300 text-lg">
                <li>Managing Projects & Coordinating Operations</li>
                <li>Organizing Company’s Profile & Documentation</li>
                <li>Executing and Planning Strategic Roadmaps</li>
                <li>Improving Internal Systems for Efficiency</li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-xl font-medium text-foreground">System Manager</h3>
                <span className="text-neutral-500 font-mono text-sm">Mar 2020 &mdash; Oct 2021</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">NNTUS E-Commerce India Pvt. Ltd.</p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-700 dark:text-neutral-300 text-lg">
                <li>Managing Accounts & Client Relations</li>
                <li>Control & Maintenance of the Admin Panel</li>
                <li>Create Marketing Related Graphics & Materials</li>
                <li>Create High Quality Executive Presentations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Education</h2>
          <div className="space-y-8">
            <div>
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="text-lg font-medium text-foreground">Diploma In Information Technology</h3>
                <span className="text-neutral-500 font-mono text-sm">Mar 2019 &mdash; Feb 2020</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">Krishnanagar Jawaharlal Nehru National Youth Computer Centre</p>
              <p className="text-sm text-neutral-500 mt-1">Completed With 92.5% Grades. [370 Out Of 400]</p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="text-lg font-medium text-foreground">Diploma In Electrical Engineering</h3>
                <span className="text-neutral-500 font-mono text-sm">Aug 2019 &mdash; Dropped out</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">Modern Institute of Engineering & Technology</p>
              <p className="text-sm text-neutral-500 mt-1">1st Sem: GPA 4.5 | 2nd Sem: GPA 6.9</p>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row justify-between mb-1">
                <h3 className="text-lg font-medium text-foreground">Secondary Exam</h3>
                <span className="text-neutral-500 font-mono text-sm">Jan 2013 &mdash; Feb 2019</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">Krishnanagar A.V. High School</p>
              <p className="text-sm text-neutral-500 mt-1">Completed with Marks Of 310.</p>
            </div>
          </div>
        </section>

        {/* Skills & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Skills</h2>
            <div className="space-y-6">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3 text-sm">Adept In:</p>
                <div className="flex flex-wrap gap-2">
                  {['PC Hardware Skills', 'Microsoft Office', 'Analyzing Data', 'Business Planning & Execution', 'Managing Teams'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3 text-sm">Currently Learning:</p>
                <div className="flex flex-wrap gap-2">
                  {['AI Prompt Engineering', 'Photography', 'Video Editing', 'Graphic Designing'].map((skill) => (
                    <span key={skill} className="px-3 py-1 border border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-6">Personal Info</h2>
            <div className="space-y-6">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3 text-sm">Soft Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {['Team Work', 'Creative Thinking', 'Life-long Learner', 'Problem Solver', 'Communication Skills', 'Multilingual'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-neutral-700 dark:text-neutral-300 mb-3 text-sm">Hobbies:</p>
                <div className="flex flex-wrap gap-2">
                  {['Reading', 'Tech Savvy', 'Photography'].map((hobby) => (
                    <span key={hobby} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-sm rounded-full">
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
          main { 
            padding: 0 !important; 
            max-width: 100% !important; 
            margin: 0 !important;
          }
          .animate-fade-in-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}} />
    </div>
  );
}
