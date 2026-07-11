import { Metadata } from "next";
import GravityCanvas from "@/components/sandbox/GravityCanvas";
import { Beaker } from "lucide-react";

export const metadata: Metadata = {
  title: "Sandbox",
  description: "Interactive experiments and micro-apps.",
};

export default function SandboxPage() {
  return (
    <div className="space-y-10 animate-fade-in-up pb-10">
      <div className="border-b border-border/60 pb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-border/50 flex items-center justify-center text-accent shadow-inner">
          <Beaker className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Sandbox
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Micro-apps, interactive widgets, and coding experiments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-foreground">Gravity & Collision Physics</h2>
            <span className="text-[10px] w-fit font-mono text-muted-light font-bold uppercase tracking-widest border border-border/50 rounded-full px-2.5 py-1 bg-background/50">
              HTML5 Canvas API
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            A basic 2D physics engine running entirely in the browser. It features gravity acceleration, floor bounce dampening, and wall friction. Click anywhere inside the box below to spawn bouncy elements.
          </p>
          <GravityCanvas />
        </section>
      </div>
    </div>
  );
}
