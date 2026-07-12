"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, User, MessageSquare, Beaker, Briefcase, Menu, X } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Code },
    { href: "/me", label: "Me", icon: User },
    { href: "/sandbox", label: "Sandbox", icon: Beaker },
    { href: "/guestbook", label: "Guestbook", icon: MessageSquare },
    { href: "/resume", label: "Resume", icon: Briefcase },
  ];

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed bottom-6 right-6 z-[60] w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg shadow-accent/30 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Full Screen Menu Overlay */}
      <div
        className={`sm:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl transition-all duration-300 flex flex-col items-center justify-center px-6 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center w-full max-w-sm gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all ${
                  isActive 
                    ? "bg-accent/10 text-accent font-bold" 
                    : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 font-medium"
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-accent/20' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-lg">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
