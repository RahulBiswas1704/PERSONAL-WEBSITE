"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

export default function GravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [gravity, setGravity] = useState(0.6);
  const [bounce, setBounce] = useState(0.7);
  const [friction, setFriction] = useState(0.8);
  
  const physicsRef = useRef({ gravity, bounce, friction });
  
  useEffect(() => {
    physicsRef.current = { gravity, bounce, friction };
  }, [gravity, bounce, friction]);

  const ballsRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }[]>([]);

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

    // Classic Kancha (glass marble) base colors
    const colors = ["#10b981", "#3b82f6", "#ef4444", "#f59e0b", "#06b6d4"];

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const numBalls = Math.floor(Math.random() * 4) + 4; // Scatter more Kanchas
      for (let i=0; i<numBalls; i++) {
        ballsRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20 - 5,
          radius: Math.random() * 10 + 8, // slightly larger, varied sizes
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    canvas.addEventListener("click", handleClick);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const { gravity: g, friction: f, bounce: b } = physicsRef.current;

      for (let i = 0; i < ballsRef.current.length; i++) {
        const ball = ballsRef.current[i];
        
        ball.vy += g;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y + ball.radius > height) {
          ball.y = height - ball.radius;
          ball.vy *= -b;
          ball.vx *= f;
        }
        
        if (ball.x + ball.radius > width) {
          ball.x = width - ball.radius;
          ball.vx *= -b;
        } else if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -b;
        }

        // Draw shiny glass marble (Kancha) effect using radial gradient
        const gradient = ctx.createRadialGradient(
          ball.x - ball.radius * 0.3, 
          ball.y - ball.radius * 0.3, 
          ball.radius * 0.1, 
          ball.x, 
          ball.y, 
          ball.radius
        );
        gradient.addColorStop(0, '#ffffff'); // Shiny highlight
        gradient.addColorStop(0.3, ball.color); // Base color
        gradient.addColorStop(1, '#000000'); // Shadow

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
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

  const clearCanvas = () => {
    ballsRef.current = [];
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 p-5 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/30">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-emerald-900 dark:text-emerald-100">Gravity</label>
            <span className="text-[10px] text-emerald-800 dark:text-emerald-200 font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 font-bold">{gravity.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="-1" max="2" step="0.1" 
            value={gravity} onChange={e => setGravity(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-emerald-900 dark:text-emerald-100">Bounce</label>
            <span className="text-[10px] text-emerald-800 dark:text-emerald-200 font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 font-bold">{bounce.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="1.5" step="0.1" 
            value={bounce} onChange={e => setBounce(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-emerald-900 dark:text-emerald-100">Friction</label>
            <span className="text-[10px] text-emerald-800 dark:text-emerald-200 font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 font-bold">{friction.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={friction} onChange={e => setFriction(parseFloat(e.target.value))}
            className="w-full accent-emerald-500"
          />
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="w-full rounded-3xl border-4 border-dashed border-emerald-300 dark:border-emerald-800 overflow-hidden bg-neutral-100/50 dark:bg-neutral-900/50 cursor-pointer relative group">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500">
          <div className="bg-white/80 dark:bg-black/80 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm border-2 border-emerald-200 dark:border-emerald-900/50 transform -rotate-2">
            <span className="text-base font-black text-emerald-800 dark:text-emerald-200 tracking-widest uppercase">Click to scatter Kanchas!</span>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); clearCanvas(); }}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white dark:bg-black border-2 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 hover:text-white hover:bg-emerald-600 dark:hover:bg-emerald-600 transition-all z-10 shadow-md transform hover:rotate-6 hover:scale-110 font-bold"
          title="Sweep away"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <canvas ref={canvasRef} className="block w-full h-[400px]" />
      </div>
    </div>
  );
}
