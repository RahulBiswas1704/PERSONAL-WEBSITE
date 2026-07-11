import { Metadata } from "next";
import { Laptop, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "Uses",
  description: "Hardware, software, and gear I use daily.",
};

const uses = [
  {
    category: "Hardware",
    icon: Laptop,
    items: [
      { name: "ASUS TUF Gaming A15", desc: "My primary workhorse for development and heavy lifting." },
      { name: "OnePlus 13R", desc: "My daily driver for mobile testing and staying connected." },
    ]
  },
  {
    category: "Software & Editor",
    icon: Terminal,
    items: [
      { name: "VS Code", desc: "My editor of choice for writing code." },
      { name: "Vercel", desc: "Where all my frontend projects are deployed and hosted." },
      { name: "Supabase", desc: "My go-to backend-as-a-service and PostgreSQL database." },
      { name: "GitHub", desc: "For version control and open source contributions." },
      { name: "Figma", desc: "For UI mockups and design brainstorming." },
      { name: "Notion", desc: "Where I organize my life and project ideas." },
      { name: "Slack", desc: "For team communication and community channels." }
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
