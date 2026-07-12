import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-background py-8 transition-colors mt-auto">
      <div className="max-w-2xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-light">
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <span>&copy; {currentYear} Rahul.</span>
          <span className="text-zinc-500 italic hidden sm:inline-block">Built with Next.js, caffeine, and mild panic.</span>
          <span className="text-zinc-500 italic sm:hidden">Fueled by caffeine & Next.js.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/RahulBiswas1704"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-link"
          >
            GitHub
          </a>
          <span className="text-border">/</span>
          <a
            href="https://www.linkedin.com/in/rahul-biswas1704/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-link"
          >
            LinkedIn
          </a>
          <span className="text-border">/</span>
          <a
            href="mailto:rahul.biswas1704@gmail.com"
            className="hover-link"
          >
            Email
          </a>
          <span className="text-border">/</span>
          <Link href="/uses" className="hover-link">
            Uses
          </Link>
        </div>
      </div>
    </footer>
  );
}
