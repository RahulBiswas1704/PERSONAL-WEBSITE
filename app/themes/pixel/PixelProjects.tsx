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
    <section id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Sticky Left Header */}
          <div className="lg:col-span-5 relative">
            <header className="sticky top-32 pb-8">
              <h1 className="text-6xl sm:text-[6rem] lg:text-[7rem] font-black uppercase tracking-tighter leading-[0.9] mb-8 break-all sm:break-normal text-stroke-2 hover:text-black dark:hover:text-white transition-colors duration-300 cursor-default">
                Selected<br/>Works
              </h1>
              <p className="text-xl md:text-2xl font-bold max-w-sm uppercase opacity-80">
                A brutal collection of platforms, tools, and digital experiments.
              </p>
            </header>
          </div>

          {/* Scrolling Projects on Right */}
          <div className="lg:col-span-7 flex flex-col">
            {projects.map((project, i) => (
              <div 
                key={project.slug || project.title}
                className={`group border-t border-black/20 dark:border-white/20 py-12 md:py-16 relative overflow-hidden flex flex-col ${i === projects.length - 1 ? "border-b border-black/20 dark:border-white/20" : ""}`}
              >
                <div className="flex flex-col gap-6 mb-8">
                  <div className="flex justify-between items-start">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.04em] transition-all break-all sm:break-normal flex items-center gap-4 group-hover:translate-x-4 duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
                      <ArrowUpRight className="w-10 h-10 opacity-0 -ml-14 group-hover:opacity-100 transition-all duration-500 text-[#CCFF00]" />
                      {project.title}
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="text-xl font-bold uppercase opacity-80">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech?.map((t: string) => (
                        <span key={t} className="text-[10px] font-black border border-black/20 dark:border-white/20 px-3 py-1.5 uppercase rounded-none tracking-widest bg-black/5 dark:bg-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 relative z-10 mt-4">
                  {project.slug && (
                    <Link href={`/projects/${project.slug}`} className="text-sm font-black uppercase border border-black dark:border-white px-6 py-3 hover-shimmer transition-colors flex items-center gap-2 bg-transparent text-black dark:text-white hover:text-black tracking-widest">
                      Case Study <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </Link>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-black uppercase underline hover:no-underline px-4 py-3 transition-colors flex items-center gap-2 tracking-widest opacity-80 hover:opacity-100 hover:text-[#CCFF00]">
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm font-black uppercase underline hover:no-underline px-4 py-3 transition-colors flex items-center gap-2 tracking-widest opacity-80 hover:opacity-100 hover:text-[#CCFF00]">
                      <GithubIcon className="w-4 h-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
