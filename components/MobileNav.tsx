"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Code, User, MessageSquare, Beaker, Briefcase } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Code },
    { href: "/me", label: "Me", icon: User },
    { href: "/sandbox", label: "Sandbox", icon: Beaker },
    { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
    { href: "/resume", label: "Resume", icon: Briefcase },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 w-full bg-background/90 backdrop-blur-md border-t border-border z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "scale-110" : "scale-100"} transition-transform`} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
