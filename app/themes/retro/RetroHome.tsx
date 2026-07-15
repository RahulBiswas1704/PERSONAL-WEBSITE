import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function RetroHome({ posts }: { posts: any[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-16 pb-16 font-mono text-green-500 selection:bg-green-500 selection:text-black">
      
      {/* Intro Section */}
      <section className="border-4 border-green-500 p-8 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] relative bg-black">
        <div className="flex items-center gap-4 mb-8 border-b-4 border-green-500 pb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest">
            Rahul Biswas_
          </h1>
        </div>
        
        <div className="space-y-6">
          <p className="text-xl leading-relaxed">
            &gt; SYSTEM MANAGER
            <br />
            &gt; PROJECT MANAGER
            <br />
            &gt; FULL-STACK HACKER
          </p>
          <p className="text-sm opacity-80 leading-relaxed uppercase max-w-2xl">
            Executing strategic roadmaps and optimizing internal systems since 2020. Based in India. Building robust and scalable solutions. Welcome to my digital Aangan (courtyard).
          </p>
          <div className="pt-4 flex flex-wrap gap-4">
            <Link 
              href="/me"
              className="px-6 py-3 border-2 border-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase font-bold tracking-widest flex items-center gap-2"
            >
              [ INIT_PROFILE ] <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Logs (Posts) */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b-4 border-green-500 pb-4">
          <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="animate-pulse">_</span> SYSTEM_LOGS
          </h2>
          <Link href="/projects" className="text-sm hover:underline uppercase flex items-center gap-1">
            VIEW_ALL_LOGS <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {posts.length > 0 ? posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/projects/${post.slug}`}
              className="group block border-2 border-green-500 p-6 hover:bg-green-500 hover:text-black transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold uppercase mb-2 group-hover:text-black">{post.metadata.title}</h3>
                  <p className="opacity-80 group-hover:text-black/80">{post.metadata.summary}</p>
                </div>
                <div className="text-sm border border-current px-3 py-1 font-bold whitespace-nowrap">
                  {formatDate(post.metadata.date).toUpperCase()}
                </div>
              </div>
            </Link>
          )) : (
            <p className="text-sm uppercase opacity-80 border-2 border-green-500 p-4">NO_LOGS_FOUND</p>
          )}
        </div>
      </section>
      
    </div>
  );
}
