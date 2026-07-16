import { Terminal, Film, BookOpen } from "lucide-react";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

export default function NowDoing() {
  const { theme } = useStructuralTheme();

  const getContainerClass = () => {
    if (theme === "minimal") return "animate-fade-in-up h-full";
    if (theme === "brutal") return "h-full";
    if (theme === "retro") return "h-full font-mono";
    if (theme === "pixel") return "h-full font-pixel";
    return "animate-fade-in-up h-full";
  };

  const getHeaderClass = () => {
    if (theme === "minimal") return "text-sm font-semibold tracking-widest uppercase text-neutral-400 mb-6";
    if (theme === "brutal") return "text-2xl font-black uppercase tracking-tighter text-black border-b-4 border-black pb-2 mb-6";
    if (theme === "retro") return "text-xl font-bold uppercase tracking-widest text-[#4a3b2c] dark:text-green-500 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-2 mb-6";
    if (theme === "pixel") return "text-lg uppercase text-[#0f380f] dark:text-[#9bbc0f] border-b-4 border-current pb-2 mb-6";
    return "text-xl font-black tracking-tight text-amber-950 dark:text-amber-50 mb-4 font-serif border-b-2 border-dashed border-amber-200 dark:border-amber-900/50 pb-2";
  };

  const getItemClass = (type: "build" | "watch" | "learn") => {
    if (theme === "minimal") return "flex items-start gap-4 py-4 border-b border-neutral-100 dark:border-neutral-900 last:border-0 group";
    if (theme === "brutal") return "flex items-start gap-4 p-4 border-4 border-black bg-white brutal-shadow mb-4 hover:-translate-y-1 transition-transform";
    if (theme === "retro") return "flex items-start gap-4 p-4 border-4 border-[#4a3b2c] dark:border-green-500 bg-white/50 dark:bg-black mb-4 hover:bg-[#4a3b2c]/10 dark:hover:bg-green-950 transition-colors shadow-[4px_4px_0_0_rgba(74,59,44,1)] dark:shadow-[4px_4px_0_0_rgba(34,197,94,1)]";
    if (theme === "pixel") return "flex items-start gap-4 p-4 border-4 border-black dark:border-white bg-transparent mb-4 hover:bg-[#8bac0f] dark:hover:bg-[#306230] transition-colors";
    
    // Modern default
    if (type === "build") return "flex items-start gap-3 p-3 rounded-xl border-2 border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 transform hover:rotate-1 transition-transform";
    if (type === "watch") return "flex items-start gap-3 p-3 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/30 transform hover:-rotate-1 transition-transform";
    return "flex items-start gap-3 p-3 rounded-xl border-2 border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/30 transform hover:rotate-1 transition-transform";
  };

  const getIconClass = (type: "build" | "watch" | "learn") => {
    if (theme === "minimal") return "text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 mt-1";
    if (theme === "brutal") return "text-black shrink-0 border-2 border-black p-1";
    if (theme === "retro") return "text-[#4a3b2c] dark:text-green-500 shrink-0 border-4 border-[#4a3b2c] dark:border-green-500 p-1 bg-white/50 dark:bg-black/50";
    if (theme === "pixel") return "text-current shrink-0 border-2 border-current p-1 bg-black dark:bg-white text-white dark:text-black";
    
    if (type === "build") return "p-2 bg-rose-200 dark:bg-rose-900 rounded-lg shrink-0 text-rose-900 dark:text-rose-100";
    if (type === "watch") return "p-2 bg-blue-200 dark:bg-blue-900 rounded-lg shrink-0 text-blue-900 dark:text-blue-100";
    return "p-2 bg-emerald-200 dark:bg-emerald-900 rounded-lg shrink-0 text-emerald-900 dark:text-emerald-100";
  };

  const getTitleClass = (type: "build" | "watch" | "learn") => {
    if (theme === "minimal") return "text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1";
    if (theme === "brutal") return "text-lg font-black uppercase tracking-tighter text-black mb-1";
    if (theme === "retro") return "text-sm font-bold uppercase tracking-widest text-[#4a3b2c] dark:text-green-500 mb-1";
    if (theme === "pixel") return "text-xs font-bold uppercase text-current mb-1";
    
    if (type === "build") return "text-[10px] font-black uppercase tracking-widest text-rose-800 dark:text-rose-200 mb-1";
    if (type === "watch") return "text-[10px] font-black uppercase tracking-widest text-blue-800 dark:text-blue-200 mb-1";
    return "text-[10px] font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-200 mb-1";
  };

  const getTextClass = (type: "build" | "watch" | "learn") => {
    if (theme === "minimal") return "text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-light";
    if (theme === "brutal") return "text-sm font-bold text-black uppercase leading-snug";
    if (theme === "retro") return "text-xs font-bold text-[#4a3b2c]/80 dark:text-green-400 uppercase leading-snug";
    if (theme === "pixel") return "text-[10px] uppercase text-current opacity-80 leading-snug";
    
    if (type === "build") return "text-sm font-medium text-rose-950 dark:text-rose-50 leading-snug";
    if (type === "watch") return "text-sm font-medium text-blue-950 dark:text-blue-50 leading-snug";
    return "text-sm font-medium text-emerald-950 dark:text-emerald-50 leading-snug";
  };

  return (
    <div className={getContainerClass()}>
      {theme !== "minimal" && (
        <h2 className={getHeaderClass()}>
          {theme === "brutal" ? "VARTAMAN_STATE" : theme === "retro" ? "CURRENT_PROC" : theme === "pixel" ? "ACTIVE_QUESTS" : "Currently... (Vartaman)"}
        </h2>
      )}
      <div className={theme === "minimal" ? "flex flex-col gap-0" : "flex flex-col gap-4 mt-4"}>
        
        <div className={getItemClass("build")}>
          <div className={getIconClass("build").includes("p-2") ? getIconClass("build") : ""}>
            <Terminal className={`w-4 h-4 ${!getIconClass("build").includes("p-2") ? getIconClass("build") : ""}`} />
          </div>
          <div>
            <h3 className={getTitleClass("build")}>Building</h3>
            <p className={getTextClass("build")}>
              A playful, high-performance personal digital garden.
            </p>
          </div>
        </div>

        <div className={getItemClass("watch")}>
          <div className={getIconClass("watch").includes("p-2") ? getIconClass("watch") : ""}>
            <Film className={`w-4 h-4 ${!getIconClass("watch").includes("p-2") ? getIconClass("watch") : ""}`} />
          </div>
          <div>
            <h3 className={getTitleClass("watch")}>Watching</h3>
            <p className={getTextClass("watch")}>
              Good movies, probably Interstellar or a classic thriller.
            </p>
          </div>
        </div>

        <div className={getItemClass("learn")}>
          <div className={getIconClass("learn").includes("p-2") ? getIconClass("learn") : ""}>
            <BookOpen className={`w-4 h-4 ${!getIconClass("learn").includes("p-2") ? getIconClass("learn") : ""}`} />
          </div>
          <div>
            <h3 className={getTitleClass("learn")}>Learning</h3>
            <p className={getTextClass("learn")}>
              Business strategies and diving headfirst into whatever's next.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
