import { Metadata } from "next";
import { getAnalyticsData } from "@/lib/analyticsDb";
import { Users, MousePointerClick, Smartphone, Monitor, Globe, Clock } from "lucide-react";

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

  // Clicks by platform
  const clicksByPlatform = data.clicks.reduce((acc, curr) => {
    acc[curr.platform] = (acc[curr.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedPlatforms = Object.entries(clicksByPlatform).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-10 animate-fade-in-up pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-border/60 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          Analytics 
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
        </h1>
        <p className="text-sm sm:text-base text-muted">Live, privacy-first traffic and interaction data.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col p-5 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-light">Total Visits</span>
            <Users className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
          </div>
          <span className="text-4xl font-black text-foreground tracking-tight">{totalVisits}</span>
        </div>

        <div className="flex flex-col p-5 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-light">Link Clicks</span>
            <MousePointerClick className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
          </div>
          <span className="text-4xl font-black text-foreground tracking-tight">{totalClicks}</span>
        </div>

        <div className="flex flex-col p-5 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-light">Mobile Users</span>
            <Smartphone className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
          </div>
          <span className="text-4xl font-black text-foreground tracking-tight">{mobileVisits}</span>
        </div>

        <div className="flex flex-col p-5 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-light">Desktop Users</span>
            <Monitor className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
          </div>
          <span className="text-4xl font-black text-foreground tracking-tight">{desktopVisits}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Social Clicks Leaderboard */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-base font-bold text-foreground border-b border-border/60 pb-2">Engagement</h2>
          <div className="space-y-3">
            {sortedPlatforms.length > 0 ? (
              sortedPlatforms.map(([platform, count], index) => {
                const percentage = Math.round((count / Math.max(totalClicks, 1)) * 100);
                return (
                  <div key={platform} className="p-4 rounded-xl border border-border/40 bg-neutral-50/50 dark:bg-neutral-900/20 flex flex-col gap-3 hover-lift">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                        <span className="text-[10px] text-muted-light font-mono bg-border/50 px-1.5 py-0.5 rounded">#{index + 1}</span> 
                        {platform}
                      </span>
                      <span className="text-xs font-mono font-bold bg-accent/15 text-accent px-2 py-1 rounded-md">
                        {count} clicks
                      </span>
                    </div>
                    <div className="w-full bg-border/40 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-accent h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-border/60 text-center text-sm text-muted">
                No clicks recorded yet.
              </div>
            )}
          </div>
        </div>

        {/* Visitor Log Table */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-foreground border-b border-border/60 pb-2 flex items-center justify-between">
            Recent Traffic Feed
            <Globe className="w-4 h-4 text-muted-light" />
          </h2>
          <div className="border border-border/50 rounded-xl overflow-hidden bg-background shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-muted-light bg-neutral-50 dark:bg-neutral-900/50 uppercase tracking-widest border-b border-border/50">
                <tr>
                  <th className="px-5 py-4 font-semibold">Time</th>
                  <th className="px-5 py-4 font-semibold">Location</th>
                  <th className="px-5 py-4 font-semibold">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {data.visits.slice(0, 15).map((v, i) => (
                  <tr key={i} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/40 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap text-muted font-mono text-xs flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-muted-light" />
                      {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-5 py-4 font-medium text-foreground">
                      {v.city !== 'Unknown City' && v.city ? `${v.city}, ${v.country}` : v.country}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md tracking-wider ${
                        v.device === 'mobile' 
                          ? 'bg-blue-100/50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50'
                          : 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50'
                      }`}>
                        {v.device}
                      </span>
                    </td>
                  </tr>
                ))}
                {data.visits.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-5 py-10 text-center text-muted text-sm">
                      Waiting for incoming traffic...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
