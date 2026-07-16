import Link from "next/link";
import { ExternalLink, FileText, Terminal } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

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

export default function RetroProjects({ projects }: { projects: any[] }) {
  return (
    <div className="min-h-screen bg-[#f4ebd0] dark:bg-black space-y-8 sm:space-y-16 pb-24 sm:pb-16 px-2 sm:px-0 font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black overflow-x-hidden">
      <CRTEffect />
      
      {/* Header */}
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 mx-2 sm:mx-0">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-widest break-all">
            PROJECTS.DIR
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-6 bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest w-fit border-2 border-transparent">
          [ MY_WORK ]
        </div>
        
        <p className="text-lg uppercase opacity-80 border-t-4 border-[#4a3b2c] dark:border-green-500 pt-4 mt-4 leading-relaxed">
          &gt; "A chaotic collection of SaaS platforms, tools, and late-night coding experiments."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10 mx-2 sm:mx-0">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="group relative border-4 border-[#4a3b2c] dark:border-green-500 bg-white/50 dark:bg-black/50 p-4 sm:p-8 flex flex-col hover:bg-[#f4ebd0] dark:hover:bg-black transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase">{project.title}</h2>
              <div className="flex items-center gap-3 border-2 border-[#4a3b2c] dark:border-green-500 px-3 py-1.5">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black hover:bg-[#4a3b2c] dark:hover:bg-green-500 dark:hover:text-black transition-colors p-1"
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
                    className="hover:text-black hover:bg-[#4a3b2c] dark:hover:bg-green-500 dark:hover:text-black transition-colors p-1"
                    aria-label={`Visit ${project.title} website`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-sm sm:text-base leading-relaxed mb-6 flex-grow uppercase opacity-90">
              &gt; {project.description}
            </p>
            
            {project.slug && (
              <Link 
                href={`/projects/${project.slug}`}
                className="self-start inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors px-5 py-3 border-4 border-[#4a3b2c] dark:border-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black mb-6"
              >
                <FileText className="w-4 h-4" />
                [ READ_LOG ]
              </Link>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t-4 border-[#4a3b2c] dark:border-green-500">
              {project.tech.map((tech: string, j: number) => (
                <span
                  key={tech}
                  className="text-xs font-bold uppercase px-3 py-1 border-2 border-[#4a3b2c] dark:border-green-500 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors cursor-default"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </div>
        ))}
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
