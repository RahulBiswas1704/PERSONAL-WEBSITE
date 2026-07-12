import { Metadata } from "next";
import { getAnalyticsData, getSessionDurations } from "@/lib/analyticsDb";
import { Users, MousePointerClick, Smartphone, Monitor, Globe, Clock, Activity, ArrowUpRight, Timer } from "lucide-react";
import { LocalTime } from "@/components/LocalTime";

export const metadata: Metadata = {
  title: "Insights",
  description: "Website Analytics",
};

export const dynamic = "force-dynamic";

const getDurationText = (seconds?: number) => {
  if (!seconds) return '< 2s';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
};

const getDeviceModel = (ua: string): string => {
  if (!ua || ua === 'Unknown') return '';
  if (/iPhone/i.test(ua)) return "iPhone";
  if (/iPad/i.test(ua)) return "iPad";
  if (/Macintosh/i.test(ua)) return "Mac";
  if (/Windows/i.test(ua)) return "PC";
  if (/Android/i.test(ua)) {
    const match = ua.match(/Android\s+[0-9\.]+(?:;\s+([^;)]+))?/i);
    if (match && match[1]) {
       const model = match[1].trim().split(' Build')[0];
       if (model.length > 2 && !model.includes('wv')) return model;
    }
    return "Android";
  }
  return "";
};

export default async function InsightsPage() {
  const data = await getAnalyticsData();
  const sessionDurations = await getSessionDurations();
  
  // Calculate totals
  const totalVisits = data.visits.length;
  const totalClicks = data.clicks.length;
  
  // Mobile vs Desktop
  const mobileVisits = data.visits.filter(v => v.device === 'mobile').length;
  const desktopVisits = data.visits.filter(v => v.device === 'desktop').length;

  const mobilePercent = totalVisits > 0 ? Math.round((mobileVisits / totalVisits) * 100) : 0;
  const desktopPercent = totalVisits > 0 ? Math.round((desktopVisits / totalVisits) * 100) : 0;

  // Calculate average duration
  const durationValues = Object.values(sessionDurations);
  const totalDuration = durationValues.reduce((sum, val) => sum + val, 0);
  const avgDurationSeconds = durationValues.length > 0 ? Math.round(totalDuration / durationValues.length) : 0;
  
  const avgMinutes = Math.floor(avgDurationSeconds / 60);
  const avgSeconds = avgDurationSeconds % 60;
  const avgDurationText = avgMinutes > 0 ? `${avgMinutes}m ${avgSeconds}s` : `${avgSeconds}s`;

  // Clicks by platform
  const clicksByPlatform = data.clicks.reduce((acc, curr) => {
    acc[curr.platform] = (acc[curr.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedPlatforms = Object.entries(clicksByPlatform).sort((a, b) => b[1] - a[1]);

  return (
    <div className="relative space-y-10 animate-fade-in-up pb-10">
      
      {/* Ambient Dashboard Glows */}
      <div className="fixed top-20 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col gap-3 pb-4 border-b border-violet-200/50 dark:border-violet-900/50">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-violet-950 dark:text-violet-50 flex items-center gap-3">
            Dashboard
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
          </h1>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Data
          </div>
        </div>
        <p className="text-sm sm:text-base text-violet-700 dark:text-violet-300">Real-time privacy-first analytics and engagement metrics.</p>
      </div>

      {/* Hero KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Visits Card */}
        <div className="relative overflow-hidden flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-gradient-to-br from-white/80 to-white/40 dark:from-black/60 dark:to-black/20 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Total Visits</span>
            <div className="p-2.5 rounded-xl bg-violet-100/80 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors shadow-sm">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto pt-4">
            <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-950 to-violet-600 dark:from-violet-100 dark:to-violet-400 drop-shadow-sm">{totalVisits}</span>
          </div>
        </div>

        {/* Link Clicks Card */}
        <div className="relative overflow-hidden flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-gradient-to-br from-white/80 to-white/40 dark:from-black/60 dark:to-black/20 backdrop-blur-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">Link Clicks</span>
            <div className="p-2.5 rounded-xl bg-violet-100/80 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 group-hover:bg-accent group-hover:text-accent-foreground transition-colors shadow-sm">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto pt-4">
            <span className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-950 to-violet-600 dark:from-violet-100 dark:to-violet-400 drop-shadow-sm">{totalClicks}</span>
          </div>
        </div>

        {/* Avg Time on Site Card */}
        <div className="relative overflow-hidden flex flex-col p-6 rounded-3xl border border-orange-200/60 dark:border-orange-900/30 bg-gradient-to-br from-orange-50/80 to-white/40 dark:from-orange-950/20 dark:to-black/20 backdrop-blur-xl shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">Avg Time on Site</span>
            <div className="p-2.5 rounded-xl bg-orange-100/80 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
              <Timer className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-end gap-2 mt-auto pt-4">
            <span className="text-4xl sm:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-400 dark:to-amber-200 drop-shadow-sm">{avgDurationText}</span>
          </div>
        </div>

      </div>

      {/* Audience & Engagement Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Device Breakdown */}
        <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 border-b border-violet-200/60 dark:border-violet-900/50 pb-3 mb-6 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-emerald-500" />
            Audience Devices
          </h2>
          
          <div className="flex flex-col gap-6 justify-center flex-1">
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shadow-sm border border-blue-200/50 dark:border-blue-800/50">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-violet-950 dark:text-violet-50 tracking-tight">{mobilePercent}%</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-500 dark:text-violet-400">Mobile ({mobileVisits})</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-right">
                <div>
                  <div className="text-2xl font-black text-violet-950 dark:text-violet-50 tracking-tight">{desktopPercent}%</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-500 dark:text-violet-400">Desktop ({desktopVisits})</div>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200/50 dark:border-emerald-800/50">
                  <Monitor className="w-6 h-6" />
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="h-4 w-full bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden flex shadow-inner">
              <div className="h-full bg-blue-500 transition-all duration-1000 ease-out relative" style={{ width: `${mobilePercent}%` }}>
                 <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
              </div>
              <div className="h-full bg-emerald-500 transition-all duration-1000 ease-out relative" style={{ width: `${desktopPercent}%` }}>
                <div className="absolute top-0 left-0 w-full h-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Clicks Leaderboard */}
        <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg max-h-[350px]">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 border-b border-violet-200/60 dark:border-violet-900/50 pb-3 mb-4 flex items-center gap-2 shrink-0">
            <ArrowUpRight className="w-4 h-4 text-accent" />
            Top Engagement
          </h2>
          <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
            {sortedPlatforms.length > 0 ? (
              sortedPlatforms.map(([platform, count], index) => {
                const percentage = Math.round((count / Math.max(totalClicks, 1)) * 100);
                return (
                  <div key={platform} className="p-4 rounded-2xl border border-violet-200/60 dark:border-violet-800/50 bg-white/80 dark:bg-black/60 flex flex-col gap-3 hover:border-accent/50 transition-colors group">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-violet-950 dark:text-violet-50 flex items-center gap-2">
                        <span className="text-[10px] text-violet-500 dark:text-violet-400 font-mono bg-violet-100 dark:bg-violet-900/30 px-1.5 py-0.5 rounded group-hover:bg-accent/20 group-hover:text-accent transition-colors">#{index + 1}</span> 
                        {platform}
                      </span>
                      <span className="text-xs font-mono font-bold bg-accent/15 text-accent px-2 py-1 rounded-md">
                        {count} clicks
                      </span>
                    </div>
                    <div className="w-full bg-violet-100 dark:bg-violet-900/30 rounded-full h-1.5 overflow-hidden shadow-inner">
                      <div className="bg-accent h-full rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${percentage}%` }}>
                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="h-full flex items-center justify-center p-6 rounded-2xl border border-dashed border-violet-300 dark:border-violet-800 text-sm text-violet-600 dark:text-violet-400 bg-white/40 dark:bg-black/40 backdrop-blur-sm">
                No clicks recorded yet.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Visitor Log Row */}
      <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-between border-b border-violet-200/60 dark:border-violet-900/50 pb-3 mb-4">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 flex items-center gap-2">
            <Globe className="w-4 h-4 text-accent animate-spin-slow" style={{ animationDuration: '10s' }} />
            Live Traffic Feed
          </h2>
          <span className="text-[10px] bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md font-mono font-bold border border-emerald-200 dark:border-emerald-800/50 animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Listening
          </span>
        </div>
        
        <div className="rounded-2xl overflow-hidden border border-violet-200/50 dark:border-violet-800/50 bg-white/50 dark:bg-black/50 h-[400px] flex flex-col relative group">
          {/* Ambient overlay inside widget */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-black/40 pointer-events-none z-0" />
          
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-auto flex-1 custom-scrollbar relative z-10">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 z-20 text-[10px] text-violet-500 dark:text-violet-400 bg-violet-50/95 dark:bg-violet-950/95 backdrop-blur-md uppercase tracking-widest border-b border-violet-200/60 dark:border-violet-800/50">
                <tr>
                  <th className="px-6 py-4 font-black">Time</th>
                  <th className="px-6 py-4 font-black">Location</th>
                  <th className="px-6 py-4 font-black">Device</th>
                  <th className="px-6 py-4 font-black">Time Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-200/40 dark:divide-violet-800/40">
                {data.visits.slice(0, 50).map((v, i) => {
                  return (
                  <tr key={i} className="hover:bg-violet-50/90 dark:hover:bg-violet-900/40 transition-colors group/row">
                    <td className="px-6 py-4 whitespace-nowrap text-violet-800 dark:text-violet-200 font-mono text-xs flex items-center gap-2 group-hover/row:text-accent transition-colors">
                      <Clock className="w-3.5 h-3.5 opacity-50 group-hover/row:opacity-100" />
                      <LocalTime timestamp={v.timestamp} />
                    </td>
                    <td className="px-6 py-4 font-bold text-violet-950 dark:text-violet-50">
                      {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
                    </td>
                    <td className="px-6 py-4 flex flex-wrap items-center gap-1.5">
                      <span className={`text-[9px] uppercase font-bold px-2.5 py-1 rounded-md tracking-wider border shadow-sm ${
                        v.device === 'mobile' 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                          : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                      }`}>
                        {v.device}
                      </span>
                      {getDeviceModel(v.userAgent) && (
                        <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 shadow-sm">
                          {getDeviceModel(v.userAgent)}
                        </span>
                      )}
                      {v.browser && v.browser !== 'Unknown' && (
                        <span className="text-[9px] font-bold px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 shadow-sm">
                          {v.browser}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 dark:text-violet-300 bg-violet-100/50 dark:bg-violet-900/20 px-2.5 py-1 rounded-lg border border-violet-200/50 dark:border-violet-800/50">
                        <Timer className="w-3.5 h-3.5" />
                        {getDurationText(sessionDurations[v.id])}
                      </div>
                    </td>
                  </tr>
                  );
                })}
                {data.visits.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-20 text-center text-violet-500 dark:text-violet-400 text-sm font-medium">
                      Waiting for signals...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden overflow-y-auto flex-1 divide-y divide-violet-200/40 dark:divide-violet-800/40 relative z-10">
            {data.visits.slice(0, 50).map((v, i) => {
              return (
              <div key={i} className="p-4 flex flex-col gap-3 hover:bg-violet-50/90 dark:hover:bg-violet-900/40 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="text-violet-700 dark:text-violet-300 font-mono text-xs flex items-center gap-2">
                    <Clock className="w-3 h-3 opacity-60" />
                    <LocalTime timestamp={v.timestamp} mobile />
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-1.5">
                    <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md tracking-wider border ${
                      v.device === 'mobile' 
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                        : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                    }`}>
                      {v.device}
                    </span>
                    {getDeviceModel(v.userAgent) && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
                        {getDeviceModel(v.userAgent)}
                      </span>
                    )}
                    {v.browser && v.browser !== 'Unknown' && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
                        {v.browser}
                      </span>
                    )}
                  </div>
                </div>
                <div className="font-extrabold text-violet-950 dark:text-violet-50 text-sm flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-violet-400 dark:text-violet-600 shrink-0 mt-0.5" />
                    {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
                  </div>
                  <div className="text-xs text-violet-600 dark:text-violet-400 bg-violet-100/50 dark:bg-violet-900/30 px-2 py-0.5 rounded-md flex items-center gap-1.5 border border-violet-200/50 dark:border-violet-800/50">
                    <Timer className="w-3 h-3" />
                    {getDurationText(sessionDurations[v.id])}
                  </div>
                </div>
              </div>
              );
            })}
            {data.visits.length === 0 && (
              <div className="p-10 text-center text-violet-500 dark:text-violet-400 text-sm font-medium">
                Waiting for signals...
              </div>
            )}
          </div>
          
        </div>
      </div>

    </div>
  );
}
