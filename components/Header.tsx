import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50 transition-colors">
      <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-base hover:text-accent transition-colors duration-150">
          Rahul
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/articles" className="text-sm font-medium hover-link">
            Articles
          </Link>
          <Link href="/projects" className="text-sm font-medium hover-link">
            Projects
          </Link>
          <Link href="/me" className="text-sm font-medium hover-link">
            Me
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
