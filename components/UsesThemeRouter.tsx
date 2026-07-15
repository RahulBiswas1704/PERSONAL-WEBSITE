"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernUses from "@/app/themes/modern/ModernUses";
import MinimalUses from "@/app/themes/minimal/MinimalUses";
import RetroUses from "@/app/themes/retro/RetroUses";
import BrutalUses from "@/app/themes/brutal/BrutalUses";
import PixelUses from "@/app/themes/pixel/PixelUses";
import { uses } from "@/app/uses/usesData";

export default function UsesThemeRouter() {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelUses uses={uses} />;
  }

  if (theme === 'minimal') {
    return <MinimalUses uses={uses} />;
  }

  if (theme === 'retro') {
    return <RetroUses uses={uses} />;
  }

  if (theme === 'brutal') {
    return <BrutalUses uses={uses} />;
  }

  // Default to modern
  return <ModernUses uses={uses} />;
}
