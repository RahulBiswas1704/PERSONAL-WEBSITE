import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";
import ShareRoastButton from "@/components/sandbox/ShareRoastButton";

export default function MinimalSandbox() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16 min-h-[calc(100vh-8rem)] flex flex-col font-sans">
      <div className="flex justify-between items-start">
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
            Roast Room
          </h1>
          <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
            Meet Kishmish. She's cute, she's sassy, and she will aggressively insult you in three languages.
          </p>
        </div>
        <div className="mt-2">
          <ShareRoastButton />
        </div>
      </div>

      <div className="flex-1 w-full border-t border-indigo-100 dark:border-indigo-900/30 pt-12 flex flex-col items-center justify-center">
        <LiveRoasterWrapper />
      </div>
    </div>
  );
}
