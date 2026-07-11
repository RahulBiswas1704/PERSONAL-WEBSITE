import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles",
  description: "Writing on code, database architecture, logistics, and cash management.",
};

export default function ArticlesPage() {
  const posts = getSortedPosts();

  // Group posts by year
  const postsByYear: { [key: string]: typeof posts } = {};
  posts.forEach((post) => {
    const year = new Date(post.metadata.date).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  const years = Object.keys(postsByYear).sort((a, b) => b.localeCompare(a));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Articles</h1>
        <p className="text-sm text-muted dark:text-neutral-400 mt-1">
          A collection of writings about technical engineering and business operations.
        </p>
      </div>

      <div className="space-y-12 pt-4">
        {years.map((year) => (
          <section key={year} className="space-y-4">
            <h2 className="text-base font-bold text-foreground border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
              {year}
            </h2>
            <div className="space-y-3.5">
              {postsByYear[year].map((post) => (
                <article
                  key={post.slug}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 group"
                >
                  <time className="text-xs font-mono text-muted-light dark:text-neutral-500 w-16 shrink-0">
                    {formatDate(post.metadata.date)}
                  </time>
                  <Link
                    href={`/articles/${post.slug}`}
                    className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-150 leading-snug"
                  >
                    {post.metadata.title}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}

        {years.length === 0 && (
          <p className="text-sm text-muted">No articles found.</p>
        )}
      </div>
    </div>
  );
}
