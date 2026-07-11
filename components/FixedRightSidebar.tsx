"use client";

import { useEffect, useState } from "react";
import { Map } from "lucide-react";

export default function FixedRightSidebar() {
  const [activeSection, setActiveSection] = useState("intro");

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "sandbox", label: "Sandbox" },
    { id: "articles", label: "Articles" },
    { id: "connect", label: "Connect" },
  ];

  useEffect(() => {
    // We only observe on client side
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" } 
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="hidden xl:flex fixed right-0 top-0 bottom-0 w-[280px] p-8 flex-col justify-center items-end pointer-events-none z-40">
      <div className="pointer-events-auto space-y-6 group">
        <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-muted uppercase tracking-widest font-bold px-2 group-hover:text-muted-light transition-colors">
          <span>Page Map</span>
          <Map className="w-3.5 h-3.5 text-accent" />
        </div>
        
        <div className="relative pr-4 flex flex-col items-end">
          {/* Vertical Track on the right */}
          <div className="absolute right-[5px] top-1.5 bottom-1.5 w-px bg-border/40 group-hover:bg-border/80 transition-colors" />
          
          <nav className="flex flex-col gap-6 items-end relative z-10">
            {sections.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`group/btn relative flex items-center justify-end text-right transition-all duration-300 ${
                    isActive ? "text-accent font-bold scale-105" : "text-muted hover:text-foreground"
                  }`}
                  aria-label={`Scroll to ${label}`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest pr-4">{label}</span>
                  
                  {/* Indicator Dot on the right */}
                  <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-500 ease-out ${
                    isActive 
                      ? "bg-accent scale-150 ring-4 ring-accent/20 shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" 
                      : "bg-border/80 group-hover/btn:bg-muted-light group-hover/btn:scale-110"
                  }`} />
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}
