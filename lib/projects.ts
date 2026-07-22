export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  slug?: string;
}

export const projects: Project[] = [
  {
    title: "bowlit",
    description: "Centralized kitchen and batch-delivery logistics platform. Automates tiffin order aggregation, geographical driver route batching, and daily subscription cancellations for our food prep facilities.",
    tech: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/RahulBiswas1704/BowlIt-app",
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
