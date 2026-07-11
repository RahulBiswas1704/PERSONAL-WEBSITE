"use client";

export default function ResumePage() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16">
      <div className="relative pt-8 pb-10 mb-8 border-b-2 border-dashed border-border/60">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div>
            <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-foreground transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-fit">
              RESUME.
            </h1>
            <div className="absolute top-16 sm:top-20 left-48 sm:left-64 transform rotate-6 bg-accent text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:rotate-12 transition-transform duration-300">
              Rahul Biswas
            </div>
            
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mt-8 max-w-xl font-serif italic leading-relaxed">
              &quot;System & Project Manager by day, curious learner by night.&quot;
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-4 text-sm font-mono text-neutral-500 dark:text-neutral-400">
              <a href="tel:+919635968365" className="hover:text-accent hover:-translate-y-0.5 transition-all inline-block">+91-9635968365</a>
              <span>&bull;</span>
              <a href="mailto:rahul.biswas1704@gmail.com" className="hover:text-accent hover:-translate-y-0.5 transition-all inline-block">rahul.biswas1704@gmail.com</a>
              <span>&bull;</span>
              <a href="https://github.com/RahulBiswas1704" target="_blank" className="hover:text-accent hover:-translate-y-0.5 transition-all inline-block">github.com/RahulBiswas1704</a>
            </div>
          </div>
          
          <button 
            onClick={() => window.print()}
            className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 text-sm font-black uppercase tracking-widest shadow-lg rounded-xl flex items-center gap-2 print:hidden group self-start md:self-auto"
          >
            <svg className="w-5 h-5 group-hover:animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Grab PDF
          </button>
        </div>
      </div>

      <section className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-500 p-6 sm:p-8 rounded-3xl border-2 border-border/50 bg-amber-50 dark:bg-amber-950/20 shadow-sm group">
        <div className="absolute -top-3 left-10 w-16 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm rotate-2 shadow-sm" />
        <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-4 font-mono group-hover:text-accent transition-colors">Profile</h2>
        <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-4xl font-medium">
          Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions. Whether it's mastering strategic planning or managing unexpected challenges, I thrive on continuous growth.
        </p>
      </section>

      <section className="relative transform rotate-1 hover:rotate-0 transition-transform duration-500 p-6 sm:p-8 rounded-3xl border-2 border-border/50 bg-blue-50 dark:bg-blue-950/20 shadow-sm group">
        <div className="absolute -top-3 right-10 w-16 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-2 shadow-sm" />
        <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-6 font-mono group-hover:text-accent transition-colors">Work Experience</h2>
        
        <div className="space-y-8">
          <div className="space-y-2 relative pl-4 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-accent transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 font-serif">Project Manager</h3>
              <span className="inline-block px-3 py-1 bg-white dark:bg-black rounded-full text-xs font-mono text-neutral-500 shadow-sm border border-border/50 shrink-0">Nov 2021 &mdash; Present</span>
            </div>
            <p className="text-accent font-bold text-sm tracking-wide">ZK Construction (ZK Construction Project Pvt. Ltd.)</p>
            <ul className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-3xl list-disc pl-5 space-y-1.5 font-medium mt-3">
              <li>Managing Projects & Coordinating Operations</li>
              <li>Organizing Company’s Profile & Documentation</li>
              <li>Executing and Planning Strategic Roadmaps</li>
              <li>Improving Internal Systems for Efficiency</li>
            </ul>
          </div>

          <div className="space-y-2 relative pl-4 border-l-2 border-neutral-300 dark:border-neutral-700 hover:border-accent transition-colors">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 font-serif">System Manager</h3>
              <span className="inline-block px-3 py-1 bg-white dark:bg-black rounded-full text-xs font-mono text-neutral-500 shadow-sm border border-border/50 shrink-0">Mar 2020 &mdash; Oct 2021</span>
            </div>
            <p className="text-accent font-bold text-sm tracking-wide">Unique Star (NNTUS E-Commerce India Pvt. Ltd.)</p>
            <ul className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-3xl list-disc pl-5 space-y-1.5 font-medium mt-3">
              <li>Managing Accounts & Client Relations</li>
              <li>Control & Maintenance of the Admin Panel</li>
              <li>Create Marketing Related Graphics & Materials</li>
              <li>Create High Quality Executive Presentations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-500 p-6 sm:p-8 rounded-3xl border-2 border-border/50 bg-rose-50 dark:bg-rose-950/20 shadow-sm group">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm rotate-1 shadow-sm" />
        <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-6 font-mono group-hover:text-accent transition-colors">Education</h2>
        
        <div className="space-y-6">
          <div className="space-y-1 bg-white dark:bg-neutral-900/50 p-4 rounded-2xl border border-border/30 hover:border-accent/50 transition-colors hover:shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Diploma In Information Technology</h3>
              <span className="text-xs font-mono text-neutral-500 shrink-0 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">Mar 2019 &mdash; Feb 2020</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">Krishnanagar Jawaharlal Nehru National Youth Computer Centre</p>
            <p className="text-accent text-xs mt-2 font-mono font-bold bg-accent/10 w-fit px-2 py-0.5 rounded">Completed With 92.5% Grades. [370 Out Of 400]</p>
          </div>

          <div className="space-y-1 bg-white dark:bg-neutral-900/50 p-4 rounded-2xl border border-border/30 hover:border-accent/50 transition-colors hover:shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Diploma In Electrical Engineering</h3>
              <span className="text-xs font-mono text-neutral-500 shrink-0 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">Aug 2019 &mdash; Dropped out</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">Modern Institute of Engineering & Technology</p>
            <p className="text-accent text-xs mt-2 font-mono font-bold bg-accent/10 w-fit px-2 py-0.5 rounded">1st Sem: GPA 4.5 | 2nd Sem: GPA 6.9</p>
          </div>

          <div className="space-y-1 bg-white dark:bg-neutral-900/50 p-4 rounded-2xl border border-border/30 hover:border-accent/50 transition-colors hover:shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Secondary Exam</h3>
              <span className="text-xs font-mono text-neutral-500 shrink-0 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">Jan 2013 &mdash; Feb 2019</span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">Krishnanagar A.V. High School</p>
            <p className="text-accent text-xs mt-2 font-mono font-bold bg-accent/10 w-fit px-2 py-0.5 rounded">Completed with Marks Of 310.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="relative transform rotate-1 hover:rotate-0 transition-transform duration-500 p-6 sm:p-8 rounded-3xl border-2 border-border/50 bg-emerald-50 dark:bg-emerald-950/20 shadow-sm group">
          <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-6 font-mono group-hover:text-accent transition-colors">Skills</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider">Adept In:</p>
              <div className="flex flex-wrap gap-2">
                {['PC Hardware Skills', 'Microsoft Office', 'Analyzing Data', 'Business Planning & Execution', 'Managing Teams'].map((skill, i) => (
                  <span key={skill} className={`px-4 py-2 bg-white dark:bg-black border-2 border-border/60 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-sm hover:scale-105 hover:border-accent hover:text-accent transition-all cursor-default ${i%2===0 ? '-rotate-1' : 'rotate-1'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider">Currently Learning:</p>
              <div className="flex flex-wrap gap-2">
                {['AI Prompt Engineering', 'Photography', 'Video Editing', 'Graphic Designing'].map((skill, i) => (
                  <span key={skill} className={`px-4 py-2 border-2 border-accent/40 text-accent bg-accent/5 rounded-xl text-xs font-bold hover:scale-105 hover:bg-accent hover:text-white transition-all cursor-default ${i%2===0 ? 'rotate-1' : '-rotate-1'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative transform -rotate-1 hover:rotate-0 transition-transform duration-500 p-6 sm:p-8 rounded-3xl border-2 border-border/50 bg-indigo-50 dark:bg-indigo-950/20 shadow-sm group">
          <h2 className="text-xl font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 mb-6 font-mono group-hover:text-accent transition-colors">Personal Info</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider">Soft Skills</p>
              <div className="flex flex-wrap gap-2">
                {['Team Work', 'Creative Thinking', 'Life-long Learner', 'Problem Solver', 'Communication Skills', 'Multilingual'].map((skill, i) => (
                  <span key={skill} className={`px-4 py-2 bg-white dark:bg-black border-2 border-border/60 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-sm hover:scale-105 hover:border-accent hover:text-accent transition-all cursor-default ${i%2===0 ? 'rotate-1' : '-rotate-1'}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wider">Hobbies</p>
              <div className="flex flex-wrap gap-2">
                {['Reading', 'Tech Savvy', 'Photography'].map((hobby, i) => (
                  <span key={hobby} className={`px-4 py-2 bg-white dark:bg-black border-2 border-border/60 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 shadow-sm hover:scale-105 hover:border-accent hover:text-accent transition-all cursor-default ${i%2===0 ? '-rotate-1' : 'rotate-1'}`}>
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
          /* Remove quirks for printing */
          .transform { transform: none !important; }
          .rounded-3xl, .rounded-2xl, .rounded-xl { border-radius: 8px !important; }
          .bg-amber-50, .bg-blue-50, .bg-rose-50, .bg-emerald-50, .bg-indigo-50,
          .dark\\:bg-amber-950\\/20, .dark\\:bg-blue-950\\/20, .dark\\:bg-rose-950\\/20, 
          .dark\\:bg-emerald-950\\/20, .dark\\:bg-indigo-950\\/20, .bg-white, .dark\\:bg-black {
            background-color: transparent !important;
            box-shadow: none !important;
          }
          .border-border\\/50, .border-border\\/60, .border-border\\/30, .border-neutral-300, .dark\\:border-neutral-700 { 
            border-color: #e5e5e5 !important; 
          }
          .text-neutral-900, .dark\\:text-neutral-100, .text-foreground {
            color: #000000 !important;
          }
          .text-neutral-700, .text-neutral-600, .text-neutral-500,
          .dark\\:text-neutral-300, .dark\\:text-neutral-400 {
            color: #525252 !important;
          }
          .text-accent {
            color: black !important;
          }
          .bg-accent\\/10, .bg-accent\\/5 {
            background-color: transparent !important;
            border: 1px solid #ccc !important;
            color: black !important;
          }
          .blur-3xl, .bg-accent\\/20, .bg-neutral-200\\/80, .dark\\:bg-neutral-700\\/80 {
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
          .absolute {
             position: static !important;
             display: inline-block !important;
             margin-top: 10px;
          }
          /* specific hide for the sticky tape and blurred orbs */
          .w-16.h-5, .w-40.h-40 { display: none !important; }
        }
      `}} />
    </div>
  );
}
