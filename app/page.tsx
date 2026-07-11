import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";
import SocialGrid from "@/components/SocialGrid";
import SurpriseMe from "@/components/SurpriseMe";
import NowDoing from "@/components/NowDoing";
import HeavyRotation from "@/components/HeavyRotation";
import AccentPicker from "@/components/AccentPicker";
import TypewriterCycler from "@/components/TypewriterCycler";
import InteractiveWave from "@/components/InteractiveWave";
import FloatingShapes from "@/components/FloatingShapes";

export default function Home() {
  const posts = getSortedPosts().slice(0, 3); // Get latest 3 posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-16 animate-fade-in-up relative pb-16">
      <FloatingShapes />
      
      {/* Hero Section */}
      <div className="relative pt-8 pb-10 mb-8 border-b-2 border-dashed border-border/60">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-foreground relative z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-500 w-fit">
          NAMASTE.
        </h1>
        
        <div className="absolute top-16 sm:top-20 left-48 sm:left-72 flex items-center gap-2 transform rotate-3 bg-orange-600 dark:bg-orange-700 text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:rotate-6 transition-transform duration-300 z-20">
          Hi, I&apos;m Rahul <InteractiveWave />
        </div>
        
        <p className="text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 mt-8 max-w-xl relative z-10 font-serif leading-relaxed">
          Welcome to my digital <em className="text-orange-600 dark:text-orange-400 font-bold">Aangan</em> (courtyard). I am a <span className="inline-block"><TypewriterCycler /></span> based in West Bengal. I love building beautiful digital products, exploring complex systems, and creating open-source tools.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 relative z-10">

        {/* Surprise Me Sandbox */}
        <section id="sandbox" className="relative transform rotate-1 hover:rotate-0 transition-all duration-500 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md">
          <div className="absolute -top-3 right-10 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-2 shadow-sm" />
          <div className="mb-4 flex items-center justify-between border-b-2 border-dashed border-emerald-200 dark:border-emerald-900/50 pb-2">
            <h2 className="text-xl font-black text-emerald-900 dark:text-emerald-100 font-serif">Chamatkar (Magic Box)</h2>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-2 py-1 rounded-md transform rotate-2">Try it</span>
          </div>
          <div className="bg-white dark:bg-black rounded-2xl p-4 border-2 border-emerald-200 dark:border-emerald-900/50">
            <SurpriseMe />
          </div>
        </section>

        {/* Recent Posts Section */}
        <section id="projects" className="relative transform -rotate-1 hover:rotate-0 transition-all duration-500 bg-sky-50 dark:bg-sky-950/20 border-2 border-sky-200 dark:border-sky-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md">
          <div className="absolute -top-3 left-10 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm rotate-3 shadow-sm" />
          
          <div className="flex items-center justify-between mb-6 border-b-2 border-dashed border-sky-200 dark:border-sky-900/50 pb-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-sky-900 dark:text-sky-100 font-serif">Recent Crafts (Kriti)</h2>
              <p className="text-sm font-medium text-sky-800 dark:text-sky-200">A glimpse into what I've been building.</p>
            </div>
            <Link href="/projects" className="text-xs font-mono text-sky-900 dark:text-sky-100 font-bold uppercase tracking-widest border-2 border-sky-900 dark:border-sky-100 rounded-full px-3 py-1 bg-white/50 dark:bg-black/30 hover:bg-sky-600 hover:text-white transition-colors transform rotate-2">
              View All
            </Link>
          </div>
          
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post, i) => (
                <article key={post.slug} className={`group relative overflow-hidden rounded-xl border-2 border-sky-200 dark:border-sky-900/50 bg-white/80 dark:bg-black/60 p-5 transition-colors hover:border-sky-400 dark:hover:border-sky-700 transform ${i % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}`}>
                  <Link href={`/projects/${post.slug}`} className="block space-y-2 relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h3 className="text-lg font-bold text-sky-900 dark:text-sky-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-150">
                        {post.metadata.title}
                      </h3>
                      <time className="text-xs text-sky-700 dark:text-sky-300 font-mono font-bold bg-sky-100 dark:bg-sky-900 px-2 py-0.5 rounded-md shrink-0 border border-sky-200 dark:border-sky-800">
                        {formatDate(post.metadata.date)}
                      </time>
                    </div>
                    <p className="text-sm text-sky-800 dark:text-sky-200 font-medium leading-relaxed">
                      {post.metadata.summary}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm font-medium text-sky-800 dark:text-sky-200">No projects found.</p>
          )}
        </section>

        {/* Social Networks & Dashboard */}
        <section id="connect" className="relative transform rotate-1 hover:rotate-0 transition-all duration-500 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md space-y-10">
          <div className="absolute -top-3 right-1/4 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-3 shadow-sm" />
          
          <div className="space-y-4">
            <div className="border-b-2 border-dashed border-amber-200 dark:border-amber-900/50 pb-4">
              <h2 className="text-2xl font-black text-amber-900 dark:text-amber-100 font-serif">Chai Pe Charcha</h2>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mt-1">Let&apos;s connect over a cup of tea.</p>
            </div>
            <div className="bg-white/50 dark:bg-black/30 p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/50">
              <SocialGrid />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-black p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/50 transform -rotate-1">
              <NowDoing />
            </div>
            <div className="bg-white dark:bg-black p-5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/50 transform rotate-1">
              <HeavyRotation />
            </div>
          </div>
          
        </section>
      </div>
    </div>
  );
}
