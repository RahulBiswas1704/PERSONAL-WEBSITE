import { Metadata } from "next";
import { getAnalyticsData } from "@/lib/analyticsDb";
import { Users, MousePointerClick, Smartphone, Monitor, Globe, Clock, Activity, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights",
  description: "Website Analytics",
};

// Force dynamic so it always reads the latest file contents
export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const data = await getAnalyticsData();
  
  // Calculate totals
  const totalVisits = data.visits.length;
  const totalClicks = data.clicks.length;
  
  // Mobile vs Desktop
  const mobileVisits = data.visits.filter(v => v.device === 'mobile').length;
  const desktopVisits = data.visits.filter(v => v.device === 'desktop').length;

  const mobilePercent = totalVisits > 0 ? Math.round((mobileVisits / totalVisits) * 100) : 0;
  const desktopPercent = totalVisits > 0 ? Math.round((desktopVisits / totalVisits) * 100) : 0;

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

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Visits Card */}
        <div className="relative overflow-hidden flex flex-col p-4 sm:p-5 rounded-2xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Total Visits</span>
            <div className="p-2 rounded-xl bg-violet-100/50 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 group-hover:bg-accent group-hover:text-accent-foreground transition-colors shadow-sm">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl sm:text-4xl font-black text-violet-950 dark:text-violet-50 tracking-tight">{totalVisits}</span>
          </div>
        </div>

        {/* Link Clicks Card */}
        <div className="relative overflow-hidden flex flex-col p-4 sm:p-5 rounded-2xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Link Clicks</span>
            <div className="p-2 rounded-xl bg-violet-100/50 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 group-hover:bg-accent group-hover:text-accent-foreground transition-colors shadow-sm">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl sm:text-4xl font-black text-violet-950 dark:text-violet-50 tracking-tight">{totalClicks}</span>
          </div>
        </div>

        {/* Mobile Users Card */}
        <div className="relative overflow-hidden flex flex-col p-4 sm:p-5 rounded-2xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Mobile</span>
            <div className="p-2 rounded-xl bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end gap-2 justify-between">
            <span className="text-3xl sm:text-4xl font-black text-violet-950 dark:text-violet-50 tracking-tight">{mobileVisits}</span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 bg-blue-100/50 dark:bg-blue-900/20 px-2 py-0.5 rounded">{mobilePercent}%</span>
          </div>
        </div>

        {/* Desktop Users Card */}
        <div className="relative overflow-hidden flex flex-col p-4 sm:p-5 rounded-2xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Desktop</span>
            <div className="p-2 rounded-xl bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shadow-sm">
              <Monitor className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-end gap-2 justify-between">
            <span className="text-3xl sm:text-4xl font-black text-violet-950 dark:text-violet-50 tracking-tight">{desktopVisits}</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 bg-emerald-100/50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">{desktopPercent}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Social Clicks Leaderboard */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 border-b border-violet-200/60 dark:border-violet-900/50 pb-2 flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4 text-accent" />
            Top Engagement
          </h2>
          <div className="space-y-3">
            {sortedPlatforms.length > 0 ? (
              sortedPlatforms.map(([platform, count], index) => {
                const percentage = Math.round((count / Math.max(totalClicks, 1)) * 100);
                return (
                  <div key={platform} className="p-4 rounded-xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-md flex flex-col gap-3 hover:border-accent/50 transition-colors group">
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
                      <div className="bg-accent h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden" style={{ width: `${percentage}%` }}>
                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse" />
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-violet-300 dark:border-violet-800 text-center text-sm text-violet-600 dark:text-violet-400 bg-white/40 dark:bg-black/40 backdrop-blur-sm">
                No clicks recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Visitor Log Widget */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 border-b border-violet-200/60 dark:border-violet-900/50 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent animate-spin-slow" style={{ animationDuration: '10s' }} />
              Live Traffic Feed
            </div>
            <span className="text-[10px] bg-emerald-100/50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-200 dark:border-emerald-800/50">Listening...</span>
          </h2>
          
          <div className="border border-violet-200/60 dark:border-violet-800/50 rounded-2xl overflow-hidden bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg flex flex-col h-[500px] relative group">
            {/* Ambient overlay inside widget */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-black/40 pointer-events-none z-0" />
            
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-auto flex-1 custom-scrollbar relative z-10">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 z-20 text-[10px] text-violet-500 dark:text-violet-400 bg-violet-50/90 dark:bg-violet-950/90 backdrop-blur-md uppercase tracking-widest border-b border-violet-200/60 dark:border-violet-800/50">
                  <tr>
                    <th className="px-5 py-4 font-black">Time</th>
                    <th className="px-5 py-4 font-black">Location</th>
                    <th className="px-5 py-4 font-black">Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-200/40 dark:divide-violet-800/40">
                  {data.visits.slice(0, 50).map((v, i) => {
                    const date = new Date(v.timestamp);
                    const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    
                    return (
                    <tr key={i} className="hover:bg-violet-50/80 dark:hover:bg-violet-900/30 transition-colors group/row">
                      <td className="px-5 py-4 whitespace-nowrap text-violet-800 dark:text-violet-200 font-mono text-xs flex items-center gap-2 group-hover/row:text-accent transition-colors">
                        <Clock className="w-3.5 h-3.5 opacity-50 group-hover/row:opacity-100" />
                        <span>{formattedDate} <span className="opacity-50 mx-1">•</span> {formattedTime}</span>
                      </td>
                      <td className="px-5 py-4 font-bold text-violet-950 dark:text-violet-50">
                        {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
                      </td>
                      <td className="px-5 py-4 flex flex-wrap items-center gap-1.5">
                        <span className={`text-[9px] uppercase font-bold px-2.5 py-1 rounded-md tracking-wider border shadow-sm ${
                          v.device === 'mobile' 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                            : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                        }`}>
                          {v.device}
                        </span>
                        {v.os && v.os !== 'Unknown' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 shadow-sm">
                            {v.os}
                          </span>
                        )}
                        {v.browser && v.browser !== 'Unknown' && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50 shadow-sm">
                            {v.browser}
                          </span>
                        )}
                      </td>
                    </tr>
                    );
                  })}
                  {data.visits.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-5 py-20 text-center text-violet-500 dark:text-violet-400 text-sm font-medium">
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
                const date = new Date(v.timestamp);
                const formattedDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                <div key={i} className="p-4 flex flex-col gap-3 hover:bg-violet-50/80 dark:hover:bg-violet-900/30 transition-colors">
                  <div className="flex justify-between items-center">
                    <div className="text-violet-700 dark:text-violet-300 font-mono text-xs flex items-center gap-2">
                      <Clock className="w-3 h-3 opacity-60" />
                      <span>{formattedDate} <span className="opacity-50 mx-0.5">•</span> {formattedTime}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md tracking-wider border ${
                        v.device === 'mobile' 
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                          : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50'
                      }`}>
                        {v.device}
                      </span>
                      {v.os && v.os !== 'Unknown' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
                          {v.os}
                        </span>
                      )}
                      {v.browser && v.browser !== 'Unknown' && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-800/50">
                          {v.browser}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="font-extrabold text-violet-950 dark:text-violet-50 text-sm flex items-start gap-2">
                    <Globe className="w-4 h-4 text-violet-400 dark:text-violet-600 shrink-0 mt-0.5" />
                    {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
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
    </div>
  );
}
