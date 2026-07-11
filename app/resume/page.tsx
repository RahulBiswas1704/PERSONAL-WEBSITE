"use client";

export default function ResumePage() {
  return (
    <div className="space-y-12 animate-fade-in-up pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-border/60">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">Rahul Biswas</h1>
          <p className="text-muted">System & Project Manager | Technology Enthusiast</p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-sm text-muted-light">
            <a href="tel:+919635968365" className="hover:text-accent transition-colors">+91-9635968365</a>
            <span>&bull;</span>
            <a href="mailto:rahul.biswas1704@gmail.com" className="hover:text-accent transition-colors">rahul.biswas1704@gmail.com</a>
            <span>&bull;</span>
            <a href="https://github.com/RahulBiswas1704" target="_blank" className="hover:text-accent transition-colors">github.com/RahulBiswas1704</a>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-4 py-2 border border-border rounded-lg bg-background hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm font-bold flex items-center gap-2 print:hidden group"
        >
          <svg className="w-4 h-4 group-hover:text-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download PDF
        </button>
      </div>

      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-light">Profile</h2>
        <p className="text-sm text-muted leading-relaxed max-w-3xl">
          Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions. Whether it's mastering strategic planning or managing unexpected challenges, I thrive on continuous growth.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-light">Work Experience</h2>
        
        <div className="space-y-8">
          <div className="space-y-2 group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">Project Manager</h3>
              <span className="text-xs font-mono text-muted shrink-0">Nov 2021 &mdash; Present</span>
            </div>
            <p className="text-foreground font-medium text-sm">ZK Construction (ZK Construction Project Pvt. Ltd.)</p>
            <ul className="text-muted text-sm leading-relaxed max-w-3xl list-disc pl-5 space-y-1">
              <li>Managing Projects</li>
              <li>Organizing Company’s Profile</li>
              <li>Executing and planning</li>
              <li>Improving Internal Systems</li>
            </ul>
          </div>

          <div className="space-y-2 group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">System Manager</h3>
              <span className="text-xs font-mono text-muted shrink-0">Mar 2020 &mdash; Oct 2021</span>
            </div>
            <p className="text-foreground font-medium text-sm">Unique Star (NNTUS E-Commerce India Pvt. Ltd.)</p>
            <ul className="text-muted text-sm leading-relaxed max-w-3xl list-disc pl-5 space-y-1">
              <li>Managing Accounts</li>
              <li>Control Admin Panel</li>
              <li>Create Marketing Related Graphics</li>
              <li>Create High Quality Presentations</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-light">Education</h2>
        
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-foreground">Diploma In Information Technology</h3>
              <span className="text-xs font-mono text-muted shrink-0">Mar 2019 &mdash; Feb 2020</span>
            </div>
            <p className="text-muted text-sm">Krishnanagar Jawaharlal Nehru National Youth Computer Centre</p>
            <p className="text-muted-light text-xs mt-1">Completed With 92.5% Grades. [370 Out Of 400]</p>
          </div>

          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-foreground">Diploma In Electrical Engineering</h3>
              <span className="text-xs font-mono text-muted shrink-0">Aug 2019 &mdash; Dropped out</span>
            </div>
            <p className="text-muted text-sm">Modern Institute of Engineering & Technology</p>
            <p className="text-muted-light text-xs mt-1">1st Sem Completed with A Cumulative GPA Of 4.5 | 2nd Sem Completed with A Cumulative GPA Of 6.9</p>
          </div>

          <div className="space-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
              <h3 className="text-lg font-bold text-foreground">Secondary Exam</h3>
              <span className="text-xs font-mono text-muted shrink-0">Jan 2013 &mdash; Feb 2019</span>
            </div>
            <p className="text-muted text-sm">Krishnanagar A.V. High School</p>
            <p className="text-muted-light text-xs mt-1">Completed Secondary Exam with Marks Of 310.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-light">Skills</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-foreground mb-2">Adept In:</p>
              <div className="flex flex-wrap gap-2">
                {['PC Hardware Skills', 'Microsoft Office', 'Analyzing Data', 'Business Planning & Execution', 'Managing Teams'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-neutral-50 dark:bg-neutral-900 border border-border/50 rounded-md text-xs font-medium text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-2">Currently Learning:</p>
              <div className="flex flex-wrap gap-2">
                {['AI Prompt Engineering', 'Photography', 'Video Editing', 'Graphic Designing'].map(skill => (
                  <span key={skill} className="px-3 py-1 border border-accent/30 text-accent bg-accent/5 rounded-md text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-light">Personal Info</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-bold text-foreground mb-2">Personal Skills</p>
              <div className="flex flex-wrap gap-2">
                {['Team Work', 'Creative Thinking', 'Life-long Learner', 'Problem Solver', 'Communication Skills', 'Multilingual'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-neutral-50 dark:bg-neutral-900 border border-border/50 rounded-md text-xs font-medium text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-2">Hobbies</p>
              <div className="flex flex-wrap gap-2">
                {['Reading', 'Tech Savvy', 'Photography'].map(hobby => (
                  <span key={hobby} className="px-3 py-1 bg-neutral-50 dark:bg-neutral-900 border border-border/50 rounded-md text-xs font-medium text-foreground">
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
          .border-border, .border-border\\/50, .border-border\\/60, .border-accent\\/30 { 
            border-color: #e5e5e5 !important; 
          }
          .text-muted, .text-muted-light {
            color: #525252 !important;
          }
          .text-foreground {
            color: #000000 !important;
          }
          .bg-neutral-50, .bg-neutral-900, .bg-accent\\/5 {
            background-color: transparent !important;
          }
          .text-accent {
            color: black !important;
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
