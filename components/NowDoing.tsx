import { Terminal, Film, BookOpen } from "lucide-react";

export default function NowDoing() {
  return (
    <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
      <h2 className="text-lg font-bold tracking-tight text-foreground mb-4 border-b border-border/60 pb-2">
        Currently...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-background/40 backdrop-blur-sm hover-lift group">
          <div className="flex items-center gap-2 text-muted-light mb-1">
            <Terminal className="w-4 h-4 group-hover:text-accent transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Building</span>
          </div>
          <p className="text-sm font-medium text-foreground leading-snug">
            A playful, high-performance personal digital garden.
          </p>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-background/40 backdrop-blur-sm hover-lift group">
          <div className="flex items-center gap-2 text-muted-light mb-1">
            <Film className="w-4 h-4 group-hover:text-accent transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Watching</span>
          </div>
          <p className="text-sm font-medium text-foreground leading-snug">
            Good movies, probably Interstellar or a classic thriller.
          </p>
        </div>

        <div className="flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-background/40 backdrop-blur-sm hover-lift group">
          <div className="flex items-center gap-2 text-muted-light mb-1">
            <BookOpen className="w-4 h-4 group-hover:text-accent transition-colors" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Learning</span>
          </div>
          <p className="text-sm font-medium text-foreground leading-snug">
            Business strategies and diving headfirst into whatever's next.
          </p>
        </div>
      </div>
    </div>
  );
}
