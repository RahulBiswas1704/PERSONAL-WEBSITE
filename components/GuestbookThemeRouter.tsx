"use client";

import { useStructuralTheme } from "@/contexts/StructuralThemeContext";
import ModernGuestbook from "@/app/themes/modern/ModernGuestbook";
import MinimalGuestbook from "@/app/themes/minimal/MinimalGuestbook";
import RetroGuestbook from "@/app/themes/retro/RetroGuestbook";
import BrutalGuestbook from "@/app/themes/brutal/BrutalGuestbook";
import PixelGuestbook from "@/app/themes/pixel/PixelGuestbook";
import PixelRedirect from "@/components/PixelRedirect";

export default function GuestbookThemeRouter() {
  const { theme } = useStructuralTheme();

  if (theme === 'pixel') {
    return <PixelRedirect hash="#guestbook" />;
  }

  if (theme === 'minimal') {
    return <MinimalGuestbook />;
  }

  if (theme === 'retro') {
    return <RetroGuestbook />;
  }

  if (theme === 'brutal') {
    return <BrutalGuestbook />;
  }

  // Default to modern
  return <ModernGuestbook />;
}
