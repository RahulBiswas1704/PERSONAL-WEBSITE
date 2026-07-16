import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";

export default function PixelSandbox() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24 flex-1 flex flex-col w-full">
        
        <header className="mb-16 border-b-2 border-black dark:border-white pb-8 shrink-0">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 break-all sm:break-normal">
            KISHMISH
          </h1>
          <p className="text-xl md:text-3xl font-bold max-w-2xl uppercase">
            She's cute. She's sassy. She will roast you.
          </p>
        </header>

        <div className="flex-1 w-full relative z-10 flex flex-col items-center justify-center border-4 border-black dark:border-white p-4 sm:p-12">
          <LiveRoasterWrapper />
        </div>

      </div>
    </div>
  );
}
