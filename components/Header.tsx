"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";
import ShareModal from "./ShareModal";
import { Share } from "lucide-react";

export default function Header() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-sm sm:text-base hover:text-accent transition-colors duration-150">
          Rahul
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden sm:flex items-center gap-5">
            <Link href="/projects" className="text-sm font-medium hover-link">
              Projects
            </Link>
            <Link href="/me" className="text-sm font-medium hover-link">
              Me
            </Link>
            <Link href="/sandbox" className="text-sm font-medium hover-link">
              Kishmish
            </Link>
            <Link href="/guestbook" className="text-sm font-medium hover-link">
              Guestbook
            </Link>
            <Link href="/resume" className="text-sm font-medium hover-link">
              Resume
            </Link>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2 sm:border-l sm:border-border sm:pl-4">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Share this page"
            >
              <Share className="w-4 h-4" />
            </button>
            <AccentPicker />
            <ThemeToggle />
          </div>
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </header>
  );
}
