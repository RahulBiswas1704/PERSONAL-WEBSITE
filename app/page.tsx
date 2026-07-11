import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";

export default function Home() {
  const posts = getSortedPosts().slice(0, 3); // Get latest 3 posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-16">
      {/* Bio Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Hi, I&apos;m Rahul.</h1>
        <p className="text-muted dark:text-neutral-300 leading-relaxed text-base max-w-prose">
          I&apos;m a full-stack developer and the founder of{" "}
          <Link href="/projects" className="accent-link">
            bowlit
          </Link>
          , a subscription-based tiffin service. I also work in cash management for the construction industry and am currently pursuing my MBA. I enjoy building with Next.js and Supabase.
        </p>
      </section>

      {/* Recent Posts Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Recent Articles</h2>
          <Link href="/articles" className="text-xs font-bold hover-link">
            All Articles &rarr;
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/articles/${post.slug}`} className="block space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-foreground group-hover:text-accent transition-colors duration-150">
                      {post.metadata.title}
                    </h3>
                    <time className="text-xs text-muted-light font-mono shrink-0">
                      {formatDate(post.metadata.date)}
                    </time>
                  </div>
                  <p className="text-sm text-muted dark:text-neutral-400 line-clamp-2 leading-relaxed">
                    {post.metadata.summary}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted">No articles found.</p>
        )}
      </section>
    </div>
  );
}
