import { Metadata } from "next";
import { Laptop, Terminal, Cpu, PenTool, Coffee } from "lucide-react";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and gear I use daily.",
};

const uses = [
  {
    category: "Hardware",
    icon: Laptop,
    color: "rose",
    rotation: "-rotate-1",
    items: [
      { name: "ASUS TUF Gaming A15", desc: "My primary workhorse for development and heavy lifting." },
      { name: "OnePlus 13R", desc: "My daily driver for mobile testing and staying connected." },
    ]
  },
  {
    category: "Software & Editor",
    icon: Terminal,
    color: "blue",
    rotation: "rotate-1",
    items: [
      { name: "VS Code", desc: "My editor of choice for writing code." },
      { name: "GitHub", desc: "For version control and open source contributions." },
    ]
  },
  {
    category: "Cloud & Backend",
    icon: Cpu,
    color: "emerald",
    rotation: "-rotate-2",
    items: [
      { name: "Vercel", desc: "Where all my frontend projects are deployed and hosted." },
      { name: "Supabase", desc: "My go-to backend-as-a-service and PostgreSQL database." },
    ]
  },
  {
    category: "Design & Productivity",
    icon: PenTool,
    color: "amber",
    rotation: "rotate-2",
    items: [
      { name: "Figma", desc: "For UI mockups and design brainstorming." },
      { name: "Notion", desc: "Where I organize my life and project ideas." },
      { name: "Slack", desc: "For team communication and community channels." }
    ]
  }
];

export default function UsesPage() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16">
      
      {/* Title block */}
      <div className="relative pt-8 pb-10 mb-8 border-b-2 border-dashed border-border/60">
        <div className="absolute top-0 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-teal-950 dark:text-teal-50 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 w-fit">
          USES.
        </h1>
        
        <div className="absolute top-16 sm:top-20 left-40 sm:left-64 transform rotate-3 bg-accent text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:rotate-6 transition-transform duration-300 z-20">
          Gear & Tools
        </div>
        
        <p className="text-lg sm:text-xl text-teal-900 dark:text-teal-100 mt-8 max-w-xl relative z-10 font-serif italic leading-relaxed">
          &quot;A curated list of the hardware, software, and everyday carry items I use to build things.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {uses.map((section, idx) => {
          
          // Map color strings to Tailwind classes (safe for JIT compiler)
          const colorStyles: Record<string, string> = {
            rose: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-100 marker:text-rose-400",
            blue: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 text-blue-900 dark:text-blue-100 marker:text-blue-400",
            emerald: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-100 marker:text-emerald-400",
            amber: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-100 marker:text-amber-400"
          };
          
          const headerColors: Record<string, string> = {
            rose: "bg-rose-100 dark:bg-rose-900/50 border-rose-300 dark:border-rose-700",
            blue: "bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-700",
            emerald: "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700",
            amber: "bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-700"
          };

          const tapeStyles = idx % 2 === 0 ? "right-10 rotate-2" : "left-10 -rotate-3";

          return (
            <section 
              key={idx} 
              className={`relative transform ${section.rotation} hover:rotate-0 transition-all duration-500 border-2 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md ${colorStyles[section.color]}`}
            >
              {/* Tape */}
              <div className={`absolute -top-3 w-16 h-6 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm shadow-sm ${tapeStyles}`} />
              
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-xl border ${headerColors[section.color]}`}>
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-black font-serif">{section.category}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i} className="pl-4 border-l-4 border-current/20">
                    <h3 className="font-bold text-base">{item.name}</h3>
                    <p className="text-sm opacity-80 mt-1 leading-relaxed font-medium">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      
      {/* Footer Easter Egg */}
      <div className="flex justify-center mt-12 transform rotate-1 opacity-70 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800 text-sm font-mono font-bold text-neutral-600 dark:text-neutral-400">
          <Coffee className="w-4 h-4" />
          Powered by excessive caffeine
        </div>
      </div>
    </div>
  );
}
