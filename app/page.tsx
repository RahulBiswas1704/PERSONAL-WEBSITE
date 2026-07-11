import Link from "next/link";
import { getSortedPosts } from "@/lib/posts";
import SocialGrid from "@/components/SocialGrid";
import SurpriseMe from "@/components/SurpriseMe";
import NowDoing from "@/components/NowDoing";
import HeavyRotation from "@/components/HeavyRotation";
import AccentPicker from "@/components/AccentPicker";
import TypewriterCycler from "@/components/TypewriterCycler";
import InteractiveWave from "@/components/InteractiveWave";
import FloatingShapes from "@/components/FloatingShapes";

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
    <div className="space-y-12 animate-fade-in-up relative">
      <FloatingShapes />
      
      {/* Intro Section */}
      <section className="space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          Hi, I&apos;m Rahul <InteractiveWave />
        </h1>
        <p className="text-base sm:text-lg text-muted dark:text-neutral-400 max-w-xl leading-relaxed">
          I am a <TypewriterCycler /> based in West Bengal. 
          I love building beautiful digital products, exploring complex systems, and creating open-source tools.
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

      {/* Bento Box Dashboard */}
      <section className="animate-fade-in-up" style={{ animationDelay: "450ms", animationFillMode: "both" }}>
        <div className="border-b border-border pb-3 mb-6">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-xs text-muted mt-1">A real-time look into my digital life.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 flex flex-col">
            <div className="bg-neutral-50/50 dark:bg-neutral-900/30 border border-border/50 rounded-2xl p-5 flex-1">
              <h2 className="text-sm font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">Let&apos;s Connect</h2>
              <SocialGrid />
            </div>
            <div className="bg-neutral-50/50 dark:bg-neutral-900/30 border border-border/50 rounded-2xl p-5 flex-1">
              <NowDoing />
            </div>
          </div>
          <div className="bg-neutral-50/50 dark:bg-neutral-900/30 border border-border/50 rounded-2xl p-5">
            <HeavyRotation />
          </div>
        </div>
      </section>
    </div>
  );
}
