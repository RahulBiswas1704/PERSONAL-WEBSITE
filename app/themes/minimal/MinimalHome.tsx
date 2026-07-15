import Link from "next/link";
import { motion, Variants } from "framer-motion";
import SocialGrid from "@/components/SocialGrid";
import SurpriseMe from "@/components/SurpriseMe";
import NowDoing from "@/components/NowDoing";
import HeavyRotation from "@/components/HeavyRotation";
import { ArrowUpRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export default function MinimalHome({ posts }: { posts: any[] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-32 pb-24 font-sans max-w-3xl mx-auto pt-12 md:pt-24"
    >
      
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="space-y-8">
        <h1 className="text-5xl md:text-6xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
          Rahul Biswas
        </h1>
        <p className="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed font-light">
          System Manager based in West Bengal. Building digital products, exploring complex systems, and writing open-source software with a focus on simplicity.
        </p>
      </motion.section>

      {/* Recent Posts Section */}
      <motion.section variants={itemVariants} className="space-y-12">
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Selected Work</h2>
          <Link href="/projects" className="text-xs uppercase tracking-widest text-neutral-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group flex items-center gap-1">
            View Archive <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        
        {posts.length > 0 ? (
          <div className="space-y-0">
            {posts.map((post) => (
              <article key={post.slug} className="group border-b border-neutral-100 dark:border-neutral-900 last:border-0 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-colors -mx-4 px-4 py-6 sm:py-8 rounded-xl">
                <Link href={`/projects/${post.slug}`} className="block">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h3 className="text-xl font-medium text-black dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                      {post.metadata.title}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500"><ArrowUpRight className="w-4 h-4" /></span>
                    </h3>
                    <time className="text-sm font-mono text-neutral-400 shrink-0">
                      {formatDate(post.metadata.date)}
                    </time>
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed max-w-2xl">
                    {post.metadata.summary}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 text-sm">No projects found.</p>
        )}
      </motion.section>

      {/* Surprise Me Sandbox */}
      <motion.section variants={itemVariants} className="space-y-8">
        <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Interactive</h2>
        </div>
        <div className="bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors shadow-sm hover:shadow-md">
          <SurpriseMe />
        </div>
      </motion.section>

      {/* Social Networks & Dashboard */}
      <motion.section variants={itemVariants} className="space-y-16">
        <div className="space-y-8">
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Connect</h2>
          </div>
          <div className="-mx-4 px-4">
             <SocialGrid />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8 border-t border-neutral-100 dark:border-neutral-900">
          <div className="space-y-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Currently</h3>
            <NowDoing />
          </div>
          <div className="space-y-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">On Repeat</h3>
            <HeavyRotation />
          </div>
        </div>
      </motion.section>
      
    </motion.div>
  );
}
