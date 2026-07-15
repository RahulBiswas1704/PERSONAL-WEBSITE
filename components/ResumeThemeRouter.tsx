"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernResume from "@/app/themes/modern/ModernResume";
import MinimalResume from "@/app/themes/minimal/MinimalResume";
import RetroResume from "@/app/themes/retro/RetroResume";
import BrutalResume from "@/app/themes/brutal/BrutalResume";
import PixelResume from "@/app/themes/pixel/PixelResume";

export default function ResumeThemeRouter() {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelResume />;
  }

  if (theme === 'minimal') {
    return <MinimalResume />;
  }

  if (theme === 'retro') {
    return <RetroResume />;
  }

  if (theme === 'brutal') {
    return <BrutalResume />;
  }

  // Default to modern
  return <ModernResume />;
}
