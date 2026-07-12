"use client";

import { useEffect, useRef } from "react";

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    const isMobile = window.matchMedia("(hover: none)").matches;

    let requestRef: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    // Smoother easing
    const ease = 0.04;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      targetX = window.innerWidth / 2 - e.clientX;
      targetY = window.innerHeight / 2 - e.clientY;
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!isMobile) return;
      // beta is front-to-back tilt [-180, 180]
      // gamma is left-to-right tilt [-90, 90]
      if (e.gamma !== null && e.beta !== null) {
        // Multiply for stronger effect
        targetX = e.gamma * 20; 
        targetY = (e.beta - 45) * 20; // Assume 45 degrees is neutral holding angle
      }
    };

    const animate = () => {
      if (!containerRef.current) return;
      
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      const shapes = containerRef.current.querySelectorAll('.parallax-shape');
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 15;
        const xOffset = currentX * speed / 1000;
        const yOffset = currentY * speed / 1000;
        const rotation = currentX * (i + 1) * 0.03;
        
        (shape as HTMLElement).style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rotation}deg)`;
      });

      requestRef = requestAnimationFrame(animate);
    };

    if (isMobile) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    requestRef = requestAnimationFrame(animate);
    
    return () => {
      if (isMobile) {
        window.removeEventListener("deviceorientation", handleDeviceOrientation);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 md:opacity-40 dark:opacity-20">
      {/* Circle */}
      <div className="parallax-shape absolute top-[15%] right-[12%] w-32 h-32 rounded-full border-[6px] border-accent/40 opacity-70" />
      
      {/* Square */}
      <div className="parallax-shape absolute top-[40%] left-[8%] w-20 h-20 rounded-2xl border-4 border-rose-500/40 opacity-60" />
      
      {/* Triangle */}
      <div className="parallax-shape absolute bottom-[25%] right-[20%] w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[60px] border-b-blue-500/40 opacity-70" />

      {/* Tiny Dot */}
      <div className="parallax-shape absolute bottom-[15%] left-[18%] w-8 h-8 rounded-full bg-emerald-500/40 opacity-80" />
      
      {/* Extra Floating Line */}
      <div className="parallax-shape absolute top-[25%] left-[25%] w-24 h-2 rounded-full bg-purple-500/30 opacity-60 transform -rotate-45" />
    </div>
  );
}
