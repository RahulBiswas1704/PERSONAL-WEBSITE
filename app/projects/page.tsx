import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { Metadata } from "next";

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

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  slug?: string;
}

const projects: Project[] = [
  {
    title: "bowlit",
    description: "Centralized kitchen and batch-delivery logistics platform. Automates tiffin order aggregation, geographical driver route batching, and daily subscription cancellations for our food prep facilities.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    link: "https://bowlit.in",
    slug: "building-bowlit",
  },
  {
    title: "Camera Wale",
    description: "A platform for renting cameras and photography equipment.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    github: "https://github.com/RahulBiswas1704/camera-wale",
    link: "https://camera-wale.vercel.app/",
    slug: "camera-wale",
  },
];

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of platforms, applications, and tools I have built.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects</h1>
        <p className="text-sm text-muted dark:text-neutral-400 mt-1">
          A log of projects, SaaS platforms, and open-source tools I have designed and built.
        </p>
      </div>

      <div className="space-y-8 pt-4">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative border border-border rounded-md p-5 bg-background hover:border-accent/40 transition-colors duration-150"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-base font-bold text-foreground">{project.title}</h2>
              <div className="flex items-center gap-3 text-muted-light dark:text-neutral-500">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors duration-150"
                    aria-label={`View ${project.title} code on GitHub`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors duration-150"
                    aria-label={`Visit ${project.title} website`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted dark:text-neutral-300 leading-relaxed mt-2 mb-4">
              {project.description}
            </p>
            
            {project.slug && (
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-accent hover:bg-accent/90 transition-colors duration-150 px-3.5 py-2 rounded-md shadow-sm border border-transparent hover:border-white/20"
              >
                <FileText className="w-3.5 h-3.5" />
                Read Case Study
              </Link>
            )}

            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/30">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-mono tracking-tight px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-muted-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
