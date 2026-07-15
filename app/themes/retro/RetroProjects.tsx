import { ArrowUpRight, Folder, Terminal } from "lucide-react";

export default function RetroProjects({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-16 pb-16 font-mono text-cyan-400 selection:bg-cyan-400 selection:text-black">
      
      {/* Header */}
      <div className="border-4 border-cyan-400 p-8 shadow-[8px_8px_0px_0px_rgba(34,211,238,1)] bg-black">
        <div className="flex items-center gap-4 mb-4">
          <Terminal className="w-8 h-8 animate-pulse" />
          <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-widest">
            DIR_PROJECTS
          </h1>
        </div>
        <p className="text-lg uppercase opacity-80 border-t-2 border-cyan-400/50 pt-4 mt-4">
          &gt; ls -la ./projects
          <br />
          &gt; A collection of things I've built, written, or contributed to.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <a 
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-2 border-cyan-400 bg-black p-6 hover:bg-cyan-400 hover:text-black transition-colors relative"
          >
            <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <Folder className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="text-xl font-bold uppercase group-hover:text-black mb-2">
                  {project.title}
                </h2>
                <div className="text-xs uppercase tracking-widest border border-current px-2 py-1 inline-block">
                  {project.role}
                </div>
              </div>
            </div>
            
            <p className="text-sm uppercase opacity-80 group-hover:text-black/80 mb-6 leading-relaxed">
              {project.description}
            </p>
            
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto border-t-2 border-current/30 pt-4">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-xs font-bold uppercase px-2 py-1 bg-cyan-900/50 group-hover:bg-black group-hover:text-cyan-400">
                    [{tag}]
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
