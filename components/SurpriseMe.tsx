"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const FACTS = [
  "I once debugged a Supabase batch routing query while coordinating the preparation of 200 hot meals in our bowlit kitchen. Peak developer multitasking.",
  "Subcontractor retention is 10% of every bill. Tiffin subscription delivery is 100% of your daily hunger. Both require perfect schedule modeling.",
  "Psst! Click the colored circles in the top right navbar to swap the website accent color. Dynamic CSS variables at work!",
  "Currently pursuing my MBA. If I calculated the Weighted Average Cost of Capital (WACC) of my Postgres instances, Next.js efficiency would top the charts.",
  "Our tiffin service bowlit routes driver shipments geographically using a custom batching algorithm. We basically solved the Traveling Salesperson Problem... with curry.",
];

export default function SurpriseMe() {
  const [index, setIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);

  const showRandomFact = () => {
    setSpinning(true);
    // Cycle to a new random fact that is different from the current one
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * FACTS.length);
    } while (nextIndex === index);

    setIndex(nextIndex);
    
    // Reset spinning animation after 500ms
    setTimeout(() => {
      setSpinning(false);
    }, 500);
  };

  return (
    <div className="border border-dashed border-border rounded-md p-5 bg-neutral-50/30 dark:bg-neutral-900/10 space-y-3 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold font-mono tracking-tight text-muted">
          Interactive Sandbox
        </span>
        <button
          onClick={showRandomFact}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-accent text-background hover:bg-accent-hover hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          <Sparkles
            className={`w-3.5 h-3.5 ${spinning ? "animate-spin" : ""}`}
            style={{ animationDuration: "500ms" }}
          />
          Surprise Me!
        </button>
      </div>
      
      <p className="text-sm text-muted dark:text-neutral-300 leading-relaxed min-h-[3rem] flex items-center">
        {index === null
          ? "Click the button to reveal a random project anecdote or secret tip."
          : FACTS[index]}
      </p>
    </div>
  );
}
