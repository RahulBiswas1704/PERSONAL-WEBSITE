"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernSandbox from "@/app/themes/modern/ModernSandbox";
import MinimalSandbox from "@/app/themes/minimal/MinimalSandbox";
import RetroSandbox from "@/app/themes/retro/RetroSandbox";
import BrutalSandbox from "@/app/themes/brutal/BrutalSandbox";
import PixelSandbox from "@/app/themes/pixel/PixelSandbox";

export default function SandboxThemeRouter() {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelSandbox />;
  }

  if (theme === 'minimal') {
    return <MinimalSandbox />;
  }

  if (theme === 'retro') {
    return <RetroSandbox />;
  }

  if (theme === 'brutal') {
    return <BrutalSandbox />;
  }

  // Default to modern
  return <ModernSandbox />;
}
