"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PixelProjectPost({ 
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
    <article className="space-y-8 animate-fade-in-up font-[family-name:var(--font-pixel)]">
      <div className="space-y-4 border-b-4 border-dashed border-gray-300 dark:border-gray-700 pb-6">
        <Link href="/projects" className="inline-flex items-center gap-2 text-xs uppercase font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> &lt; Go Back
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wider text-black dark:text-white drop-shadow-md">{post.metadata.title}</h1>
        <div className="flex items-center gap-4 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 p-2 border-2 border-gray-300 dark:border-gray-600 rounded w-fit">
          <time>{formatDate(post.metadata.date)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {post.metadata.tags.map((tag: string) => (
                <span key={tag} className="text-[#ff00ff]">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-wider prose-a:text-[#00ffff] hover:prose-a:text-[#ff00ff] transition-colors bg-white dark:bg-[#111] p-6 border-4 border-gray-300 dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
        {children}
      </div>
    </article>
  );
}
