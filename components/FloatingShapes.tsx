"use client";

import { useEffect, useRef } from "react";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop where mousemove makes sense
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const shapes = containerRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape, i) => {
        // Different speed for different depths
        const speed = (i + 1) * 15;
        const xOffset = (window.innerWidth / 2 - e.clientX) * speed / 1000;
        const yOffset = (window.innerHeight / 2 - e.clientY) * speed / 1000;
        // Apply rotation as well for extra flair
        (shape as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${xOffset * 0.5}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 dark:opacity-20 hidden md:block">
      {/* Circle */}
      <div className="parallax-shape absolute top-24 right-[15%] w-24 h-24 rounded-full border-4 border-accent/40 transition-transform duration-75 ease-out" />
      
      {/* Square */}
      <div className="parallax-shape absolute top-48 left-[10%] w-16 h-16 rounded-xl border-4 border-rose-500/40 transition-transform duration-75 ease-out" />
      
      {/* Triangle */}
      <div className="parallax-shape absolute bottom-32 right-[25%] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[45px] border-b-blue-500/40 transition-transform duration-75 ease-out opacity-70" />

      {/* Tiny Dot */}
      <div className="parallax-shape absolute bottom-20 left-[20%] w-6 h-6 rounded-full bg-emerald-500/30 transition-transform duration-75 ease-out" />
    </div>
  );
}
