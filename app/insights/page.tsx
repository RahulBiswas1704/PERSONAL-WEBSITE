import { Metadata } from "next";
import { getAnalyticsData, getSessionDurations } from "@/lib/analyticsDb";
import { Users, MousePointerClick, Smartphone, Monitor, Globe, Clock, Activity, ArrowUpRight, Timer, MapPin, Link as LinkIcon, Wifi, Layout } from "lucide-react";
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

const getDeviceModel = (ua: string, fallbackOS?: string): string => {
  const os = fallbackOS || 'Unknown';
  if (!ua || ua === 'Unknown') return os !== 'Unknown' ? os : 'Unknown Device';
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
  if (/Linux/i.test(ua)) return "Linux";
  if (/CrOS/i.test(ua)) return "ChromeOS";
  
  return os !== 'Unknown' ? os : 'Unknown Device';
};

export default async function InsightsPage() {
  const data = await getAnalyticsData();
  const sessionDurations = await getSessionDurations();
  
  // Totals
  const totalVisits = data.visits.length;
  const totalClicks = data.clicks.length;
  
  // Mobile vs Desktop
  const mobileVisits = data.visits.filter(v => v.device === 'mobile').length;
  const desktopVisits = data.visits.filter(v => v.device === 'desktop').length;
  const mobilePercent = totalVisits > 0 ? Math.round((mobileVisits / totalVisits) * 100) : 0;
  const desktopPercent = totalVisits > 0 ? Math.round((desktopVisits / totalVisits) * 100) : 0;

  // Average Duration
  const durationValues = Object.values(sessionDurations);
  const totalDuration = durationValues.reduce((sum, val) => sum + val, 0);
  const avgDurationSeconds = durationValues.length > 0 ? Math.round(totalDuration / durationValues.length) : 0;
  const avgMinutes = Math.floor(avgDurationSeconds / 60);
  const avgSeconds = avgDurationSeconds % 60;
  const avgDurationText = avgMinutes > 0 ? `${avgMinutes}m ${avgSeconds}s` : `${avgSeconds}s`;

  // Aggregations
  // 1. Clicks by Platform
  const clicksByPlatform = data.clicks.reduce((acc, curr) => {
    acc[curr.platform] = (acc[curr.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedPlatforms = Object.entries(clicksByPlatform).sort((a, b) => b[1] - a[1]);

  // 2. Top Countries
  const countriesMap = data.visits.reduce((acc, v) => {
    const loc = v.country && v.country !== 'Unknown Country' ? v.country : 'Unknown';
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCountries = Object.entries(countriesMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // 3. Top Referrers
  const referrersMap = data.visits.reduce((acc, v) => {
    let ref = v.referrer || 'Direct';
    if (ref !== 'Direct' && ref.startsWith('http')) {
      try {
        const url = new URL(ref);
        ref = url.hostname.replace('www.', '');
      } catch (e) {}
    }
    acc[ref] = (acc[ref] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topReferrers = Object.entries(referrersMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // 4. Screen Resolutions
  const resolutionsMap = data.visits.reduce((acc, v) => {
    const res = v.screenResolution && v.screenResolution !== 'Unknown' ? v.screenResolution : 'Hidden';
    acc[res] = (acc[res] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topResolutions = Object.entries(resolutionsMap).sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <div className="relative space-y-12 animate-fade-in-up pb-20 max-w-7xl mx-auto">
      
      {/* Immersive Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="fixed top-[40%] right-[20%] w-[300px] h-[300px] bg-accent/5 dark:bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 border-b border-violet-200/50 dark:border-violet-900/50 relative">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-widest border border-violet-200 dark:border-violet-800/50 w-fit mb-2">
            <Activity className="w-3.5 h-3.5" /> Command Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-950 to-violet-600 dark:from-white dark:to-violet-400">
            Analytics
          </h1>
          <p className="text-sm sm:text-base text-violet-700 dark:text-violet-400 font-medium">Hyper-detailed, real-time traffic & engagement insights.</p>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-emerald-200/50 dark:border-emerald-900/50 shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-widest">Live Connection</span>
        </div>
      </div>

      {/* Hero KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Visits Card */}
        <div className="relative overflow-hidden flex flex-col p-6 sm:p-8 rounded-[2rem] border border-violet-200/60 dark:border-violet-800/50 bg-gradient-to-br from-white/90 to-white/50 dark:from-violet-950/40 dark:to-black/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 scale-150 pointer-events-none">
            <Users className="w-32 h-32 text-violet-900 dark:text-white" />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300 shadow-inner group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">Total Visits</span>
          </div>
          <div className="mt-auto relative z-10">
            <span className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-violet-950 to-violet-500 dark:from-white dark:to-violet-400 drop-shadow-sm">{totalVisits}</span>
          </div>
        </div>

        {/* Link Clicks Card */}
        <div className="relative overflow-hidden flex flex-col p-6 sm:p-8 rounded-[2rem] border border-blue-200/60 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/90 to-white/50 dark:from-blue-950/20 dark:to-black/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12 scale-150 pointer-events-none">
            <MousePointerClick className="w-32 h-32 text-blue-900 dark:text-blue-200" />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 shadow-inner group-hover:scale-110 transition-transform">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Link Clicks</span>
          </div>
          <div className="mt-auto relative z-10">
            <span className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-blue-950 to-blue-500 dark:from-blue-100 dark:to-blue-500 drop-shadow-sm">{totalClicks}</span>
          </div>
        </div>

        {/* Avg Time on Site Card */}
        <div className="relative overflow-hidden flex flex-col p-6 sm:p-8 rounded-[2rem] border border-orange-200/60 dark:border-orange-900/30 bg-gradient-to-br from-orange-50/90 to-white/50 dark:from-orange-950/20 dark:to-black/40 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 scale-150 pointer-events-none">
            <Timer className="w-32 h-32 text-orange-900 dark:text-orange-200" />
          </div>
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="p-3 rounded-2xl bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 shadow-inner group-hover:scale-110 transition-transform">
              <Timer className="w-6 h-6" />
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Avg Time on Site</span>
          </div>
          <div className="mt-auto relative z-10">
            <span className="text-5xl sm:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-orange-600 to-amber-500 dark:from-orange-300 dark:to-amber-500 drop-shadow-sm">{avgDurationText}</span>
          </div>
        </div>

      </div>

      {/* Multi-Column Details Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Audience & Tech */}
        <div className="flex flex-col gap-6">
          {/* Device Split */}
          <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg">
            <h2 className="text-xs uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 mb-6 flex items-center gap-2 opacity-80">
              <Smartphone className="w-4 h-4" /> Platforms
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-black text-violet-950 dark:text-white tracking-tight">{mobilePercent}%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-violet-500">Mobile</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-violet-950 dark:text-white tracking-tight">{desktopPercent}%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-violet-500">Desktop</div>
                </div>
              </div>
              <div className="h-3 w-full bg-violet-100 dark:bg-violet-900/30 rounded-full overflow-hidden flex shadow-inner">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: `${mobilePercent}%` }} />
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${desktopPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Resolutions */}
          <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg flex-1">
            <h2 className="text-xs uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 mb-6 flex items-center gap-2 opacity-80">
              <Layout className="w-4 h-4" /> Top Displays
            </h2>
            <div className="space-y-4 flex-1">
              {topResolutions.length > 0 ? topResolutions.map(([res, count], idx) => {
                const percent = Math.round((count / totalVisits) * 100);
                return (
                  <div key={res} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-violet-400 dark:text-violet-600">0{idx + 1}</span>
                      <span className="text-sm font-bold text-violet-900 dark:text-violet-100">{res}</span>
                    </div>
                    <div className="flex items-center gap-3 w-1/2">
                      <div className="h-1.5 flex-1 bg-violet-100 dark:bg-violet-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-violet-500 dark:bg-violet-400 rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-300 w-8 text-right">{percent}%</span>
                    </div>
                  </div>
                )
              }) : (
                <div className="text-xs text-violet-500 italic">No data yet</div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: Geography (Countries) */}
        <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg">
          <h2 className="text-xs uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 mb-6 flex items-center gap-2 opacity-80">
            <Globe className="w-4 h-4" /> Global Reach
          </h2>
          <div className="flex flex-col gap-5 flex-1">
            {topCountries.length > 0 ? topCountries.map(([country, count], idx) => {
              const percent = Math.round((count / totalVisits) * 100);
              return (
                <div key={country} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-violet-900 dark:text-violet-100 truncate pr-2">{country}</span>
                    <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-md">{count}</span>
                  </div>
                  <div className="h-2 w-full bg-violet-100 dark:bg-violet-900/30 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              )
            }) : (
              <div className="text-xs text-violet-500 italic">No data yet</div>
            )}
          </div>
        </div>

        {/* Column 3: Acquisition & Engagement */}
        <div className="flex flex-col gap-6">
          {/* Top Referrers */}
          <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg flex-1">
            <h2 className="text-xs uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 mb-5 flex items-center gap-2 opacity-80">
              <LinkIcon className="w-4 h-4" /> Top Sources
            </h2>
            <div className="flex flex-col gap-3">
              {topReferrers.length > 0 ? topReferrers.map(([ref, count], idx) => (
                <div key={ref} className="flex justify-between items-center p-3 rounded-2xl bg-white/80 dark:bg-black/60 border border-violet-100 dark:border-violet-800/30 hover:border-violet-300 dark:hover:border-violet-600 transition-colors">
                  <span className="text-sm font-bold text-violet-900 dark:text-violet-100 truncate">{ref}</span>
                  <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-300 bg-violet-100 dark:bg-violet-900/40 px-2 py-1 rounded-md shrink-0">{count} visits</span>
                </div>
              )) : (
                <div className="text-xs text-violet-500 italic">No data yet</div>
              )}
            </div>
          </div>

          {/* Social Clicks */}
          <div className="flex flex-col p-6 rounded-3xl border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-lg">
            <h2 className="text-xs uppercase tracking-widest font-black text-violet-950 dark:text-violet-50 mb-4 flex items-center gap-2 opacity-80">
              <ArrowUpRight className="w-4 h-4 text-accent" /> Engagement
            </h2>
            <div className="flex flex-wrap gap-2">
              {sortedPlatforms.length > 0 ? sortedPlatforms.map(([platform, count]) => (
                <div key={platform} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-violet-100/50 dark:bg-violet-900/20 border border-violet-200/50 dark:border-violet-800/50">
                  <span className="text-xs font-bold text-violet-900 dark:text-violet-100">{platform}</span>
                  <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.5 rounded">{count}</span>
                </div>
              )) : (
                <div className="text-xs text-violet-500 italic">No clicks recorded</div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Live Activity Stream (Rich Row Layout) */}
      <div className="flex flex-col p-6 sm:p-8 rounded-[2.5rem] border border-violet-200/60 dark:border-violet-800/50 bg-white/60 dark:bg-black/40 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-sm sm:text-base uppercase tracking-widest font-black text-violet-950 dark:text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-900/50">
              <Globe className="w-5 h-5 text-accent animate-pulse" />
            </div>
            Live Activity Stream
          </h2>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-violet-500 dark:text-violet-400 font-mono">
            Tracking {data.visits.length} sessions
          </div>
        </div>
        
        <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2 pb-4">
          {data.visits.length > 0 ? data.visits.map((v, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white/80 dark:bg-black/60 border border-violet-100 dark:border-violet-800/50 hover:border-violet-300 dark:hover:border-violet-600 transition-all duration-300 shadow-sm hover:shadow-md group">
              
              {/* Left: Location & Time */}
              <div className="flex items-center gap-4 min-w-[200px]">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-50 dark:from-violet-900/40 dark:to-black/40 flex items-center justify-center shrink-0 border border-violet-200/50 dark:border-violet-800/50 shadow-inner group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-violet-950 dark:text-white text-sm sm:text-base">
                    {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-violet-500 dark:text-violet-400 mt-1">
                    <Clock className="w-3 h-3" />
                    <LocalTime timestamp={v.timestamp} />
                    {v.timezone && <span className="opacity-70 px-1 border-l border-violet-300 dark:border-violet-700">{v.timezone}</span>}
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
                
                {getDeviceModel(v.userAgent, v.os) && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-violet-50/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50 shadow-sm">
                    {getDeviceModel(v.userAgent, v.os)}
                  </span>
                )}
                
                {v.browser && v.browser !== 'Unknown' && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-xl bg-violet-50/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-800/50 shadow-sm">
                    {v.browser}
                  </span>
                )}

                {/* Secondary Micro-Badges */}
                <div className="w-full h-0 sm:hidden"></div> {/* Break line on mobile */}
                
                {v.screenResolution && v.screenResolution !== 'Unknown' && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Layout className="w-3 h-3" /> {v.screenResolution}
                  </span>
                )}
                
                {v.connectionType && v.connectionType !== 'Unknown' && (
                  <span className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800/50 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Wifi className="w-3 h-3" /> {v.connectionType}
                  </span>
                )}

                {v.referrer && v.referrer !== 'Direct' && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-lg bg-accent/5 text-accent border border-accent/20 flex items-center gap-1 max-w-[150px] truncate">
                    <LinkIcon className="w-3 h-3 shrink-0" /> {v.referrer.replace(/^https?:\/\//, '')}
                  </span>
                )}
              </div>

              {/* Right: Time Spent */}
              <div className="flex items-center justify-end sm:min-w-[120px]">
                <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50 dark:border-orange-900/50 shadow-inner group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                  <Timer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-black text-orange-700 dark:text-orange-400 tracking-tight">
                    {getDurationText(sessionDurations[v.id])}
                  </span>
                </div>
              </div>

            </div>
          )) : (
            <div className="flex flex-col items-center justify-center p-12 text-violet-500 dark:text-violet-400">
              <Activity className="w-12 h-12 mb-4 opacity-50 animate-pulse" />
              <p className="font-medium">Waiting for incoming signals...</p>
              <p className="text-xs opacity-70 mt-2">Make sure to visit the homepage in another tab!</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
