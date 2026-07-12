"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { hapticTick, hapticPop } from "@/lib/haptics";
import { Code, Flame, Server, Smartphone, Monitor } from "lucide-react";

// The items to swipe through
const DECK = [
  { id: 1, name: "React", description: "UI Library", icon: Code, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: 2, name: "Tailwind", description: "CSS Framework", icon: Flame, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { id: 3, name: "Next.js", description: "React Framework", icon: Server, color: "text-neutral-900 dark:text-neutral-100", bg: "bg-neutral-500/10" },
  { id: 4, name: "React Native", description: "Mobile Apps", icon: Smartphone, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: 5, name: "TypeScript", description: "Type Safety", icon: Monitor, color: "text-blue-600", bg: "bg-blue-600/10" },
];

export default function SwipeDeck() {
  const [cards, setCards] = useState(DECK);
  const [liked, setLiked] = useState<string[]>([]);
  const [disliked, setDisliked] = useState<string[]>([]);
  
  // Motion values for the active card
  const x = useMotionValue(0);
  // Transform x to rotation and opacity for the "Like/Nope" stamps
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacityLike = useTransform(x, [50, 150], [0, 1]);
  const opacityNope = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100; // Pixels to trigger a swipe
    if (info.offset.x > threshold) {
      handleSwipe("right");
    } else if (info.offset.x < -threshold) {
      handleSwipe("left");
    }
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (cards.length === 0) return;
    
    hapticPop(); // Haptic feedback on successful swipe
    const currentCard = cards[0];
    
    if (direction === "right") {
      setLiked([...liked, currentCard.name]);
    } else {
      setDisliked([...disliked, currentCard.name]);
    }
    
    // Remove top card
    setCards((prev) => prev.slice(1));
    // Reset motion value
    x.set(0);
  };

  if (cards.length === 0) {
    return (
      <div className="w-full max-w-sm mx-auto h-96 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-3xl p-8 text-center bg-card">
        <h3 className="text-2xl font-black mb-2">Deck Empty!</h3>
        <p className="text-muted-foreground text-sm mb-6">You&apos;ve judged them all.</p>
        <div className="flex justify-center gap-8 w-full">
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl font-black text-green-500">{liked.length}</span>
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Liked</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl font-black text-red-500">{disliked.length}</span>
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Noped</span>
          </div>
        </div>
        <button 
          onClick={() => {
            setCards(DECK);
            setLiked([]);
            setDisliked([]);
            hapticTick();
          }}
          className="mt-8 px-6 py-2 bg-accent text-white font-bold rounded-full text-sm hover:scale-105 active:scale-95 transition-transform"
        >
          Reset Deck
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto h-96 relative flex items-center justify-center select-none perspective-1000">
      <AnimatePresence>
        {cards.map((card, index) => {
          const isTop = index === 0;
          const Icon = card.icon;
          
          return (
            <motion.div
              key={card.id}
              style={{
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                zIndex: cards.length - index,
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={isTop ? handleDragEnd : undefined}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ 
                scale: 1 - index * 0.05, 
                y: index * 15, 
                opacity: 1 - index * 0.2 
              }}
              exit={{ 
                x: x.get() > 0 ? 300 : -300, 
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 } 
              }}
              className="absolute w-full h-full bg-card rounded-3xl border border-border shadow-xl overflow-hidden cursor-grab active:cursor-grabbing flex flex-col justify-between"
            >
              {/* Nope Stamp (Left Swipe) */}
              {isTop && (
                <motion.div 
                  style={{ opacity: opacityNope }} 
                  className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-black text-3xl px-4 py-2 rounded-xl transform rotate-12 z-20 pointer-events-none"
                >
                  NOPE
                </motion.div>
              )}
              
              {/* Like Stamp (Right Swipe) */}
              {isTop && (
                <motion.div 
                  style={{ opacity: opacityLike }} 
                  className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-black text-3xl px-4 py-2 rounded-xl transform -rotate-12 z-20 pointer-events-none"
                >
                  LIKE
                </motion.div>
              )}

              <div className={`w-full h-3/5 ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-32 h-32 ${card.color}`} />
              </div>
              
              <div className="p-6 h-2/5 flex flex-col justify-center">
                <h3 className="text-3xl font-black tracking-tight">{card.name}</h3>
                <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">{card.description}</p>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <div className="absolute -bottom-16 w-full flex justify-center gap-6">
        <button 
          onClick={() => {
            x.set(-200);
            setTimeout(() => handleSwipe("left"), 50);
          }}
          className="w-12 h-12 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-red-500 hover:bg-red-500/10 transition-colors"
        >
          ✕
        </button>
        <button 
          onClick={() => {
            x.set(200);
            setTimeout(() => handleSwipe("right"), 50);
          }}
          className="w-12 h-12 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-green-500 hover:bg-green-500/10 transition-colors"
        >
          ♥
        </button>
      </div>
    </div>
  );
}
