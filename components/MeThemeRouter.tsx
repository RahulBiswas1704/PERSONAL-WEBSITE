"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernMe from "@/app/themes/modern/ModernMe";
import MinimalMe from "@/app/themes/minimal/MinimalMe";
import RetroMe from "@/app/themes/retro/RetroMe";
import BrutalMe from "@/app/themes/brutal/BrutalMe";
import PixelMe from "@/app/themes/pixel/PixelMe";
import PixelRedirect from "@/components/PixelRedirect";

export default function MeThemeRouter() {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelRedirect hash="#me" />;
  }

  if (theme === 'minimal') {
    return <MinimalMe />;
  }

  if (theme === 'retro') {
    return <RetroMe />;
  }

  if (theme === 'brutal') {
    return <BrutalMe />;
  }

  // Default to modern
  return <ModernMe />;
}
