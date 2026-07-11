"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

export default function RangoliMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#00ffff"); // Neon Cyan
  const [symmetry, setSymmetry] = useState(8);
  const [brushSize, setBrushSize] = useState(2);

  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = 350;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const currentPos = getPos(e);
    if (!lastPos.current) {
      lastPos.current = currentPos;
      return;
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    
    // Neon glow effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;

    for (let i = 0; i < symmetry; i++) {
      const angle = (Math.PI * 2 * i) / symmetry;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(lastPos.current.x - cx, lastPos.current.y - cy);
      ctx.lineTo(currentPos.x - cx, currentPos.y - cy);
      ctx.stroke();

      // Mirror reflection for true mandala effect
      ctx.scale(-1, 1);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x - cx, lastPos.current.y - cy);
      ctx.lineTo(currentPos.x - cx, currentPos.y - cy);
      ctx.stroke();

      ctx.restore();
    }

    lastPos.current = currentPos;
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    lastPos.current = getPos(e);
    // @ts-ignore
    e.target.setPointerCapture(e.pointerId);
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    lastPos.current = null;
    // @ts-ignore
    e.target.releasePointerCapture(e.pointerId);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const colors = [
    { name: "Neon Cyan", hex: "#00ffff" },
    { name: "Electric Pink", hex: "#ff00ff" },
    { name: "Toxic Green", hex: "#39ff14" },
    { name: "Laser Yellow", hex: "#ffea00" },
    { name: "Plasma Purple", hex: "#9d00ff" },
    { name: "Pure White", hex: "#ffffff" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl border-2 border-orange-200 dark:border-orange-900/50 bg-orange-50/50 dark:bg-orange-950/30">
        
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-orange-900 dark:text-orange-100">Neon Inks</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c.hex ? 'scale-125 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10' : 'border-transparent hover:scale-110'}`}
                style={{ backgroundColor: c.hex, boxShadow: color === c.hex ? `0 0 15px ${c.hex}` : `0 0 5px ${c.hex}80` }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-orange-900 dark:text-orange-100">Symmetry</label>
            <span className="text-[10px] text-orange-800 dark:text-orange-200 font-mono px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900 border border-orange-300 dark:border-orange-700 font-bold">{symmetry}</span>
          </div>
          <input 
            type="range" min="4" max="16" step="2" 
            value={symmetry} onChange={e => setSymmetry(parseInt(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      </div>

      <div ref={containerRef} className="w-full rounded-3xl border-4 border-dashed border-orange-300 dark:border-orange-800 overflow-hidden bg-[#050505] cursor-crosshair relative group shadow-inner">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-0 transition-opacity duration-500">
          <div className="bg-white/10 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg transform rotate-1">
            <span className="text-sm font-black text-orange-200 tracking-widest uppercase">Draw with Neon!</span>
          </div>
        </div>
        <button 
          onClick={clearCanvas}
          className="absolute top-4 right-4 p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all z-10 shadow-md transform hover:rotate-6 hover:scale-110 font-bold"
          title="Wipe Clean"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <canvas 
          ref={canvasRef} 
          className="block w-full touch-none"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerOut={stopDrawing}
        />
      </div>
    </div>
  );
}
