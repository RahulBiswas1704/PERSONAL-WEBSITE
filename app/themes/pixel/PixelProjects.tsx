import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function PixelProjects({ projects }: { projects: any[] }) {
  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 border-b-2 border-black dark:border-white pb-8">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 break-all sm:break-normal">
            Selected<br/>Works
          </h1>
          <p className="text-xl md:text-3xl font-bold max-w-2xl uppercase">
            A brutal collection of platforms, tools, and digital experiments.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-16">
          {projects.map((project, i) => (
            <div 
              key={project.slug || project.title}
              className="group border-t-2 border-black dark:border-white pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter hover:italic transition-all break-all sm:break-normal">
                  {project.title}
                </h2>
                <div className="text-left md:text-right flex flex-col items-start md:items-end gap-4 w-full md:w-auto">
                  <p className="text-xl font-bold uppercase max-w-md text-left md:text-right">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                    {project.tech?.map((t: string) => (
                      <span key={t} className="text-xs font-bold border border-black dark:border-white px-2 py-1 uppercase rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {project.slug && (
                  <Link href={`/projects/${project.slug}`} className="text-sm md:text-lg font-bold uppercase border-2 border-black dark:border-white px-4 md:px-6 py-2 md:py-3 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-2">
                    Case Study <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                  </Link>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg font-bold uppercase underline hover:no-underline px-2 md:px-4 py-2 md:py-3 transition-colors flex items-center gap-2">
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm md:text-lg font-bold uppercase underline hover:no-underline px-2 md:px-4 py-2 md:py-3 transition-colors flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 md:w-5 md:h-5" /> Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
