import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-sm sm:text-base hover:text-accent transition-colors duration-150">
          Rahul
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <nav className="hidden sm:flex items-center gap-5">
            <Link href="/articles" className="text-sm font-medium hover-link">
              Articles
            </Link>
            <Link href="/projects" className="text-sm font-medium hover-link">
              Projects
            </Link>
            <Link href="/me" className="text-sm font-medium hover-link">
              Me
            </Link>
            <Link href="/sandbox" className="text-sm font-medium hover-link">
              Sandbox
            </Link>
            <Link href="/guestbook" className="text-sm font-medium hover-link">
              Guestbook
            </Link>
            <Link href="/resume" className="text-sm font-medium hover-link">
              Resume
            </Link>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2 sm:border-l sm:border-border sm:pl-4">
            <AccentPicker />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
