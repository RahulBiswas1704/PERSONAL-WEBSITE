import { Coffee } from "lucide-react";

export default function MinimalUses({ uses }: { uses: any[] }) {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16 font-sans">
      
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
          Uses
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
          A curated list of the hardware, software, and everyday carry items I use to build things.
        </p>
      </div>

      <div className="space-y-16 mt-12">
        {uses.map((section, idx) => (
          <section key={idx} className="border-t border-indigo-100 dark:border-indigo-900/30 pt-8">
            <div className="flex items-center gap-3 mb-8">
              <section.icon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
              <h2 className="text-2xl font-medium text-foreground">{section.category}</h2>
            </div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {section.items.map((item: any, i: number) => (
                <li key={i}>
                  <h3 className="font-medium text-lg text-foreground mb-2">{item.name}</h3>
                  <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      
      <div className="flex justify-center mt-20 text-neutral-400">
        <div className="flex items-center gap-2 text-sm">
          <Coffee className="w-4 h-4" />
          <span>Powered by excessive caffeine</span>
        </div>
      </div>
    </div>
  );
}
