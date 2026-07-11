"use client";

import { useEffect, useRef, useState } from "react";
import { Wind } from "lucide-react";

export default function KiteFlyer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windForce, setWindForce] = useState(2);
  
  const kiteRef = useRef({
    x: 200,
    y: 100,
    vx: 0,
    vy: 0,
    angle: 0,
    targetX: 200,
    targetY: 100
  });

  const tailRef = useRef(Array(10).fill(0).map(() => ({ x: 200, y: 100 })));
  
  // Perlin noise substitute
  const timeRef = useRef(0);

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

    kiteRef.current.x = width / 2;
    kiteRef.current.targetX = width / 2;
    kiteRef.current.targetY = 100;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      kiteRef.current.targetX = e.clientX - rect.left;
      kiteRef.current.targetY = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      kiteRef.current.targetX = width / 2;
      kiteRef.current.targetY = 100;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      timeRef.current += 0.05;
      
      const kite = kiteRef.current;
      
      // Wind effect
      const windX = Math.sin(timeRef.current) * windForce * 0.5 + Math.cos(timeRef.current * 0.7) * windForce * 0.2;
      const windY = -Math.abs(Math.sin(timeRef.current * 0.5)) * windForce * 0.3;
      
      // Spring to target
      const dx = kite.targetX - kite.x;
      const dy = kite.targetY - kite.y;
      
      const ax = dx * 0.02 + windX;
      const ay = dy * 0.02 + windY - 0.5; // slight upward lift
      
      kite.vx += ax;
      kite.vy += ay;
      
      kite.vx *= 0.85; // friction
      kite.vy *= 0.85;
      
      kite.x += kite.vx;
      kite.y += kite.vy;
      
      // Calculate tilt angle based on velocity
      kite.angle = kite.vx * 0.05;

      // Draw Thread
      ctx.beginPath();
      ctx.moveTo(width / 2, height);
      // Curve control point
      const cpX = (width / 2 + kite.x) / 2 + windX * 10;
      const cpY = (height + kite.y) / 2;
      ctx.quadraticCurveTo(cpX, cpY, kite.x, kite.y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Update and draw Tail (Inverse Kinematics)
      const tailNodes = tailRef.current;
      let prevX = kite.x;
      let prevY = kite.y + 20; // attach to bottom of kite
      
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      
      for (let i = 0; i < tailNodes.length; i++) {
        const node = tailNodes[i];
        
        // Follow target
        const tdx = prevX - node.x;
        const tdy = prevY - node.y;
        const dist = Math.sqrt(tdx * tdx + tdy * tdy);
        
        if (dist > 8) { // distance constraint
          node.x += tdx * 0.4;
          node.y += tdy * 0.4;
        }
        
        // Wind affects tail
        node.x += windX * 0.5 * (i / tailNodes.length);
        node.y += 1; // gravity on tail
        
        ctx.lineTo(node.x, node.y);
        prevX = node.x;
        prevY = node.y;
      }
      ctx.strokeStyle = "#eab308"; // Yellow tail
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw Kite (Diamond)
      ctx.save();
      ctx.translate(kite.x, kite.y);
      ctx.rotate(kite.angle);
      
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(20, 0);
      ctx.lineTo(0, 25);
      ctx.lineTo(-20, 0);
      ctx.closePath();
      
      ctx.fillStyle = "#ef4444"; // Red kite
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw cross sticks
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(0, 25);
      ctx.moveTo(-20, 0);
      ctx.lineTo(20, 0);
      ctx.strokeStyle = "rgba(255,255,255,0.5)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      canvas.width = width;
      kiteRef.current.targetX = width / 2;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [windForce]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border-2 border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/30 items-center justify-between">
        
        <div className="flex items-center gap-3 w-full sm:w-1/2">
          <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <div className="flex-grow space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-black uppercase tracking-widest text-sky-900 dark:text-sky-100">Wind Speed</label>
              <span className="text-[10px] text-sky-800 dark:text-sky-200 font-mono px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900 border border-sky-300 dark:border-sky-700 font-bold">{windForce}</span>
            </div>
            <input 
              type="range" min="1" max="15" step="1" 
              value={windForce} onChange={e => setWindForce(parseInt(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>
        </div>
        
        <div className="text-xs font-bold text-sky-800 dark:text-sky-200 uppercase tracking-widest bg-sky-100 dark:bg-sky-900 px-4 py-2 rounded-xl border border-sky-300 dark:border-sky-700">
          Makar Sankranti
        </div>

      </div>

      <div ref={containerRef} className="w-full rounded-3xl border-4 border-dashed border-sky-300 dark:border-sky-800 overflow-hidden bg-gradient-to-b from-sky-300 to-sky-100 dark:from-sky-900 dark:to-slate-900 cursor-crosshair relative group shadow-inner">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-500">
          <div className="bg-white/80 dark:bg-black/80 px-6 py-3 rounded-full shadow-lg backdrop-blur-sm border-2 border-sky-200 dark:border-sky-900/50 transform -rotate-2">
            <span className="text-sm font-black text-sky-800 dark:text-sky-200 tracking-widest uppercase">Guide the Patang!</span>
          </div>
        </div>
        <canvas 
          ref={canvasRef} 
          className="block w-full touch-none"
        />
      </div>
    </div>
  );
}
