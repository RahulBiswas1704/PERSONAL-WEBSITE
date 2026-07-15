import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ModernProjects({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16">
      {/* Title block */}
      <div className="relative pt-8 pb-10 mb-8 border-b-2 border-dashed border-border/60">
        <div className="absolute top-0 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        
        <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-emerald-950 dark:text-emerald-50 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500 w-fit">
          PROJECTS.
        </h1>
        
        <div className="absolute top-16 sm:top-20 left-48 sm:left-64 transform -rotate-3 bg-accent text-white px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:-rotate-6 transition-transform duration-300 z-20">
          My Work
        </div>
        
        <p className="text-lg sm:text-xl text-emerald-800 dark:text-emerald-200 mt-8 max-w-xl relative z-10 font-serif italic leading-relaxed">
          &quot;A chaotic collection of SaaS platforms, tools, and late-night coding experiments.&quot;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

        {projects.map((project, i) => {
          const rotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];
          const themes = [
            {
              bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50 hover:border-blue-400 dark:hover:border-blue-600",
              mainText: "text-blue-950 dark:text-blue-50",
              descText: "text-blue-900 dark:text-blue-100",
              iconBg: "bg-blue-200/50 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200",
              badge: "bg-white/80 dark:bg-black/60 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
              btn: "text-blue-950 dark:text-white bg-blue-50/50 dark:bg-black border-blue-300 dark:border-blue-800 hover:bg-blue-600 hover:text-white hover:border-blue-600"
            },
            {
              bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400 dark:hover:border-emerald-600",
              mainText: "text-emerald-950 dark:text-emerald-50",
              descText: "text-emerald-900 dark:text-emerald-100",
              iconBg: "bg-emerald-200/50 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200",
              badge: "bg-white/80 dark:bg-black/60 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100",
              btn: "text-emerald-950 dark:text-white bg-emerald-50/50 dark:bg-black border-emerald-300 dark:border-emerald-800 hover:bg-emerald-600 hover:text-white hover:border-emerald-600"
            },
            {
              bg: "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 hover:border-rose-400 dark:hover:border-rose-600",
              mainText: "text-rose-950 dark:text-rose-50",
              descText: "text-rose-900 dark:text-rose-100",
              iconBg: "bg-rose-200/50 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200",
              badge: "bg-white/80 dark:bg-black/60 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100",
              btn: "text-rose-950 dark:text-white bg-rose-50/50 dark:bg-black border-rose-300 dark:border-rose-800 hover:bg-rose-600 hover:text-white hover:border-rose-600"
            },
            {
              bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-600",
              mainText: "text-amber-950 dark:text-amber-50",
              descText: "text-amber-900 dark:text-amber-100",
              iconBg: "bg-amber-200/50 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200",
              badge: "bg-white/80 dark:bg-black/60 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
              btn: "text-amber-950 dark:text-white bg-amber-50/50 dark:bg-black border-amber-300 dark:border-amber-800 hover:bg-amber-600 hover:text-white hover:border-amber-600"
            }
          ];
          
          const rotationClass = rotations[i % rotations.length];
          const theme = themes[i % themes.length];

          return (
            <div
              key={project.title}
              className={`group relative border-2 rounded-3xl p-6 sm:p-8 transition-all duration-300 transform ${rotationClass} hover:rotate-0 hover:-translate-y-1 shadow-sm hover:shadow-md ${theme.bg} flex flex-col`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-neutral-200/80 dark:bg-neutral-700/80 backdrop-blur-sm -rotate-2 shadow-sm" />
              
              <div className="flex items-start justify-between gap-4">
                <h2 className={`text-2xl font-black font-serif transition-colors ${theme.mainText}`}>{project.title}</h2>
                <div className={`flex items-center gap-3 px-3 py-1.5 rounded-full ${theme.iconBg}`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-all duration-150"
                      aria-label={`View ${project.title} code on GitHub`}
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-all duration-150"
                      aria-label={`Visit ${project.title} website`}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <p className={`text-sm sm:text-base leading-relaxed mt-4 mb-6 flex-grow font-medium ${theme.descText}`}>
                {project.description}
              </p>
              
              {project.slug && (
                <Link 
                  href={`/projects/${project.slug}`}
                  className={`self-start inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all duration-300 px-5 py-3 rounded-xl shadow-sm border-2 hover:scale-105 mb-6 ${theme.btn}`}
                >
                  <FileText className="w-4 h-4" />
                  Case Study
                </Link>
              )}

              <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t-2 border-dashed border-border/40">
                {project.tech.map((tech: string, j: number) => (
                  <span
                    key={tech}
                    className={`text-xs font-bold font-mono px-3 py-1 rounded-lg border shadow-sm cursor-default transition-colors ${j%2===0 ? 'rotate-1' : '-rotate-1'} ${theme.badge}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "CreativeWork",
                "name": project.title,
                "description": project.description,
                "url": project.link || "https://rahul-website.vercel.app/projects"
              }
            }))
          })
        }}
      />
    </div>
  );
}
