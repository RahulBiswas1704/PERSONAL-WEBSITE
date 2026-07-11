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
      <section id="intro" className="space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          Hi, I&apos;m Rahul <InteractiveWave />
        </h1>
        <p className="text-base sm:text-lg text-muted dark:text-neutral-400 max-w-xl leading-relaxed">
          I am a <TypewriterCycler /> based in West Bengal. 
          I love building beautiful digital products, exploring complex systems, and creating open-source tools.
        </p>
      </section>

      {/* Surprise Me Sandbox */}
      <section id="sandbox" className="animate-fade-in-up" style={{ animationDelay: "150ms", animationFillMode: "both" }}>
        <SurpriseMe />
      </section>

      {/* Recent Posts Section */}
      <section id="articles" className="space-y-6 animate-fade-in-up" style={{ animationDelay: "300ms", animationFillMode: "both" }}>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-lg font-bold tracking-tight text-foreground">Recent Articles</h2>
          <Link href="/articles" className="text-xs font-bold hover-link">
            All Articles &rarr;
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="group relative overflow-hidden rounded-xl border border-border/50 bg-neutral-50/30 dark:bg-neutral-900/10 p-5 transition-colors hover:border-border/80">
                {/* Fluid Glow Effect Overlay */}
                <div 
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(var(--accent-rgb, 245, 158, 11), 0.15), transparent 40%)`
                  }}
                />
                
                <Link href={`/articles/${post.slug}`} className="block space-y-1 relative z-10">
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

      {/* Social Networks & Dashboard */}
      <section id="connect" className="space-y-10 animate-fade-in-up" style={{ animationDelay: "450ms", animationFillMode: "both" }}>
        <div className="space-y-4">
          <div className="border-b border-border/60 pb-2">
            <h2 className="text-lg font-bold tracking-tight text-foreground">Let&apos;s Connect</h2>
            <p className="text-xs text-muted mt-1">Find me across the web.</p>
          </div>
          <SocialGrid />
        </div>

        <NowDoing />
        
        <HeavyRotation />
      </section>
    </div>
  );
}
