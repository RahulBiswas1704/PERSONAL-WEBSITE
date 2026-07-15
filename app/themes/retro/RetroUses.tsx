//
import { Coffee, Terminal } from "lucide-react";

export default function RetroUses({ uses }: { uses: any[] }) {
  return (
    <div className="space-y-16 pb-16 font-mono text-orange-500 selection:bg-orange-500 selection:text-black">
      
      {/* Header */}
      <div className="border-4 border-orange-500 p-8 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] bg-black">
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
            INVENTORY.SYS
          </h1>
        </div>
        <p className="text-lg uppercase opacity-80 border-t-2 border-orange-500/50 pt-4 mt-4 leading-relaxed">
          &gt; Loading gear profile...
          <br />
          &gt; Hardware, software, and tools currently equipped.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {uses.map((section, idx) => (
          <section 
            key={idx} 
            className="border-4 border-orange-500 p-6 sm:p-8 bg-black shadow-[4px_4px_0px_0px_rgba(249,115,22,1)]"
          >
            <div className="flex items-center gap-3 mb-6 border-b-2 border-orange-500 pb-2">
              <div className="p-2 border-2 border-orange-500 bg-orange-950">
                <section.icon className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-widest">{section.category}</h2>
            </div>
            
            <ul className="space-y-6">
              {section.items.map((item: any, i: number) => (
                <li key={i} className="group flex flex-col">
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 animate-pulse mt-1">&gt;</span>
                    <div>
                      <h3 className="font-bold text-lg uppercase group-hover:text-white transition-colors">{item.name}</h3>
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
      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-2 px-4 py-2 border-2 border-orange-500 bg-black uppercase font-bold text-sm tracking-widest">
          <Coffee className="w-5 h-5 animate-pulse" />
          <span>SYS_POWER_SRC: CAFFEINE</span>
        </div>
      </div>
    </div>
  );
}
