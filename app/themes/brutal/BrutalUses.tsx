//
import { Cog } from "lucide-react";

export default function BrutalUses({ uses }: { uses: any[] }) {
  return (
    <div className="space-y-16 pb-16 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-screen">
      
      {/* Header */}
      <div className="border-8 border-black p-8 sm:p-12 bg-[#f4f4f0] brutal-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div className="w-full h-full border-[20px] border-black rounded-full border-dashed animate-spin-slow" />
        </div>
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <Cog className="w-12 h-12 animate-[spin_4s_linear_infinite]" strokeWidth={1.5} />
          <h1 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
            GEAR_SPECS
          </h1>
        </div>
        <div className="bg-black text-white p-4 font-bold uppercase tracking-widest inline-block mt-4 text-sm relative z-10 brutal-shadow">
          HARDWARE & SOFTWARE INVENTORY
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {uses.map((section, idx) => (
          <section 
            key={idx} 
            className="border-8 border-black p-6 sm:p-10 bg-[#f4f4f0] brutal-shadow flex flex-col"
          >
            <div className="flex items-center gap-4 mb-8 border-b-8 border-black pb-4">
              <div className="border-4 border-black p-2 bg-white">
                <section.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tighter">{section.category}</h2>
            </div>
            
            <ul className="space-y-8 flex-grow">
              {section.items.map((item: any, i: number) => (
                <li key={i} className="group flex flex-col relative border-4 border-black p-4 bg-white hover:bg-black hover:text-white transition-colors brutal-shadow">
                  <h3 className="font-black text-xl uppercase tracking-tighter mb-2">{item.name}</h3>
                  <p className="text-sm font-bold uppercase opacity-90 leading-relaxed border-t-2 border-dashed border-current pt-2">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      
      {/* Footer */}
      <div className="flex justify-center mt-12">
        <div className="border-8 border-black bg-white p-4 text-center brutal-shadow">
          <p className="font-black uppercase tracking-widest text-lg">SYS_POWER_SRC: CAFFEINE</p>
        </div>
      </div>
    </div>
  );
}
