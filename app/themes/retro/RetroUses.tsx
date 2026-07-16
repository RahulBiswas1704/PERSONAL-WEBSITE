import { Coffee, Terminal } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

export default function RetroUses({ uses }: { uses: any[] }) {
  return (
    <div className="min-h-screen bg-[#f4ebd0] dark:bg-black space-y-8 sm:space-y-16 pb-24 sm:pb-16 px-2 sm:px-0 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black overflow-x-hidden relative">
      <CRTEffect />
      
      {/* Header */}
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 mx-2 sm:mx-0">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest break-all">
            INVENTORY.SYS
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-6 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest w-fit border-2 border-transparent">
          [ GEAR_&_TOOLS ]
        </div>

        <p className="text-lg uppercase opacity-80 border-t-4 border-[#4a3b2c] dark:border-green-500 pt-4 mt-4 leading-relaxed">
          &gt; "A curated list of the hardware, software, and everyday carry items I use to build things."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10 mx-2 sm:mx-0">
        {uses.map((section, idx) => (
          <section 
            key={idx} 
            className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e]"
          >
            <div className="flex items-center gap-3 mb-6 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2">
              <div className="p-2 border-4 border-[#4a3b2c] dark:border-green-500 bg-[#4a3b2c]/10 dark:bg-green-900">
                <section.icon className="w-6 h-6 text-[#4a3b2c] dark:text-green-500" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest">{section.category}</h2>
            </div>
            
            <ul className="space-y-6">
              {section.items.map((item: any, i: number) => (
                <li key={i} className="group flex flex-col">
                  <div className="flex items-start gap-2">
                    <span className="text-[#4a3b2c] dark:text-green-500 animate-pulse mt-1">&gt;</span>
                    <div>
                      <h3 className="font-bold text-lg uppercase group-hover:text-[#4a3b2c] dark:group-hover:text-[#22c55e] transition-colors">{item.name}</h3>
                      <p className="text-sm mt-1 opacity-80 leading-relaxed group-hover:opacity-100">{item.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex justify-center mt-12 relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 border-4 border-[#4a3b2c] dark:border-green-500 bg-white/50 dark:bg-black/50 uppercase font-bold text-sm tracking-widest backdrop-blur-sm">
          <Coffee className="w-5 h-5 animate-pulse" />
          <span>SYS_POWER_SRC: EXCESSIVE CAFFEINE</span>
        </div>
      </div>
    </div>
  );
}
