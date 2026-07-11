"use client";

import { useEffect, useRef } from "react";
import { RotateCcw } from "lucide-react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  radius: number;

  constructor(x: number, y: number, color: string, isRocket: boolean) {
    this.x = x;
    this.y = y;
    this.color = color;
    if (isRocket) {
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = -Math.random() * 4 - 8;
      this.radius = 3;
      this.alpha = 1;
      this.decay = 0.01;
    } else {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.radius = Math.random() * 2 + 1;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
    }
  }

  update(gravity: number) {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

export default function DiwaliFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const rockets = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = 400;
    canvas.width = width;
    canvas.height = height;

    const colors = ["#f97316", "#eab308", "#e11d48", "#10b981", "#0ea5e9", "#d946ef"];

    const createExplosion = (x: number, y: number, color: string) => {
      const count = Math.floor(Math.random() * 50) + 50;
      for (let i = 0; i < count; i++) {
        particles.current.push(new Particle(x, y, color, false));
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const color = colors[Math.floor(Math.random() * colors.length)];
      // Spawn a rocket from the bottom
      rockets.current.push(new Particle(x, height, color, true));
    };

    canvas.addEventListener("click", handleClick);

    let animationFrameId: number;

    const render = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Update rockets
      for (let i = rockets.current.length - 1; i >= 0; i--) {
        const r = rockets.current[i];
        r.update(0.1); // low gravity for rockets
        r.draw(ctx);
        
        // Spawn small trail
        particles.current.push(new Particle(r.x, r.y, "#ffffff", false));
        const lastParticle = particles.current[particles.current.length - 1];
        lastParticle.vx = (Math.random() - 0.5);
        lastParticle.vy = Math.random();
        lastParticle.decay = 0.1;
        lastParticle.radius = 1;

        if (r.vy >= -2 || r.alpha <= 0) { // explode at apex
          createExplosion(r.x, r.y, r.color);
          rockets.current.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update(0.05);
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
        }
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

  const clearCanvas = () => {
    particles.current = [];
    rockets.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="space-y-6">
      <div ref={containerRef} className="w-full rounded-3xl border-4 border-dashed border-indigo-300 dark:border-indigo-800 overflow-hidden bg-[#0a0a0a] cursor-pointer relative group">
        <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500">
          <div className="bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 transform -rotate-2">
            <span className="text-base font-black text-indigo-200 tracking-widest uppercase">Click the sky to launch fireworks!</span>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); clearCanvas(); }}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/30 transition-all z-10 backdrop-blur-sm"
          title="Clear Sky"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <canvas ref={canvasRef} className="block w-full h-[400px]" />
      </div>
    </div>
  );
}
