"use client";

import { useState, useMemo } from "react";
import { Clock, MapPin, Smartphone, Monitor, Layout, Wifi, Link as LinkIcon, Timer, Activity, MessageSquare, Cpu, Battery, Zap, Droplets, Sun, Moon, ArrowDownToLine, MousePointer2, CpuIcon, MemoryStick, Search, SortDesc, Filter } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";

const getDurationText = (seconds?: number) => {
  if (!seconds) return '< 2s';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const getDeviceModel = (ua: string, fallbackOS?: string): string => {
  const os = fallbackOS || 'Unknown';
  if (!ua || ua === 'Unknown') return os !== 'Unknown' ? os : 'Unknown Device';
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Android/i.test(ua)) {
    const match = ua.match(/Android[^;]+; ([^)]+)\)/);
    if (match && match[1]) {
      let model = match[1].split(' Build/')[0].trim();
      // Google Chrome for Android reduces the User-Agent on modern devices to just "K" or "K)" to prevent fingerprinting
      if (model === "K" || model === "K)" || model === "wv" || model.startsWith("K ")) {
        return "Android Device";
      }
      return model;
    }
    return "Android Device";
  }
  return os !== 'Unknown' ? os : 'Unknown Device';
};

export function InteractiveActivityStream({ visits, chats, sessionDurations, sessionScrollDepths }: { visits: any[], chats: any[], sessionDurations: any, sessionScrollDepths?: any }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "duration" | "depth">("recent");
  const [hasChatsOnly, setHasChatsOnly] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const toggleRow = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const processedVisits = useMemo(() => {
    let result = [...visits];

    // Filter by chats
    if (hasChatsOnly) {
      result = result.filter(v => chats.some(c => c.sessionId === v.id));
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(v => 
        (v.country || "").toLowerCase().includes(q) ||
        (v.city || "").toLowerCase().includes(q) ||
        (v.os || "").toLowerCase().includes(q) ||
        (v.deviceModel || "").toLowerCase().includes(q) ||
        (v.browser || "").toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === "recent") {
      result.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } else if (sortBy === "duration") {
      result.sort((a, b) => (sessionDurations[b.id] || 0) - (sessionDurations[a.id] || 0));
    } else if (sortBy === "depth") {
      result.sort((a, b) => (sessionScrollDepths?.[b.id] || 0) - (sessionScrollDepths?.[a.id] || 0));
    }

    return result;
  }, [visits, chats, sessionDurations, sessionScrollDepths, searchQuery, sortBy, hasChatsOnly]);

  const displayedVisits = processedVisits.slice(0, page * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2 pb-4 relative">
      
      {/* Sticky Control Bar */}
      <div className="sticky top-0 z-20 flex flex-col sm:flex-row gap-3 p-3 rounded-2xl bg-white/70 dark:bg-black/50 backdrop-blur-xl border border-violet-200/50 dark:border-violet-800/30 shadow-sm mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" />
          <input 
            type="text" 
            placeholder="Search country, OS, device..." 
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full bg-white/50 dark:bg-black/30 border border-violet-100 dark:border-violet-900/50 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-violet-400 dark:focus:border-violet-600 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={sortBy}
            onChange={e => { setSortBy(e.target.value as any); setPage(1); }}
            className="bg-white/50 dark:bg-black/30 border border-violet-100 dark:border-violet-900/50 rounded-xl px-3 py-2 text-sm text-violet-900 dark:text-violet-100 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="duration">Longest Session</option>
            <option value="depth">Deepest Scroll</option>
          </select>
          <button 
            onClick={() => { setHasChatsOnly(!hasChatsOnly); setPage(1); }}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all border flex items-center gap-1 ${hasChatsOnly ? 'bg-pink-100 dark:bg-pink-900/40 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300' : 'bg-white/50 dark:bg-black/30 border-violet-100 dark:border-violet-900/50 text-muted-foreground'}`}
            title="Show only sessions that chatted with Kishmish"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Chats</span>
          </button>
        </div>
      </div>

      {displayedVisits.length > 0 ? displayedVisits.map((v, i) => {
        const userChats = chats.filter(c => c.sessionId === v.id).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        const hasChats = userChats.length > 0;
        const isExpanded = expandedId === v.id;

        const currentDate = new Date(v.timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' });
        const previousDate = i > 0 ? new Date(displayedVisits[i - 1].timestamp).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) : null;
        const showDateHeader = sortBy === "recent" && currentDate !== previousDate;

        return (
          <div key={i} className="flex flex-col gap-2">
            {showDateHeader && (
              <div className="sticky top-20 z-10 py-1.5 px-4 mt-2 mb-1 bg-violet-200/90 dark:bg-violet-900/80 backdrop-blur-md rounded-full self-start border border-violet-300 dark:border-violet-700 shadow-sm shadow-violet-500/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-violet-900 dark:text-violet-100">
                  {currentDate}
                </span>
              </div>
            )}
            <div 
              onClick={() => hasChats && toggleRow(v.id)}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/80 dark:bg-black/60 border ${isExpanded ? 'border-pink-500/50 shadow-pink-500/20' : 'border-violet-100 dark:border-violet-800/50'} hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 shadow-sm hover:shadow-md group ${hasChats ? 'cursor-pointer' : ''}`}
            >
              
              {/* Left: Location & Time */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className={`w-12 h-12 rounded-2xl ${hasChats ? 'bg-gradient-to-br from-pink-100 to-pink-50 dark:from-pink-900/40 dark:to-black/40 border-pink-200/50 dark:border-pink-800/50' : 'bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/40 dark:to-black/40 border-violet-200/50 dark:border-violet-800/50'} flex items-center justify-center shrink-0 border shadow-inner group-hover:scale-110 transition-transform`}>
                  {hasChats ? <MessageSquare className="w-5 h-5 text-pink-600 dark:text-pink-400" /> : <MapPin className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-violet-950 dark:text-white text-sm sm:text-base flex items-center gap-2">
                    {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
                    {hasChats && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 border border-pink-200 dark:border-pink-800/50 uppercase tracking-widest font-bold animate-pulse">
                        Spy Logs
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-violet-500 dark:text-violet-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <LocalTime timestamp={v.timestamp} />
                    {v.timezone && <span className="opacity-70 px-1 border-l border-violet-300 dark:border-violet-700">{v.timezone}</span>}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs font-mono text-pink-600 dark:text-pink-400">
                    <LinkIcon className="w-3 h-3" />
                    <span>Landed on: {v.path || '/'}</span>
                  </div>
                </div>
              </div>

              {/* Middle: Badges Collection */}
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {/* Main Badges */}
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border ${
                  v.device === 'mobile' 
                    ? 'bg-blue-50/80 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50'
                    : 'bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                }`}>
                  {v.device === 'mobile' ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
                  <span className="text-[10px] font-bold uppercase tracking-wider">{v.device}</span>
                </div>
                
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-violet-50/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50 shadow-sm">
                  {v.deviceModel || getDeviceModel(v.userAgent, v.os) || 'Unknown Model'}
                </span>
                
                {/* OS */}
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-violet-50/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50 shadow-sm">
                  {v.os && v.os !== 'Unknown' ? v.os : 'Unknown OS'}
                </span>
                
                {/* Browser */}
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-violet-50/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50 shadow-sm">
                  {v.browser && v.browser !== 'Unknown' ? v.browser : 'Unknown Browser'}
                </span>

                {/* Secondary Micro-Badges */}
                <div className="w-full h-0 sm:hidden"></div> {/* Break line on mobile */}
                
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Layout className="w-3 h-3" /> {v.screenResolution && v.screenResolution !== 'Unknown' ? v.screenResolution : 'N/A'}
                </span>
                
                <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Wifi className="w-3 h-3" /> {v.connectionType && v.connectionType !== 'Unknown' ? v.connectionType : 'N/A'}
                </span>

                {v.referrer && v.referrer !== 'Direct' && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-accent/5 text-accent border border-accent/20 flex items-center gap-1 max-w-[150px] truncate">
                    <LinkIcon className="w-3 h-3 shrink-0" /> {v.referrer.replace(/^https?:\/\//, '')}
                  </span>
                )}

                {/* Deep Diagnostics Row */}
                <div className="w-full h-0"></div>
                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                  {v.cpuCores && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 flex items-center gap-1" title="CPU Cores">
                      <CpuIcon className="w-2.5 h-2.5" /> {v.cpuCores} Cores
                    </span>
                  )}
                  {v.ramGb && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 flex items-center gap-1" title="Device Memory">
                      <MemoryStick className="w-2.5 h-2.5" /> {v.ramGb}GB RAM
                    </span>
                  )}
                  {v.battery && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${v.battery.includes('Charging') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400'} flex items-center gap-1`} title="Battery Status">
                      <Battery className="w-2.5 h-2.5" /> {v.battery}
                    </span>
                  )}
                  {v.loadTimeMs && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center gap-1" title="Page Load Latency">
                      <Zap className="w-2.5 h-2.5" /> {v.loadTimeMs}ms
                    </span>
                  )}
                  {v.theme && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 flex items-center gap-1" title="OS Theme Preference">
                      {v.theme === 'dark' ? <Moon className="w-2.5 h-2.5" /> : <Sun className="w-2.5 h-2.5" />} {v.theme}
                    </span>
                  )}
                  {v.isTouch !== undefined && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                      {v.isTouch ? <Droplets className="w-2.5 h-2.5" /> : <MousePointer2 className="w-2.5 h-2.5" />}
                      {v.isTouch ? 'Touch' : 'Pointer'}
                    </span>
                  )}
                  {(v.utmSource || v.utmCampaign) && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center gap-1 border border-blue-200/50 dark:border-blue-800/50">
                      UTM: {v.utmSource || 'direct'} / {v.utmCampaign || 'none'}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: Time Spent & Scroll */}
              <div className="flex flex-col items-end gap-2 sm:min-w-[120px]">
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50 dark:border-orange-900/50 shadow-inner group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                  <Timer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-black text-orange-700 dark:text-orange-400 tracking-tight">
                    {getDurationText(sessionDurations[v.id])}
                  </span>
                </div>
                {sessionScrollDepths && sessionScrollDepths[v.id] !== undefined && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-violet-50/50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-800/30">
                    <ArrowDownToLine className="w-3 h-3 opacity-70" />
                    <span className="text-[10px] font-bold">Scrolled {sessionScrollDepths[v.id]}%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Expansion */}
            {isExpanded && hasChats && (
              <div className="ml-4 sm:ml-12 mr-4 p-4 rounded-2xl bg-gradient-to-br from-pink-50/50 to-white/30 dark:from-pink-950/30 dark:to-black/40 border border-pink-200/50 dark:border-pink-900/50 shadow-inner backdrop-blur-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 border-b border-pink-200/50 dark:border-pink-800/50 pb-2">
                  <MessageSquare className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">Kishmish Interrogation Logs</span>
                  <span className="text-[10px] font-mono opacity-50 ml-auto">{v.id}</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  {userChats.map((chat, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      {/* User Message */}
                      <div className="self-end max-w-[85%] bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm shadow-sm">
                        <p className="text-sm">{chat.userMessage}</p>
                        <span className="text-[9px] opacity-70 mt-1 block text-right font-mono"><LocalTime timestamp={chat.timestamp} /></span>
                      </div>
                      
                      {/* Kishmish Response */}
                      <div className="self-start max-w-[85%] bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-2xl rounded-tl-sm shadow-sm relative group">
                        <p className="text-sm">{chat.kishmishResponse}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[9px] opacity-50 font-mono"><LocalTime timestamp={chat.timestamp} /></span>
                          <span className="text-[9px] text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest font-bold">Emotion: {chat.emotion}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }) : (
        <div className="text-center p-8 text-violet-500/50 dark:text-violet-400/50 font-mono text-sm">
          No matching sessions found.
        </div>
      )}

      {displayedVisits.length < processedVisits.length && (
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => setPage(p => p + 1)}
            className="px-6 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-bold hover:bg-violet-200 dark:hover:bg-violet-800/50 transition-colors"
          >
            Load More Sessions ({processedVisits.length - displayedVisits.length} remaining)
          </button>
        </div>
      )}
    </div>
  );
}
