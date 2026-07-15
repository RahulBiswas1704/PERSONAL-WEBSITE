"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernProjects from "@/app/themes/modern/ModernProjects";
import MinimalProjects from "@/app/themes/minimal/MinimalProjects";
import RetroProjects from "@/app/themes/retro/RetroProjects";
import BrutalProjects from "@/app/themes/brutal/BrutalProjects";
import PixelProjects from "@/app/themes/pixel/PixelProjects";

export default function ProjectsThemeRouter({ projects }: { projects: any[] }) {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelProjects />;
  }

  if (theme === 'minimal') {
    return <MinimalProjects projects={projects} />;
  }

  if (theme === 'retro') {
    return <RetroProjects projects={projects} />;
  }

  if (theme === 'brutal') {
    return <BrutalProjects projects={projects} />;
  }

  // Default to modern
  return <ModernProjects projects={projects} />;
}
