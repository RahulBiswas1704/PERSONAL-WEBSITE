import { Terminal, Film, BookOpen } from "lucide-react";

export default function NowDoing() {
  return (
    <div className="animate-fade-in-up h-full">
      <h2 className="text-xl font-black tracking-tight text-amber-950 dark:text-amber-50 mb-4 font-serif border-b-2 border-dashed border-amber-200 dark:border-amber-900/50 pb-2">
        Currently... (Vartaman)
      </h2>
      <div className="flex flex-col gap-4 mt-4">
        
        <div className="flex items-start gap-3 p-3 rounded-xl border-2 border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 transform hover:rotate-1 transition-transform">
          <div className="p-2 bg-rose-200 dark:bg-rose-900 rounded-lg shrink-0">
            <Terminal className="w-4 h-4 text-rose-900 dark:text-rose-100" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-rose-800 dark:text-rose-200 mb-1">Building</h3>
            <p className="text-sm font-medium text-rose-950 dark:text-rose-50 leading-snug">
              A playful, high-performance personal digital garden.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 transform hover:-rotate-1 transition-transform">
          <div className="p-2 bg-blue-200 dark:bg-blue-900 rounded-lg shrink-0">
            <Film className="w-4 h-4 text-blue-900 dark:text-blue-100" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-800 dark:text-blue-200 mb-1">Watching</h3>
            <p className="text-sm font-medium text-blue-950 dark:text-blue-50 leading-snug">
              Good movies, probably Interstellar or a classic thriller.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl border-2 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 transform hover:rotate-1 transition-transform">
          <div className="p-2 bg-emerald-200 dark:bg-emerald-900 rounded-lg shrink-0">
            <BookOpen className="w-4 h-4 text-emerald-900 dark:text-emerald-100" />
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-200 mb-1">Learning</h3>
            <p className="text-sm font-medium text-emerald-950 dark:text-emerald-50 leading-snug">
              Business strategies and diving headfirst into whatever's next.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
