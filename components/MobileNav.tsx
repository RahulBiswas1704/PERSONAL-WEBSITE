"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, User, MessageSquare, Cat, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { hapticTick } from "@/lib/haptics";
import { useStructuralTheme } from "@/contexts/StructuralThemeContext";

export default function MobileNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme } = useStructuralTheme();

  // Hide dock when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Code },
    { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
    { href: "/resume", label: "Resume", icon: Briefcase },
    { href: "/sandbox", label: "Kishmish", icon: Cat },
    { href: "/me", label: "Me", icon: User },
  ];

  const getContainerClass = () => {
    switch (theme) {
      case "brutal":
        return "flex items-center gap-1 p-2 bg-[#f4f4f0] border-4 border-black brutal-shadow rounded-none";
      case "retro":
        return "flex items-center gap-1 p-2 bg-[#f4ebd0] dark:bg-black border-4 border-[#4a3b2c] dark:border-green-500 rounded-none shadow-[0_0_15px_rgba(74,59,44,0.3)] dark:shadow-[0_0_15px_rgba(34,197,94,0.3)]";
      case "minimal":
        return "flex items-center gap-3 p-3 bg-white/95 dark:bg-black/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm";
      case "pixel":
        return "flex items-center gap-1 p-2 bg-[#F0F0F0] dark:bg-[#111111] border-4 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] rounded-none font-sans";
      default:
        return "flex items-center gap-1 p-2 rounded-full bg-background/80 dark:bg-black/60 backdrop-blur-xl border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]";
    }
  };

  const getLinkClass = (isActive: boolean) => {
    switch (theme) {
      case "brutal":
        return isActive 
          ? "bg-black text-white px-4 py-2 gap-2 border-2 border-black" 
          : "w-10 h-10 text-black border-2 border-transparent hover:border-black hover:bg-black hover:text-white";
      case "retro":
        return isActive 
          ? "bg-[#4a3b2c] text-[#f4ebd0] dark:bg-green-500 dark:text-black px-4 py-2 gap-2 border-2 border-transparent" 
          : "w-10 h-10 text-[#4a3b2c]/60 dark:text-green-500/50 hover:text-[#4a3b2c] dark:hover:text-green-500 hover:bg-[#4a3b2c]/10 dark:hover:bg-green-500/20";
      case "minimal":
        return isActive 
          ? "text-black dark:text-white px-4 py-2 gap-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl" 
          : "w-10 h-10 text-neutral-400 hover:text-black dark:hover:text-white rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors";
      case "pixel":
        return isActive 
          ? "bg-black text-white dark:bg-white dark:text-black px-4 py-2 gap-2 border-2 border-black dark:border-white" 
          : "w-10 h-10 text-black dark:text-white border-2 border-transparent hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors";
      default:
        return isActive 
          ? "bg-accent text-white px-4 py-2 rounded-full gap-2" 
          : "w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800";
    }
  };

  return (
    <nav 
      className={`sm:hidden fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ease-in-out ${
        isVisible ? "bottom-6 opacity-100" : "-bottom-20 opacity-0"
      }`}
    >
      <div className={getContainerClass()}>
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
          
          return (
            <Link
              key={href}
              href={href}
              onClick={() => {
                if (!isActive) hapticTick();
              }}
              className={`relative flex items-center justify-center transition-all duration-300 ease-out overflow-hidden ${
                theme === "brutal" || theme === "retro" || theme === "pixel" ? "" : "rounded-full"
              } ${getLinkClass(isActive)}`}
            >
              <Icon className={`shrink-0 transition-transform duration-300 ${isActive ? 'w-4 h-4' : 'w-5 h-5'}`} />
              
              {isActive && (
                <span className={`whitespace-nowrap animate-fade-in ${theme === "brutal" || theme === "retro" || theme === "pixel" ? "text-xs font-black uppercase tracking-widest" : "text-xs font-bold"}`}>
                  {label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
