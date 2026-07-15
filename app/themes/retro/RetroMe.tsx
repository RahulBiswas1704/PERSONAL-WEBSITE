import Image from "next/image";
import { Terminal, Code, Cpu, Activity } from "lucide-react";

export default function RetroMe() {
  return (
    <div className="space-y-16 pb-16 font-mono text-fuchsia-500 selection:bg-fuchsia-500 selection:text-black">
      
      {/* Header */}
      <div className="border-4 border-fuchsia-500 p-8 shadow-[8px_8px_0px_0px_rgba(217,70,239,1)] bg-black">
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
            WHOAMI
          </h1>
        </div>
        <p className="text-lg uppercase opacity-80 border-t-2 border-fuchsia-500/50 pt-4 mt-4 leading-relaxed">
          &gt; Loading bio.dat...
          <br />
          &gt; A system manager and project coordinator driven by curiosity and caffeine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col - Image & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="border-4 border-fuchsia-500 p-2 bg-black grayscale contrast-150 relative">
            <div className="absolute inset-0 bg-fuchsia-500/20 z-10 mix-blend-overlay"></div>
            <Image 
              src="/me.jpg" 
              alt="Rahul" 
              width={400} 
              height={400}
              className="w-full object-cover"
            />
            <div className="absolute top-4 left-4 z-20 bg-black border-2 border-fuchsia-500 px-2 py-1 text-xs font-bold uppercase animate-pulse">
              [ REC ]
            </div>
          </div>
          
          <div className="border-4 border-fuchsia-500 p-6 bg-black">
            <h2 className="text-xl font-bold uppercase border-b-2 border-fuchsia-500 pb-2 mb-4">Sys_Stats</h2>
            <ul className="space-y-4 uppercase text-sm">
              <li className="flex justify-between border-b border-fuchsia-500/30 pb-2">
                <span>Location</span> <span>India</span>
              </li>
              <li className="flex justify-between border-b border-fuchsia-500/30 pb-2">
                <span>Status</span> <span>Active</span>
              </li>
              <li className="flex justify-between border-b border-fuchsia-500/30 pb-2">
                <span>Role</span> <span>Manager</span>
              </li>
              <li className="flex justify-between border-b border-fuchsia-500/30 pb-2">
                <span>Uptime</span> <span>99.9%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col - Bio */}
        <div className="lg:col-span-2 space-y-8">
          <section className="border-4 border-fuchsia-500 p-8 bg-black">
            <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
              <Code className="w-6 h-6" /> ./bio/about_me.txt
            </h2>
            <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-90 uppercase">
              <p>
                Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions.
              </p>
              <p>
                From managing projects to orchestrating complex operational workflows, I aim to bridge the gap between technical execution and business operations.
              </p>
            </div>
          </section>

          <section className="border-4 border-fuchsia-500 p-8 bg-black">
            <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
              <Cpu className="w-6 h-6" /> ./bio/skills.dat
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Project Management', 'System Ops', 'Data Analysis', 'Web Development', 'UI/UX Design', 'Communications'].map((skill, i) => (
                <div key={i} className="border-2 border-fuchsia-500 p-3 text-center text-xs md:text-sm font-bold uppercase hover:bg-fuchsia-500 hover:text-black transition-colors cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          <section className="border-4 border-fuchsia-500 p-8 bg-black">
            <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6" /> ./bio/status.log
            </h2>
            <ul className="space-y-4 uppercase text-sm leading-relaxed">
              <li className="flex gap-4">
                <span className="opacity-50">[2021-CUR]</span>
                <span>Project Manager @ ZK Construction</span>
              </li>
              <li className="flex gap-4">
                <span className="opacity-50">[2020-2021]</span>
                <span>System Manager @ Unique Star</span>
              </li>
              <li className="flex gap-4">
                <span className="opacity-50">[2019-2020]</span>
                <span>IT Diploma @ KJNNYCC</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
