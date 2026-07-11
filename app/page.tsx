import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";
import SocialGrid from "@/components/SocialGrid";
import SurpriseMe from "@/components/SurpriseMe";
import NowDoing from "@/components/NowDoing";
import HeavyRotation from "@/components/HeavyRotation";

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
    <div className="space-y-16 animate-fade-in-up">
      {/* Intro Bio Section */}
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Hey, I&apos;m Rahul.
        </h1>
        <p className="text-muted dark:text-neutral-300 leading-relaxed text-base max-w-prose">
          I&apos;m a self-taught full-stack developer and aspiring founder based in Krishnanagar, West Bengal. I dropped out of engineering school to take control of my own education, and I have a habit of diving headfirst into whatever interests me—mostly tech, business, and good movies.
        </p>
        <p className="text-muted dark:text-neutral-300 leading-relaxed text-sm max-w-prose">
          Everything I know about software, I learned myself. I enjoy building clean, high-performance web experiences using modern web tools.
        </p>
      </section>

      {/* Surprise Me Sandbox */}
      <section className="animate-fade-in-up" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
        <SurpriseMe />
      </section>

      {/* Recent Posts Section */}
      <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
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

      {/* Social Networks Grid */}
      <section className="space-y-6 animate-fade-in-up" style={{ animationDelay: "450ms", animationFillMode: "both" }}>
        <div className="border-b border-border pb-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Let&apos;s Connect</h2>
          <p className="text-xs text-muted mt-1">Find me across the web.</p>
        </div>
        <SocialGrid />
        <NowDoing />
        <HeavyRotation />
      </section>
    </div>
  );
}
