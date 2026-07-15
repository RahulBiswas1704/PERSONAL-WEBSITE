"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RetroProjectPost({ 
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
    <article className="space-y-8 animate-fade-in-up font-mono text-[#33ff00]">
      <div className="space-y-4 border-b-2 border-[#33ff00] pb-6 border-dashed">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#33ff00] hover:text-[#000000] hover:bg-[#33ff00] transition-colors px-2 py-1 w-fit">
          <ArrowLeft className="w-4 h-4" /> [BACK_TO_PROJECTS]
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight uppercase">&gt; {post.metadata.title}_</h1>
        <div className="flex items-center gap-4 text-sm font-mono opacity-80">
          <time>DATETIME: {formatDate(post.metadata.date)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {post.metadata.tags.map((tag: string) => (
                <span key={tag}>[{tag}]</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prose prose-neutral max-w-none prose-headings:font-bold prose-headings:text-[#33ff00] prose-p:text-[#33ff00] prose-strong:text-[#33ff00] prose-a:text-[#33ff00] prose-a:underline hover:prose-a:bg-[#33ff00] hover:prose-a:text-black transition-colors">
        {children}
      </div>
    </article>
  );
}
