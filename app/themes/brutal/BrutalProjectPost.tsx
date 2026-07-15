"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BrutalProjectPost({ 
  post, 
  children 
}: { 
  post: any;
  children: React.ReactNode;
}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  };

  return (
    <article className="space-y-8 animate-fade-in-up font-mono">
      <div className="space-y-4 border-b-4 border-black dark:border-white pb-6">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-bold border-2 border-black dark:border-white bg-[#FFB6C1] text-black px-3 py-1.5 hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-foreground">{post.metadata.title}</h1>
        <div className="flex items-center gap-4 text-sm font-bold bg-[#E6E6FA] text-black p-2 border-2 border-black dark:border-white w-fit">
          <time>{formatDate(post.metadata.date)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {post.metadata.tags.map((tag: string) => (
                <span key={tag} className="uppercase">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-a:font-bold hover:prose-a:bg-[#FFD700] hover:prose-a:text-black transition-colors border-4 border-black dark:border-white p-6 bg-white dark:bg-black">
        {children}
      </div>
    </article>
  );
}
