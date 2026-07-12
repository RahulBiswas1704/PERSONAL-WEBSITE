"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { hapticPop, hapticTick } from "@/lib/haptics";

export default function PullToRefreshEgg() {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track pull distance
  const pullY = useMotionValue(0);
  const controls = useAnimation();
  
  useEffect(() => {
    // Only run on touch devices
    if (typeof window === "undefined" || window.matchMedia("(hover: hover)").matches) return;
    
    let startY = 0;
    let isPulling = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      // Only start pulling if we are at the very top of the page
      if (window.scrollY <= 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return;
      
      const currentY = e.touches[0].clientY;
      const dy = currentY - startY;
      
      // If pulling down
      if (dy > 0 && window.scrollY <= 0) {
        // Add resistance (divide by 2)
        pullY.set(dy / 2);
        
        if (dy > 100 && !isRevealed) {
          hapticTick();
        }
        
        if (dy > 200 && !isRevealed) {
          setIsRevealed(true);
          hapticPop();
        }
        
        // Prevent default scroll behavior while pulling the easter egg
        if (e.cancelable) {
          e.preventDefault();
        }
      }
    };
    
    const handleTouchEnd = () => {
      if (isPulling) {
        isPulling = false;
        
        // Snap back
        controls.start({
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 }
        });
        
        pullY.set(0);
        
        // Reset reveal state after a bit
        if (isRevealed) {
          setTimeout(() => setIsRevealed(false), 2000);
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [controls, isRevealed, pullY]);


  return (
    <div className="fixed top-0 left-0 w-full flex justify-center items-start pt-6 pointer-events-none z-50 overflow-visible" ref={containerRef}>
      <motion.div 
        className="bg-black text-white dark:bg-white dark:text-black font-mono text-xs px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2"
        animate={controls}
        style={{ 
          y: pullY,
          opacity: isRevealed ? 1 : 0,
          scale: isRevealed ? 1 : 0.5,
          marginTop: -60 // Start hidden offscreen
        }}
      >
        <span>Stop pulling me, you&apos;ll break the layout!</span>
      </motion.div>
    </div>
  );
}
