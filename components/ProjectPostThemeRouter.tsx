"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import MinimalProjectPost from "@/app/themes/minimal/MinimalProjectPost";
import ModernProjectPost from "@/app/themes/modern/ModernProjectPost";
import BrutalProjectPost from "@/app/themes/brutal/BrutalProjectPost";
import RetroProjectPost from "@/app/themes/retro/RetroProjectPost";
import PixelProjectPost from "@/app/themes/pixel/PixelProjectPost";

export default function ProjectPostThemeRouter({ 
  post, 
  children 
}: { 
  post: any;
  children: React.ReactNode;
}) {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelProjectPost post={post}>{children}</PixelProjectPost>;
  }

  if (theme === 'minimal') {
    return <MinimalProjectPost post={post}>{children}</MinimalProjectPost>;
  }

  if (theme === 'retro') {
    return <RetroProjectPost post={post}>{children}</RetroProjectPost>;
  }

  if (theme === 'brutal') {
    return <BrutalProjectPost post={post}>{children}</BrutalProjectPost>;
  }

  // Default to modern
  return <ModernProjectPost post={post}>{children}</ModernProjectPost>;
}
