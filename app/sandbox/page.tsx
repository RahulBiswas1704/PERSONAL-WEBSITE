import { Metadata } from "next";
import RangoliMaker from "@/components/sandbox/RangoliMaker";
import DiwaliFireworks from "@/components/sandbox/DiwaliFireworks";
import KiteFlyer from "@/components/sandbox/KiteFlyer";

export const metadata: Metadata = {
  title: "Sandbox",
  description: "Interactive experiments and micro-apps.",
};

export default function SandboxPage() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16">
      {/* Title block */}
      <div className="relative pt-8 pb-10 mb-8 border-b-2 border-dashed border-border/60">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-amber-950 dark:text-amber-50 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 w-fit">
          SANDBOX.
        </h1>
        
        <div className="absolute top-16 sm:top-20 left-48 sm:left-72 transform rotate-3 bg-accent text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:rotate-6 transition-transform duration-300 z-20">
          Playground
        </div>
        
        <p className="text-lg sm:text-xl text-amber-900 dark:text-amber-100 mt-8 max-w-xl relative z-10 font-serif italic leading-relaxed">
          &quot;Micro-apps, interactive widgets, and experiments—now with an Indian twist.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 relative z-10">
        
        {/* Component 1: Rangoli Maker */}
        <section className="relative transform rotate-1 hover:rotate-0 transition-all duration-500 bg-orange-50 dark:bg-orange-950/20 border-2 border-orange-200 dark:border-orange-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md">
          <div className="absolute -top-3 right-10 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm rotate-2 shadow-sm" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-black text-orange-950 dark:text-orange-50 font-serif">Rangoli Art Studio</h2>
            <span className="text-xs font-mono text-orange-900 dark:text-orange-100 font-bold uppercase tracking-widest border-2 border-orange-300 dark:border-orange-700 rounded-full px-3 py-1 bg-white/50 dark:bg-black/30 transform -rotate-2">
              Radial Symmetry
            </span>
          </div>
          <p className="text-base text-orange-900 dark:text-orange-100 leading-relaxed font-medium mb-6">
            Draw intricate, perfectly symmetrical Indian Rangoli (Mandala) patterns instantly. Choose a neon color, adjust the symmetry, and drag across the canvas to create glowing art!
          </p>
          <div className="bg-white dark:bg-black p-4 rounded-2xl border-2 border-orange-200 dark:border-orange-900/50">
            <RangoliMaker />
          </div>
        </section>

        {/* Component 2: Kite Flyer */}
        <section className="relative transform -rotate-1 hover:rotate-0 transition-all duration-500 bg-sky-50 dark:bg-sky-950/20 border-2 border-sky-200 dark:border-sky-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-1 shadow-sm" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-black text-sky-950 dark:text-sky-50 font-serif">Patang (Kite) Simulator</h2>
            <span className="text-xs font-mono text-sky-900 dark:text-sky-100 font-bold uppercase tracking-widest border-2 border-sky-300 dark:border-sky-700 rounded-full px-3 py-1 bg-white/50 dark:bg-black/30 transform rotate-1">
              Spring Physics
            </span>
          </div>
          <p className="text-base text-sky-900 dark:text-sky-100 leading-relaxed font-medium mb-6">
            Relive Makar Sankranti! Guide your Patang across the sky using your mouse. Adjust the wind speed to see how the kite bobs and drifts through the air with fluid spring physics.
          </p>
          <div className="bg-white dark:bg-black p-4 rounded-2xl border-2 border-sky-200 dark:border-sky-900/50">
            <KiteFlyer />
          </div>
        </section>

        {/* Component 3: Diwali Fireworks */}
        <section className="relative transform rotate-1 hover:rotate-0 transition-all duration-500 bg-indigo-50 dark:bg-indigo-950/20 border-2 border-indigo-200 dark:border-indigo-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md">
          <div className="absolute -top-3 left-10 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-3 shadow-sm" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-black text-indigo-950 dark:text-indigo-50 font-serif">Diwali Fireworks</h2>
            <span className="text-xs font-mono text-indigo-900 dark:text-indigo-100 font-bold uppercase tracking-widest border-2 border-indigo-300 dark:border-indigo-700 rounded-full px-3 py-1 bg-white/50 dark:bg-black/30 transform rotate-2">
              Particle Physics
            </span>
          </div>
          <p className="text-base text-indigo-900 dark:text-indigo-100 leading-relaxed font-medium mb-6">
            Celebrate the Festival of Lights! A relaxing physics simulation where you can click on the night sky to launch vibrant, trailing fireworks that burst into beautiful colors.
          </p>
          <div className="bg-white dark:bg-black p-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/50">
            <DiwaliFireworks />
          </div>
        </section>

      </div>
    </div>
  );
}
