"use client";

import dynamic from 'next/dynamic';

const LiveRoaster = dynamic(() => import('@/components/sandbox/LiveRoaster'), { 
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center p-12 w-full max-w-4xl mx-auto min-h-[400px] border-2 border-dashed border-amber-900/30 rounded-3xl animate-pulse">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-amber-700 dark:text-amber-500 font-mono text-sm tracking-widest uppercase">Waking up Kishmish...</p>
    </div>
  )
});

export default function LiveRoasterWrapper() {
  return <LiveRoaster />;
}
