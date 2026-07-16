import SocialGrid from "@/components/SocialGrid";
import JourneyTimeline from "@/components/JourneyTimeline";
import { Terminal, Code, Cpu, Activity } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

export default function RetroMe() {
  return (
    <div className="min-h-screen bg-[#f4ebd0] dark:bg-black space-y-8 sm:space-y-16 pb-24 sm:pb-16 px-2 sm:px-0 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black overflow-x-hidden">
      <CRTEffect />
      
      {/* Header */}
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 mx-2 sm:mx-0">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest break-words">
            ME.EXE
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-6 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest w-fit border-2 border-transparent">
          [ THE_STORY ]
        </div>
        
        <p className="text-lg uppercase opacity-80 border-t-4 border-[#4a3b2c] dark:border-green-500 pt-4 mt-4 leading-relaxed">
          &gt; "The story of a curious dropout, self-taught dev, and lifelong learner."
        </p>
      </div>

      <div className="space-y-8 sm:space-y-16 text-sm leading-relaxed max-w-prose relative z-10 mx-2 sm:mx-0">
        
        {/* Quirky Sticky Notes / Cards converted to Retro logs */}
        <section className="space-y-6 sm:space-y-8">
          
          <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-white/50 dark:bg-black/50 shadow-[4px_4px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e]">
            <p className="text-base sm:text-lg font-bold uppercase leading-relaxed">
              <span className="animate-pulse">&gt;</span> Hey! I'm Rahul. Born in 2003 and raised in Krishnanagar, West Bengal, I have a habit of diving headfirst into whatever interests me. 
            </p>
          </div>
          
          <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] ml-0 sm:ml-12">
            <p className="text-base sm:text-lg font-bold uppercase leading-relaxed">
              <span className="animate-pulse">&gt;</span> Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My journey hasn't been a straight line—from dropping out of engineering, to working as a System and Project Manager, to chasing the dream of being a Seafarer, and ultimately teaching myself to build full-stack web applications.
            </p>
          </div>
          
          <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-white/50 dark:bg-black/50 shadow-[4px_4px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] mr-0 sm:mr-8">
            <p className="text-base sm:text-lg font-bold uppercase leading-relaxed">
              <span className="animate-pulse">&gt;</span> Whether it's managing unexpected challenges in a corporate project or architecting new digital products from scratch, I thrive on continuous growth. When I'm not coding, you'll find me reading, learning about AI, or practicing photography.
            </p>
          </div>
        </section>

        <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-white/50 dark:bg-black/50">
          <div className="border-b-4 border-[#4a3b2c] dark:border-green-500 pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest break-words">
              <span className="animate-pulse">_</span> SYS_TIMELINE
            </h2>
          </div>
          <JourneyTimeline />
        </div>

        <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-[#f4ebd0] dark:bg-black shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] space-y-4 sm:space-y-6">
          <div className="inline-block bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-sm font-bold tracking-widest uppercase mb-2 border-2 border-transparent">
            [ ESTABLISH_CONNECTION ]
          </div>
          <p className="text-base sm:text-lg font-bold uppercase">
            &gt; I'm always down to talk about tech, startups, self-taught journeys, or movies. Feel free to shoot me an email or find me on my socials.
          </p>
          <div className="pt-4 border-t-4 border-[#4a3b2c] dark:border-green-500 border-dashed">
            <SocialGrid />
          </div>
        </section>
      </div>
    </div>
  );
}
