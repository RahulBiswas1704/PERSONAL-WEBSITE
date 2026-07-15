import { Metadata } from "next";
import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";
import ShareRoastButton from "@/components/sandbox/ShareRoastButton";

export const metadata: Metadata = {
  title: "Kishmish's Roast Room",
  description: "Live AI Roaster.",
  openGraph: {
    title: "Kishmish's Roast Room",
    description: "Get roasted by Kishmish, an unhinged AI, on Rahul Biswas's site! 🐈‍⬛🔥",
    url: "https://rahul-biswas.vercel.app/sandbox",
    images: [{ url: "https://rahul-biswas.vercel.app/api/og?title=Kishmish's Roast Room&description=Beware of Cat." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishmish's Roast Room",
    description: "Get roasted by Kishmish, an unhinged AI, on Rahul Biswas's site! 🐈‍⬛🔥",
    images: ["https://rahul-biswas.vercel.app/api/og?title=Kishmish's Roast Room&description=Beware of Cat."],
  },
};

export default function SandboxPage() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16 min-h-[calc(100vh-8rem)] flex flex-col relative">
      <ShareRoastButton />
      {/* Title block */}
      <div className="relative pt-8 pb-10 mb-2 border-b-2 border-dashed border-border/60 shrink-0">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-amber-950 dark:text-amber-50 relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 w-fit">
          THE ROAST ROOM.
        </h1>
        
        <div className="absolute top-16 sm:top-20 left-48 sm:left-[450px] transform rotate-3 bg-accent text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:rotate-6 transition-transform duration-300 z-20">
          Beware of Cat
        </div>
        
        <p className="text-lg sm:text-xl text-amber-900 dark:text-amber-100 mt-8 max-w-xl relative z-10 font-serif italic leading-relaxed">
          &quot;Meet Kishmish. She's cute, she's sassy, and she will aggressively insult you in three languages. Proceed at your own risk.&quot;
        </p>
      </div>

      <div className="flex-1 w-full relative z-10 flex flex-col items-center justify-center">
        <LiveRoasterWrapper />
      </div>
    </div>
  );
}
