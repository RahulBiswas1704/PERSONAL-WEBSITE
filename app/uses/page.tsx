import { Metadata } from "next";
import { Laptop, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and gear I use daily.",
};

// Placeholder data - user needs to edit this
const uses = [
  {
    category: "Hardware",
    icon: Laptop,
    items: [
      { name: "MacBook Pro 14\"", desc: "M3 Pro, 18GB RAM. The ultimate dev machine." },
      { name: "LG 27\" 4K Monitor", desc: "Crisp text makes long coding sessions bearable." },
      { name: "Keychron K2", desc: "Mechanical keyboard with brown switches." },
      { name: "Logitech MX Master 3S", desc: "Best mouse ever made, hands down." }
    ]
  },
  {
    category: "Software & Editor",
    icon: Terminal,
    items: [
      { name: "VS Code", desc: "My editor of choice. Theme: One Dark Pro." },
      { name: "Ghostty", desc: "Blazing fast, GPU-accelerated terminal." },
      { name: "Figma", desc: "For UI mockups and design brainstorming." },
      { name: "Notion", desc: "Where I organize my life and project ideas." }
    ]
  }
];

export default function UsesPage() {
  return (
    <div className="space-y-10 animate-fade-in-up pb-10">
      <div className="border-b border-border/60 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Uses
        </h1>
        <p className="text-sm sm:text-base text-muted mt-2">
          A curated list of the hardware, software, and everyday carry items I use to build things.
        </p>
      </div>

      <div className="space-y-12">
        {uses.map((section, idx) => (
          <section key={idx} className="space-y-6">
            <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
              <section.icon className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-bold text-foreground">{section.category}</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.items.map((item, i) => (
                <li key={i} className="p-4 rounded-xl border border-border/40 bg-background/40 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors shadow-sm">
                  <h3 className="font-bold text-foreground text-sm">{item.name}</h3>
                  <p className="text-sm text-muted mt-1 leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
