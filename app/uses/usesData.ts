import { Laptop, Terminal, Cpu, PenTool } from "lucide-react";

export const uses = [
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
