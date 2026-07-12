"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, User, MessageSquare, Beaker, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { hapticTick } from "@/lib/haptics";

export default function MobileNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    { href: "/sandbox", label: "Sandbox", icon: Beaker },
    { href: "/me", label: "Me", icon: User },
  ];

  return (
    <nav 
      className={`sm:hidden fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 ease-in-out ${
        isVisible ? "bottom-6 opacity-100" : "-bottom-20 opacity-0"
      }`}
    >
      <div className="flex items-center gap-1 p-2 rounded-full bg-background/80 dark:bg-black/60 backdrop-blur-xl border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
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
                isActive 
                  ? "bg-accent text-white px-4 py-2 rounded-full gap-2" 
                  : "w-10 h-10 rounded-full text-muted-foreground hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              <Icon className={`shrink-0 transition-transform duration-300 ${isActive ? 'w-4 h-4' : 'w-5 h-5'}`} />
              
              {isActive && (
                <span className="text-xs font-bold whitespace-nowrap animate-fade-in">
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
