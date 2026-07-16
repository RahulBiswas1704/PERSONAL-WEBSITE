"use client";

import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";
import CRTEffect from "@/components/CRTEffect";

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
    <article className="min-h-screen bg-[#f4ebd0] dark:bg-black font-mono text-[#4a3b2c] dark:text-green-500 selection:bg-[#4a3b2c] selection:text-[#f4ebd0] dark:selection:bg-green-500 dark:selection:text-black space-y-6 sm:space-y-8 pb-24 sm:pb-16 px-2 sm:px-0 relative overflow-x-hidden">
      <CRTEffect />
      
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-white/50 dark:bg-black/50 backdrop-blur-sm relative z-10 mx-2 sm:mx-0">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-2 border-current px-3 py-1.5 hover:bg-[#4a3b2c] hover:text-[#f4ebd0] dark:hover:bg-green-500 dark:hover:text-black transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> [ RETURN_TO_LOGS ]
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <Terminal className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse shrink-0" />
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold uppercase tracking-widest break-all">
            {post.metadata.title}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t-4 border-[#4a3b2c] dark:border-green-500">
          <time className="font-bold border-2 border-current px-2 py-1 uppercase">{formatDate(post.metadata.date)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {post.metadata.tags.map((tag: string) => (
                <span key={tag} className="font-bold uppercase opacity-80">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="border-4 border-[#4a3b2c] dark:border-green-500 p-4 sm:p-8 shadow-[4px_4px_0px_0px_#4a3b2c] sm:shadow-[8px_8px_0px_0px_#4a3b2c] dark:shadow-[4px_4px_0px_0px_#22c55e] dark:sm:shadow-[8px_8px_0px_0px_#22c55e] bg-[#f4ebd0] dark:bg-black relative z-10 mx-2 sm:mx-0 prose prose-neutral dark:prose-invert max-w-none 
        prose-headings:font-bold prose-headings:font-mono prose-headings:text-[#4a3b2c] dark:prose-headings:text-green-500 prose-headings:uppercase
        prose-p:font-mono prose-p:text-[#4a3b2c] dark:prose-p:text-green-500
        prose-a:text-[#4a3b2c] dark:prose-a:text-green-500 prose-a:underline prose-a:font-bold hover:prose-a:bg-[#4a3b2c] hover:prose-a:text-[#f4ebd0] dark:hover:prose-a:bg-green-500 dark:hover:prose-a:text-black
        prose-strong:text-[#4a3b2c] dark:prose-strong:text-green-500 prose-strong:font-bold
        prose-code:text-[#4a3b2c] dark:prose-code:text-green-500 prose-code:font-mono prose-code:bg-white/50 dark:prose-code:bg-black/50 prose-code:px-1 prose-code:border-2 prose-code:border-current
        prose-pre:bg-white/50 dark:prose-pre:bg-black/50 prose-pre:border-4 prose-pre:border-[#4a3b2c] dark:prose-pre:border-green-500 prose-pre:rounded-none
        prose-li:font-mono prose-li:text-[#4a3b2c] dark:prose-li:text-green-500 marker:text-[#4a3b2c] dark:marker:text-green-500">
        {children}
      </div>
    </article>
  );
}
