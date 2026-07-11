import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getSortedPosts } from "@/lib/posts";
import MDXComponents from "@/components/MDXComponents";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getSortedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/articles"
          className="text-xs font-bold hover-link inline-flex items-center gap-1"
        >
          &larr; Back to articles
        </Link>
      </div>

      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
          {post.metadata.title}
        </h1>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-light dark:text-neutral-500">
          <time>{formatDate(post.metadata.date)}</time>
          <span>&bull;</span>
          <span>{Math.ceil(post.content.split(/\s+/).length / 200)} min read</span>
        </div>
      </header>

      <hr className="my-0 border-border" />

      <article className="prose max-w-none">
        <MDXRemote source={post.content} components={MDXComponents} />
      </article>
    </div>
  );
}
