"use client";

import { useEffect, useRef } from "react";

export default function GravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = 300;
    canvas.width = width;
    canvas.height = height;

    const balls: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    // Matching the beautiful accent colors of the site
    const colors = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6", "#a855f7"];

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Spawn 3-5 balls per click for more fun
      const numBalls = Math.floor(Math.random() * 3) + 3;
      for (let i=0; i<numBalls; i++) {
        balls.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20 - 5,
          radius: Math.random() * 12 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    canvas.addEventListener("click", handleClick);

    let animationFrameId: number;

    const render = () => {
      // Create a slight trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      // We want the trail to match theme, but canvas doesn't know theme easily. 
      // We'll just clear rect for crisp rendering instead of trailing to avoid dark mode conflicts
      ctx.clearRect(0, 0, width, height);
      
      const gravity = 0.6;
      const friction = 0.8;
      const bounce = 0.7;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        
        b.vy += gravity;
        b.x += b.vx;
        b.y += b.vy;

        // Floor collision
        if (b.y + b.radius > height) {
          b.y = height - b.radius;
          b.vy *= -bounce;
          b.vx *= friction;
        }
        
        // Wall collisions
        if (b.x + b.radius > width) {
          b.x = width - b.radius;
          b.vx *= -bounce;
        } else if (b.x - b.radius < 0) {
          b.x = b.radius;
          b.vx *= -bounce;
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.closePath();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      canvas.width = width;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full rounded-2xl border border-border/50 overflow-hidden bg-neutral-100/30 dark:bg-neutral-900/30 cursor-pointer relative group">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-0 transition-opacity duration-500">
        <span className="text-sm font-mono text-muted font-bold tracking-widest uppercase">Click to spawn</span>
      </div>
      <canvas ref={canvasRef} className="block w-full h-[300px]" />
    </div>
  );
}
