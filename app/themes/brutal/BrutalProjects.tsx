import { ArrowUpRight, FolderGit2, Cpu } from "lucide-react";

export default function BrutalProjects({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-16 pb-16 font-mono text-black selection:bg-black selection:text-[#f4f4f0] min-h-screen">
      
      {/* Header */}
      <div className="border-4 border-black p-8 bg-[#f4f4f0] brutal-shadow relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Cpu className="w-64 h-64" strokeWidth={1} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <FolderGit2 className="w-10 h-10" strokeWidth={1.5} />
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter" style={{ fontFamily: 'Impact, monospace' }}>
              PROJECT_BLUEPRINTS
            </h1>
          </div>
          <p className="text-lg uppercase font-bold border-l-4 border-black pl-4 mt-6">
            SCHEMATICS_AND_IMPLEMENTATIONS // 
            <br />
            A collection of things I've built, managed, or engineered.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <a 
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-4 border-black bg-[#f4f4f0] p-6 hover:bg-black hover:text-[#f4f4f0] transition-colors relative brutal-shadow flex flex-col h-full"
          >
            <div className="absolute top-0 right-0 border-b-4 border-l-4 border-black p-2 bg-[#f4f4f0] group-hover:bg-black group-hover:border-[#f4f4f0] transition-colors">
              <ArrowUpRight className="w-6 h-6" strokeWidth={2} />
            </div>
            
            <div className="mb-6 border-b-4 border-current pb-4 pr-12">
              <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                SCHEMATIC_ID: {idx.toString().padStart(3, '0')}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none mb-3">
                {project.title}
              </h2>
              <div className="inline-block border-2 border-current px-2 py-1 text-sm font-bold uppercase tracking-widest">
                ROLE: {project.role}
              </div>
            </div>
            
            <p className="text-sm font-bold uppercase opacity-80 leading-relaxed flex-grow">
              {project.description}
            </p>
            
            {project.tags && project.tags.length > 0 && (
              <div className="mt-8 pt-4 border-t-2 border-dashed border-current flex flex-wrap gap-2">
                {project.tags.map((tag: string, i: number) => (
                  <span key={i} className="text-xs font-black uppercase px-2 py-1 border-2 border-current">
                    {tag}
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
