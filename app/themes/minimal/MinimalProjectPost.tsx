"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MinimalProjectPost({ 
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
    <article className="space-y-12 animate-fade-in-up pb-24 font-sans max-w-3xl mx-auto pt-12">
      <div className="space-y-6 border-b border-indigo-100 dark:border-indigo-900/30 pb-10">
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Back to Projects
        </Link>
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
          {post.metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-400 font-mono">
          <time>{formatDate(post.metadata.date)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {post.metadata.tags.map((tag: string) => (
                <span key={tag} className="text-indigo-500">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-normal prose-headings:text-foreground prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-500 transition-colors prose-strong:text-indigo-950 dark:prose-strong:text-indigo-100">
        {children}
      </div>
    </article>
  );
}
