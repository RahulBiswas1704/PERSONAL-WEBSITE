"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernHome from "@/app/themes/modern/ModernHome";
import MinimalHome from "@/app/themes/minimal/MinimalHome";
import RetroHome from "@/app/themes/retro/RetroHome";
import BrutalHome from "@/app/themes/brutal/BrutalHome";
import PixelHome from "@/app/themes/pixel/PixelHome";

export default function HomeThemeRouter({ posts }: { posts: any[] }) {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelHome />;
  }

  if (theme === 'minimal') {
    return <MinimalHome posts={posts} />;
  }

  if (theme === 'retro') {
    return <RetroHome posts={posts} />;
  }

  if (theme === 'brutal') {
    return <BrutalHome posts={posts} />;
  }

  // Default to modern
  return <ModernHome posts={posts} />;
}
