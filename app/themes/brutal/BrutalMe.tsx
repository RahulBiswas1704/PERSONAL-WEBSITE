import Image from "next/image";
import { HardDrive, Binary, Cpu, ActivitySquare } from "lucide-react";

export default function BrutalMe() {
  return (
    <div className="space-y-12 pb-16 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-screen">
      
      {/* Header */}
      <div className="border-4 border-black p-8 bg-[#f4f4f0] brutal-shadow relative">
        <div className="flex items-center gap-4 mb-2">
          <HardDrive className="w-10 h-10" strokeWidth={1.5} />
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
            OPERATOR_PROFILE
          </h1>
        </div>
        <div className="absolute top-4 right-4 border-2 border-black px-2 py-1 text-xs font-bold uppercase tracking-widest bg-black text-[#f4f4f0]">
          STATUS: ONLINE
        </div>
        <p className="text-lg uppercase font-bold border-l-4 border-black pl-4 mt-6 max-w-2xl">
          IDENTIFICATION AND SPECIFICATIONS
          <br />
          A system manager and project coordinator engineered for complex environments.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Col - Image & Specs */}
        <div className="xl:col-span-1 space-y-8">
          <div className="border-4 border-black bg-[#f4f4f0] brutal-shadow p-4 relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-b-4 border-r-4 border-black z-10" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-t-4 border-l-4 border-black z-10" />
            
            <div className="relative border-4 border-black overflow-hidden grayscale contrast-125 brightness-90">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-30 mix-blend-overlay z-10 pointer-events-none" />
              <Image 
                src="/me.jpg" 
                alt="Rahul" 
                width={400} 
                height={400}
                className="w-full object-cover"
              />
            </div>
            
            <div className="mt-4 border-t-4 border-black pt-4 flex justify-between items-end font-bold uppercase text-xs tracking-widest">
              <span>FIG_2.0: OPERATOR</span>
              <span className="bg-black text-[#f4f4f0] px-2 py-1">SCANNED_IMG</span>
            </div>
          </div>
          
          <div className="border-4 border-black p-6 bg-[#f4f4f0] brutal-shadow">
            <h2 className="text-2xl font-black uppercase tracking-widest border-b-4 border-black pb-2 mb-4 flex items-center gap-2">
              <Binary className="w-6 h-6" /> BASE_SPECS
            </h2>
            <ul className="space-y-3 font-bold uppercase text-sm tracking-wide">
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>LOCATION</span> <span>INDIA</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>PRIMARY_ROLE</span> <span>PROJECT_MGR</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>SECONDARY_ROLE</span> <span>SYSTEM_OPS</span>
              </li>
              <li className="flex justify-between border-b-2 border-dashed border-black/30 pb-1">
                <span>UPTIME</span> <span>99.9%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Col - Logs */}
        <div className="xl:col-span-2 space-y-8">
          
          <section className="border-4 border-black p-6 sm:p-8 bg-[#f4f4f0] brutal-shadow">
            <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3 mb-6 border-b-4 border-black pb-2 inline-block">
              <ActivitySquare className="w-6 h-6 inline-block mr-2" strokeWidth={2} /> 
              SYSTEM_NARRATIVE
            </h2>
            <div className="space-y-6 font-bold uppercase leading-relaxed text-sm sm:text-base">
              <p className="border-l-4 border-black pl-4">
                Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My background in communications ignites my curiosity, while my love for technology inspires me to solve problems and explore innovative solutions.
              </p>
              <p className="border-l-4 border-black pl-4">
                From managing projects to orchestrating complex operational workflows, I aim to bridge the gap between technical execution and business operations. I thrive in environments that require rigid logic and creative problem-solving.
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="border-4 border-black p-6 bg-[#f4f4f0] brutal-shadow flex flex-col h-full">
              <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2 mb-6 border-b-4 border-black pb-2">
                <Cpu className="w-5 h-5" /> CORE_MODULES
              </h2>
              <div className="flex flex-wrap gap-3 mt-auto">
                {['Project Management', 'System Ops', 'Data Analysis', 'Web Development', 'UI/UX Design', 'Communications'].map((skill, i) => (
                  <div key={i} className="border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-[#f4f4f0] transition-colors cursor-default">
                    {skill}
                  </div>
                ))}
              </div>
            </section>

            <section className="border-4 border-black p-6 bg-[#f4f4f0] brutal-shadow">
              <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b-4 border-black pb-2">
                OPERATION_LOG
              </h2>
              <ul className="space-y-4 font-bold uppercase text-xs sm:text-sm tracking-wide">
                <li className="flex flex-col gap-1 border-l-4 border-black pl-3">
                  <span className="text-[10px] bg-black text-[#f4f4f0] px-1 w-fit">2021-PRESENT</span>
                  <span>Project Mgr @ ZK Construction</span>
                </li>
                <li className="flex flex-col gap-1 border-l-4 border-black pl-3">
                  <span className="text-[10px] border-2 border-black px-1 w-fit">2020-2021</span>
                  <span>System Mgr @ Unique Star</span>
                </li>
                <li className="flex flex-col gap-1 border-l-4 border-black pl-3">
                  <span className="text-[10px] border-2 border-black px-1 w-fit">2019-2020</span>
                  <span>IT Diploma @ KJNNYCC</span>
                </li>
              </ul>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
