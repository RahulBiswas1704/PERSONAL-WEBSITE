import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-base hover:text-accent transition-colors duration-150">
          Rahul
        </Link>
        <nav className="flex items-center gap-4 sm:gap-5">
          <Link href="/articles" className="text-xs sm:text-sm font-medium hover-link">
            Articles
          </Link>
          <Link href="/projects" className="text-xs sm:text-sm font-medium hover-link">
            Projects
          </Link>
          <Link href="/me" className="text-xs sm:text-sm font-medium hover-link">
            Me
          </Link>
          <div className="flex items-center gap-2 border-l border-border pl-2 sm:pl-4">
            <AccentPicker />
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
