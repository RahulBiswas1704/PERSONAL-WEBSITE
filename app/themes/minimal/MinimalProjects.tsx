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

export default function MinimalProjects({ projects }: { projects: any[] }) {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16 font-sans">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
          Projects
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
          A collection of SaaS platforms, tools, and coding experiments.
        </p>
      </div>

      <div className="space-y-12">
        {projects.map((project) => (
          <article key={project.title} className="group border-b border-neutral-200 dark:border-neutral-800 pb-12 last:border-0 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/10 transition-colors -mx-6 px-6 pt-6 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl font-medium text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h2>
              <div className="flex items-center gap-4 text-neutral-400">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500 transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-neutral-500 text-lg leading-relaxed mb-6 max-w-3xl">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string) => (
                  <span key={tech} className="text-sm text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.slug && (
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors pb-6"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                Read Case Study →
              </Link>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
