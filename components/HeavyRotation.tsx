"use client";

import { Disc3, Play } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

interface Track {
  title: string;
  artist: string;
  cover: string;
  url: string;
  nowPlaying: boolean;
}

export default function HeavyRotation() {
  const { theme } = useStructuralTheme();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  const getContainerClasses = () => {
    switch (theme) {
      case 'minimal': return 'font-sans';
      default: return 'font-serif';
    }
  };

  const getTitleClasses = () => {
    switch (theme) {
      case 'minimal': return 'text-xl font-light tracking-tight text-indigo-900 dark:text-indigo-100 mb-4 border-b border-indigo-100 dark:border-indigo-900/30 pb-2 flex items-center justify-between';
      default: return 'text-xl font-black tracking-tight text-amber-950 dark:text-amber-50 mb-4 border-b-2 border-dashed border-amber-200 dark:border-amber-900/50 pb-2 flex items-center justify-between';
    }
  };

  const getIconClasses = () => {
    switch (theme) {
      case 'minimal': return 'w-5 h-5 text-indigo-400 dark:text-indigo-500 animate-[spin_4s_linear_infinite]';
      default: return 'w-5 h-5 text-amber-700 dark:text-amber-300 animate-[spin_4s_linear_infinite]';
    }
  };

  const getTrackClasses = () => {
    switch (theme) {
      case 'minimal': return 'flex items-center gap-4 p-3 rounded-2xl bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 transition-colors group shadow-sm border border-neutral-100 dark:border-neutral-800';
      default: return 'flex items-center gap-4 p-3 rounded-xl border border-border/40 bg-background/30 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors group';
    }
  };

  const getVisualizerClasses = () => {
    switch (theme) {
      case 'minimal': return 'bg-indigo-500';
      default: return 'bg-accent';
    }
  };

  useEffect(() => {
    fetch('/api/now-playing')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setTracks(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className={`animate-fade-in-up h-full ${getContainerClasses()}`} style={{ animationDelay: "200ms" }}>
         <h2 className={getTitleClasses()}>
            Heavy Rotation <Disc3 className={getIconClasses()} />
         </h2>
         <div className="animate-pulse space-y-3">
           <div className="h-14 bg-border/40 rounded-xl w-full"></div>
           <div className="h-14 bg-border/40 rounded-xl w-full"></div>
           <div className="h-14 bg-border/40 rounded-xl w-full"></div>
         </div>
      </div>
    );
  }

  if (tracks.length === 0) return null;

  return (
    <div className={`animate-fade-in-up h-full ${getContainerClasses()}`} style={{ animationDelay: "200ms" }}>
      <h2 className={getTitleClasses()}>
        Heavy Rotation 
        <Disc3 className={getIconClasses()} />
      </h2>
      <div className="flex flex-col gap-3">
        {tracks.map((track, i) => (
          <a key={i} href={track.url} target="_blank" rel="noopener noreferrer" className={getTrackClasses()}>
            <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-neutral-200 dark:bg-neutral-800 border border-border/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {track.cover ? (
                <Image src={track.cover} alt={track.title} width={48} height={48} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              ) : (
                <Disc3 className="w-6 h-6 text-muted m-auto mt-3" />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className={`text-sm ${theme === 'minimal' ? 'font-medium' : 'font-bold'} text-foreground truncate`}>{track.title}</span>
              <span className="text-xs text-muted truncate">{track.artist}</span>
            </div>
            {track.nowPlaying && (
              <div className="ml-auto opacity-100 transition-opacity pr-2">
                <div className="flex items-end gap-1 h-4">
                  <span className={`w-1 rounded-full ${getVisualizerClasses()} h-full animate-[bounce_1s_ease-in-out_infinite_0ms]`} />
                  <span className={`w-1 rounded-full ${getVisualizerClasses()} h-2/3 animate-[bounce_1s_ease-in-out_infinite_150ms]`} />
                  <span className={`w-1 rounded-full ${getVisualizerClasses()} h-4/5 animate-[bounce_1s_ease-in-out_infinite_300ms]`} />
                </div>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
