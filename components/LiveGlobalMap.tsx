"use client";

import { memo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

// Helper to map Vercel KV country names to TopoJSON standard names
const countryNameMap: Record<string, string> = {
  "United States": "United States of America",
  // Add other necessary mappings if needed
};

interface LiveGlobalMapProps {
  topCountries: [string, number][];
}

const LiveGlobalMap = ({ topCountries }: LiveGlobalMapProps) => {
  // Find max hits to calculate color intensity
  const maxHits = topCountries.length > 0 ? topCountries[0][1] : 1;

  // Convert array to quick lookup map
  const hitsMap = topCountries.reduce((acc, [country, count]) => {
    const mappedCountry = countryNameMap[country] || country;
    acc[mappedCountry.toLowerCase()] = count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-black/5 dark:bg-black/20 border border-violet-200/50 dark:border-violet-800/30 shadow-inner relative flex items-center justify-center">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
        </span>
        <span className="text-xs font-black uppercase tracking-widest text-violet-700 dark:text-violet-300">Live Global Traffic</span>
      </div>
      
      <ComposableMap
        projectionConfig={{ scale: 140 }}
        className="w-full h-full opacity-80"
      >
        <ZoomableGroup center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const geoName = geo.properties.name.toLowerCase();
                const hits = hitsMap[geoName];
                
                // Calculate glow intensity (opacity)
                const intensity = hits ? 0.3 + (0.7 * (hits / maxHits)) : 0;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={hits ? `rgba(139, 92, 246, ${intensity})` : "var(--color-bg-muted, rgba(150,150,150,0.1))"}
                    stroke="rgba(139, 92, 246, 0.2)"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#8b5cf6", outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(LiveGlobalMap);
