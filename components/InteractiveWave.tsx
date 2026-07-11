"use client";

import confetti from "canvas-confetti";

export default function InteractiveWave() {
  const handleClick = () => {
    const duration = 1.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      // Confetti from bottom left and right
      confetti({
        ...defaults, particleCount,
        origin: { x: 0.1, y: 0.8 },
        colors: ['#e11d48', '#34d399', '#3b82f6', '#f59e0b', '#8b5cf6']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: 0.9, y: 0.8 },
        colors: ['#e11d48', '#34d399', '#3b82f6', '#f59e0b', '#8b5cf6']
      });
    }, 250);
  };

  return (
    <span 
      onClick={handleClick}
      className="inline-block cursor-pointer hover:scale-125 hover:rotate-12 transition-all active:scale-95 duration-200"
      title="High Five!"
    >
      👋
    </span>
  );
}
