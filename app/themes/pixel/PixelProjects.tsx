import { ArrowUpRight, Folder } from "lucide-react";
import Link from "next/link";

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

export default function PixelProjects({ projects }: { projects: any[] }) {
  return (
    <div className="min-h-screen bg-[#e0f8d0] dark:bg-[#0f380f] font-pixel text-[#0f380f] dark:text-[#9bbc0f] p-4 sm:p-8 relative selection:bg-[#8bac0f] selection:text-[#0f380f]">
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#0f380f 1px, transparent 1px), linear-gradient(90deg, #0f380f 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-5xl mx-auto relative z-10 pt-16">
        
        <header className="mb-12 border-4 border-black dark:border-white bg-[#8bac0f] dark:bg-[#306230] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)]">
          <h1 className="text-3xl md:text-5xl uppercase mb-4 flex items-center gap-4">
            <span className="text-4xl">📜</span> Quest Log
          </h1>
          <p className="text-xs md:text-sm uppercase leading-relaxed max-w-2xl border-t-4 border-black dark:border-white pt-4">
            Completed missions and ongoing adventures in the digital realm. Choose a quest to view details.
          </p>
        </header>

        <div className="grid gap-8">
          {projects.map((project, i) => (
            <div 
              key={project.slug}
              className="group border-4 border-black dark:border-white bg-[#e0f8d0] dark:bg-[#0f380f] p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] hover:bg-[#8bac0f] dark:hover:bg-[#306230] hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-black dark:bg-white border-4 border-black dark:border-white overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="absolute inset-0 bg-[#8bac0f]/50 dark:bg-[#306230]/50 mix-blend-color group-hover:opacity-0 transition-opacity z-10 pointer-events-none" />
                  <img src={`https://placehold.co/400x400/0f380f/9bbc0f.png?text=${encodeURIComponent(project.title)}`} alt={project.title} className="object-cover w-full h-full pixelated" style={{ imageRendering: 'pixelated' }} />
                </div>
                
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl uppercase mb-4 group-hover:underline">{project.title}</h2>
                    <p className="text-xs uppercase leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech?.map((t: string) => (
                        <span key={t} className="text-[8px] border-2 border-black dark:border-white px-2 py-1 uppercase">{t}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-auto border-t-2 border-black/20 dark:border-white/20 pt-4">
                    {project.slug && (
                      <Link href={`/projects/${project.slug}`} className="text-[10px] uppercase border-2 border-black dark:border-white px-3 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-2">
                        <Folder className="w-4 h-4" /> View Details
                      </Link>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase border-2 border-transparent hover:border-black dark:hover:border-white px-3 py-2 transition-colors flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase border-2 border-transparent hover:border-black dark:hover:border-white px-3 py-2 transition-colors flex items-center gap-2">
                        <Github className="w-4 h-4" /> Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
