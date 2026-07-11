"use client";

import React from "react";
import MagneticButton from "@/components/MagneticButton";

interface SocialItem {
  name: string;
  handle: string;
  url: string;
  colorClass: string;
  icon: React.ReactNode;
}

const socials: SocialItem[] = [
  {
    name: "GitHub",
    handle: "RahulBiswas1704",
    url: "https://github.com/RahulBiswas1704",
    colorClass: "hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "rahul-biswas1704",
    url: "https://www.linkedin.com/in/rahul-biswas1704/",
    colorClass: "hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    handle: "@rahulbiswas1704",
    url: "https://x.com/rahulbiswas1704",
    colorClass: "hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@rahul.biswas1704",
    url: "https://www.instagram.com/rahul.biswas1704/",
    colorClass: "hover:border-pink-500 hover:text-pink-500 dark:hover:text-pink-400",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "rahul.biswas1704",
    url: "https://www.facebook.com/rahul.biswas1704/",
    colorClass: "hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "rahul_1704",
    url: "https://discord.com/users/834827052959825940", // Custom placeholder redirect or profile link
    colorClass: "hover:border-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-400",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 127.14 96.36" fill="currentColor">
        <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,69.43,69.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2a75.58,75.58,0,0,0,73,0c.81.71,1.68,1.4,2.58,2a69.66,69.66,0,0,1-10.5,5,77.89,77.89,0,0,0,6.63,10.85,105.73,105.73,0,0,0,32.61-18.83C129.24,48.72,123.33,25.94,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.9,46,53.9,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.14,46,96.14,53,91,65.69,84.69,65.69Z"/>
      </svg>
    ),
  },
  {
    name: "Reddit",
    handle: "u/Rahul_1704",
    url: "https://www.reddit.com/u/Rahul_1704",
    colorClass: "hover:border-orange-500 hover:text-orange-500 dark:hover:text-orange-400",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    name: "Threads",
    handle: "@rahul.biswas1704",
    url: "https://www.threads.net/@rahul.biswas1704",
    colorClass: "hover:border-zinc-800 dark:hover:border-zinc-200 hover:text-zinc-800 dark:hover:text-zinc-200",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 8a4 4 0 1 0 4 4" />
        <path d="M12 12c1 0 2 -1 2 -2s-1 -2 -2 -2" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: "rahul.biswas1704@gmail.com",
    url: "mailto:rahul.biswas1704@gmail.com",
    colorClass: "hover:border-accent hover:text-accent",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function SocialGrid() {
  const trackClick = (platform: string, url: string) => {
    fetch('/api/analytics/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, url }),
    }).catch(console.error);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
      {socials.map((social) => (
        <MagneticButton key={social.name} className="w-full">
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick(social.name, social.url)}
            className={`flex items-center gap-3.5 p-4 border border-border rounded-md bg-background/50 hover-lift ${social.colorClass} group transition-all duration-200`}
          >
            <div className="flex-shrink-0 text-muted-light dark:text-neutral-500 group-hover:text-inherit transition-colors duration-200">
              {social.icon}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-foreground block tracking-tight">
                {social.name}
              </span>
              <span className="text-[11px] text-muted-light dark:text-neutral-500 block truncate font-mono">
                {social.handle}
              </span>
            </div>
          </a>
        </MagneticButton>
      ))}
    </div>
  );
}
