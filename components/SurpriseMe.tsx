"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

const FACTS = [
  "I was born in 2003 and raised in Krishnanagar, West Bengal.",
  "During the 2020 lockdowns, I realized a piece of paper isn't everything and dropped out of my Electrical Engineering diploma to take control of my education.",
  "I've never taken a professional coding course. Everything I know about building software, I learned through the web and YouTube!",
  "At one point, I almost pursued a career as a seafarer because I loved the idea of high pay and traveling the world.",
  "Psst! Click the palette icon in the top right navbar to swap the website accent color. Dynamic CSS variables at work!",
  "By day, I work as a System and Project Manager, building strategic roadmaps and optimizing internal workflows.",
  "I hold a Diploma in Information Technology, which I passed with an impressive 92.5% grade (370 out of 400).",
  "When I'm not writing code or managing projects, you'll probably find me exploring photography, video editing, or graphic design.",
  "I call my digital space an 'Aangan'—a traditional courtyard—because I want it to feel like a welcoming home for my ideas and crafts.",
  "I'm a multilingual problem solver with a deep curiosity for modern technology, always learning things like AI Prompt Engineering.",
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
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-accent text-background hover:bg-accent-hover hover:scale-105 active:scale-95 transition-all duration-150 cursor-pointer touch-manipulation"
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
          ? "Click the button to reveal a random fact about me."
          : FACTS[index]}
      </p>
    </div>
  );
}
