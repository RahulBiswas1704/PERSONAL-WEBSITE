import { getPostBySlug, getSortedPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MDXComponents from "@/components/MDXComponents";

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Project Not Found' };
  }
  
  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  };

  return (
    <article className="space-y-8 animate-fade-in-up">
      <div className="space-y-4 border-b border-border pb-6">
        <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-foreground transition-colors bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-md w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">{post.metadata.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-light font-mono">
          <time>{formatDate(post.metadata.date)}</time>
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex gap-2">
              {post.metadata.tags.map(tag => (
                <span key={tag} className="text-accent">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-accent hover:prose-a:text-accent/80 transition-colors">
        <MDXRemote source={post.content} components={MDXComponents} />
      </div>
    </article>
  );
}
