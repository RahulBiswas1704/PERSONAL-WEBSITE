import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="relative group mb-8">
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-8 bg-card border-2 border-border/50 rounded-2xl ring-1 ring-white/10 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-4 tracking-tighter">
            404
          </h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Lost in the Void
          </h2>
          <p className="text-muted-foreground max-w-sm mb-8 font-mono text-sm leading-relaxed">
            The page you're looking for has either been moved, deleted, or never existed in this timeline.
          </p>
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-foreground/20"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
    </div>
  );
}
