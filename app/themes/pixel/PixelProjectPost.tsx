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
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
  };

  return (
    <article className="min-h-screen bg-[#F0F0F0] dark:bg-[#111111] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-24">
        
        <header className="mb-24 border-b-2 border-black dark:border-white pb-8">
          <Link href="/projects" className="inline-flex items-center gap-2 text-2xl font-black uppercase tracking-tighter hover:underline mb-16 transition-all">
            <ArrowLeft className="w-8 h-8" /> BACK TO DIRECTORY
          </Link>
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-12 break-all sm:break-normal hover:italic transition-all">
            {post.metadata.title}
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="text-2xl md:text-4xl font-bold uppercase">
              <time>{formatDate(post.metadata.date)}</time>
            </div>
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {post.metadata.tags.map((tag: string) => (
                  <span key={tag} className="text-xl font-bold uppercase border-2 border-black dark:border-white px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-crosshair">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>
        
        <div className="prose prose-xl md:prose-2xl prose-neutral dark:prose-invert max-w-4xl mx-auto prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-a:font-bold prose-a:uppercase prose-a:underline hover:prose-a:no-underline transition-colors prose-p:font-bold prose-p:leading-relaxed">
          {children}
        </div>
      </div>
    </article>
  );
}
