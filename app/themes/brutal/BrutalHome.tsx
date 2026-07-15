import Link from "next/link";
import { ArrowRight, Fingerprint, Activity, Layers, ArrowDownRight } from "lucide-react";

export default function BrutalHome({ posts }: { posts: any[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, '.');
  };

  return (
    <div className="space-y-16 pb-16 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-screen">
      
      {/* Global CSS for the graph paper background */}
      <style dangerouslySetInnerHTML={{__html: `
        body {
          background-color: #f4f4f0 !important;
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px) !important;
          background-size: 24px 24px !important;
          color: black !important;
        }
        /* Brutal shadow utility */
        .brutal-shadow {
          box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
        }
        .brutal-shadow:active {
          box-shadow: 0px 0px 0px 0px rgba(0,0,0,1);
          transform: translate(6px, 6px);
        }
      `}} />

      {/* Intro Section */}
      <section className="border-4 border-black p-6 sm:p-12 bg-[#f4f4f0] brutal-shadow relative overflow-hidden">
        {/* Schematic elements */}
        <div className="absolute top-0 right-0 w-32 h-32 border-l-4 border-b-4 border-black flex items-center justify-center opacity-20">
          <Layers className="w-16 h-16" strokeWidth={1} />
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-bold tracking-widest opacity-50">
          FIG 1.0 — SYSTEM MGR
        </div>
        
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-4 mb-4 border-b-4 border-black pb-4 inline-block w-fit">
            <Fingerprint className="w-10 h-10" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
              RAHUL_BISWAS
            </h1>
          </div>
          
          <div className="space-y-4 max-w-2xl text-lg sm:text-xl font-bold uppercase leading-tight">
            <p>
              [ ROLE: SYSTEM_MANAGER / PROJECT_MANAGER ]
            </p>
            <p className="text-sm sm:text-base border-l-4 border-black pl-4">
              Executing strategic roadmaps and optimizing internal systems since 2020. Based in India. Building robust and scalable schematic solutions for complex environments.
            </p>
            <div className="pt-6">
              <Link 
                href="/me"
                className="inline-flex items-center gap-3 px-6 py-3 border-4 border-black bg-black text-[#f4f4f0] hover:bg-[#f4f4f0] hover:text-black transition-colors uppercase font-bold tracking-widest brutal-shadow"
              >
                ACCESS_PROFILE <ArrowDownRight className="w-5 h-5" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Projects link */}
      <section className="border-4 border-black p-6 sm:p-8 bg-[#f4f4f0] brutal-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-3">
            <Activity className="w-6 h-6" strokeWidth={2} />
            BLUEPRINTS & PROJECTS
          </h2>
          <p className="text-sm font-bold uppercase mt-2">View the technical schematics of my recent work.</p>
        </div>
        <Link 
          href="/projects"
          className="px-6 py-3 border-4 border-black bg-[#f4f4f0] text-black hover:bg-black hover:text-[#f4f4f0] transition-colors uppercase font-bold tracking-widest brutal-shadow whitespace-nowrap"
        >
          VIEW_ALL_BLUEPRINTS
        </Link>
      </section>

      {/* Latest Logs (Posts) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-widest border-b-4 border-black pb-2 inline-block">
          SYS_LOGS // LATEST
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/projects/${post.slug}`}
              className="group block border-4 border-black bg-[#f4f4f0] p-6 hover:bg-black hover:text-[#f4f4f0] transition-colors brutal-shadow relative"
            >
              <div className="absolute top-2 right-2 border-2 border-current px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                LOG_{formatDate(post.metadata.date)}
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-black uppercase mb-3 leading-tight">{post.metadata.title}</h3>
                <p className="text-sm font-bold uppercase opacity-80 line-clamp-3">{post.metadata.summary}</p>
              </div>
            </Link>
          )) : (
            <div className="border-4 border-black p-6 bg-[#f4f4f0] brutal-shadow font-bold uppercase">
              NO_LOGS_FOUND_IN_DB
            </div>
          )}
        </div>
      </section>
      
    </div>
  );
}
