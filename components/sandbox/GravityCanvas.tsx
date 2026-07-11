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

    const colors = ["#10b981", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6", "#a855f7"];

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const numBalls = Math.floor(Math.random() * 3) + 3;
      for (let i=0; i<numBalls; i++) {
        ballsRef.current.push({
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

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
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
    <div className="space-y-4">
      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 p-5 sm:p-4 rounded-xl border border-border/50 bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-foreground">Gravity</label>
            <span className="text-[10px] text-muted-light font-mono px-1.5 py-0.5 rounded bg-background border border-border/50">{gravity.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="-1" max="2" step="0.1" 
            value={gravity} onChange={e => setGravity(parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-foreground">Bounce</label>
            <span className="text-[10px] text-muted-light font-mono px-1.5 py-0.5 rounded bg-background border border-border/50">{bounce.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="1.5" step="0.1" 
            value={bounce} onChange={e => setBounce(parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-foreground">Friction</label>
            <span className="text-[10px] text-muted-light font-mono px-1.5 py-0.5 rounded bg-background border border-border/50">{friction.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="1" step="0.05" 
            value={friction} onChange={e => setFriction(parseFloat(e.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="w-full rounded-2xl border border-border/50 overflow-hidden bg-neutral-100/30 dark:bg-neutral-900/30 cursor-pointer relative group">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 group-hover:opacity-0 transition-opacity duration-500">
          <span className="text-sm font-mono text-muted font-bold tracking-widest uppercase">Click to spawn</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); clearCanvas(); }}
          className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 border border-border/50 text-muted hover:text-foreground hover:bg-background transition-all z-10"
          title="Clear Canvas"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <canvas ref={canvasRef} className="block w-full h-[300px]" />
      </div>
    </div>
  );
}
