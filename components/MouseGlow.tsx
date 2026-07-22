"use client";

import { useEffect, useState, useRef } from "react";

export default function MouseGlow() {
  const [isMounted, setIsMounted] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    let rafId: number;
    let targetX = 0;
    let targetY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mouse-x", `${targetX}px`);
          document.documentElement.style.setProperty("--mouse-y", `${targetY}px`);
          
          if (glowRef.current) {
            glowRef.current.style.background = `radial-gradient(600px circle at ${targetX}px ${targetY}px, var(--accent), transparent 25%)`;
          }
          
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-300 hidden sm:block"
      style={{ opacity: 0.06 }}
    />
  );
}
