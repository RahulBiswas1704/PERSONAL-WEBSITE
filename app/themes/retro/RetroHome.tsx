import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";
import SocialGrid from "@/components/SocialGrid";
import SurpriseMe from "@/components/SurpriseMe";
import NowDoing from "@/components/NowDoing";
import HeavyRotation from "@/components/HeavyRotation";

export default function RetroHome({ posts }: { posts: any[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4ebd0] dark:bg-black space-y-8 sm:space-y-16 pb-24 sm:pb-16 px-2 sm:px-0 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black overflow-x-hidden">
      <CRTEffect />
      
      {/* Intro Section */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] relative bg-white/50 dark:bg-black/50 backdrop-blur-sm mx-2 sm:mx-0">
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 border-b-4 border-[#4a3b2c] dark:border-green-500 pb-4">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest break-all">
            NAMASTE.
          </h1>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <p className="text-lg sm:text-xl leading-relaxed uppercase font-bold border-2 border-current px-3 py-1.5 sm:px-4 sm:py-2 inline-block">
            &gt; HI, I'M RAHUL
          </p>
          <p className="text-sm opacity-90 leading-relaxed uppercase max-w-2xl">
            &gt; Welcome to my digital Aangan (courtyard).
            <br />
            &gt; I am a System & Project Manager based in West Bengal.
            <br />
            &gt; I love building beautiful digital products, exploring complex systems, and creating open-source tools.
          </p>
          <div className="pt-2 sm:pt-4 flex flex-wrap gap-4">
            <Link 
              href="/me"
              className="px-4 py-2 sm:px-6 sm:py-3 border-4 border-[#4a3b2c] dark:border-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors uppercase font-bold tracking-widest flex items-center gap-2 text-sm sm:text-base"
            >
              [ INIT_PROFILE ] <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Surprise Me Sandbox */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] relative bg-white/50 dark:bg-black/50 backdrop-blur-sm mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-[#4a3b2c] dark:border-green-500 pb-4 mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest break-words">
            <span className="animate-pulse">_</span> CHAMATKAR_SANDBOX.EXE
          </h2>
          <span className="text-xs uppercase font-bold border-2 border-current px-2 py-1 self-start sm:self-auto">[ TRY_IT ]</span>
        </div>
        <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 bg-[#f4ebd0] dark:bg-black">
          <SurpriseMe />
        </div>
      </section>

      {/* Latest Logs (Posts) */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] relative bg-white/50 dark:bg-black/50 backdrop-blur-sm mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-4 border-[#4a3b2c] dark:border-green-500 pb-4 mb-6 sm:mb-8 gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="animate-pulse">_</span> SYSTEM_LOGS
            </h2>
            <p className="text-xs uppercase opacity-80">&gt; A glimpse into what I've been building.</p>
          </div>
          <Link href="/projects" className="text-sm font-bold border-2 border-current px-3 py-1 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors uppercase self-start sm:self-auto">
            [ VIEW_ALL ]
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {posts.length > 0 ? posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/projects/${post.slug}`}
              className="group block border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-6 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors bg-[#f4ebd0] dark:bg-black"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold uppercase mb-2 group-hover:text-current">{post.metadata.title}</h3>
                  <p className="opacity-80 group-hover:text-current">{post.metadata.summary}</p>
                </div>
                <div className="text-sm border-2 border-current px-3 py-1 font-bold whitespace-nowrap">
                  {formatDate(post.metadata.date).toUpperCase()}
                </div>
              </div>
            </Link>
          )) : (
            <p className="text-sm uppercase opacity-80 border-4 border-[#4a3b2c] dark:border-green-500 p-4">NO_LOGS_FOUND</p>
          )}
        </div>
      </section>

      {/* Social Networks & Dashboard */}
      <section className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] relative bg-white/50 dark:bg-black/50 backdrop-blur-sm space-y-8 sm:space-y-10 mx-2 sm:mx-0">
        <div className="space-y-4">
          <div className="border-b-4 border-[#4a3b2c] dark:border-green-500 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-widest">
              <span className="animate-pulse">_</span> SYS_COMM_LINK
            </h2>
            <p className="text-xs uppercase opacity-80 mt-2">&gt; Establish connection over a cup of tea.</p>
          </div>
          <div className="bg-[#f4ebd0] dark:bg-black p-4 border-4 border-[#4a3b2c] dark:border-green-500">
            <SocialGrid />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-[#f4ebd0] dark:bg-black p-4 sm:p-6 border-4 border-[#4a3b2c] dark:border-green-500 overflow-hidden">
            <div className="uppercase font-bold text-sm mb-4 border-b-2 border-current pb-2 break-words">SYS_STATUS.LOG</div>
            <NowDoing />
          </div>
          <div className="bg-[#f4ebd0] dark:bg-black p-4 sm:p-6 border-4 border-[#4a3b2c] dark:border-green-500 overflow-hidden">
            <div className="uppercase font-bold text-sm mb-4 border-b-2 border-current pb-2 break-words">AUDIO_STREAM.DAT</div>
            <HeavyRotation />
          </div>
        </div>
      </section>
      
    </div>
  );
}
