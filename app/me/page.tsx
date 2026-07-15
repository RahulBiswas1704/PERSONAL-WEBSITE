import { Metadata } from "next";
import Link from "next/link";
import SocialGrid from "@/components/SocialGrid";
import JourneyTimeline from "@/components/JourneyTimeline";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about Rahul Biswas: a self-taught full-stack developer, System Manager, and curious learner based in West Bengal.",
  openGraph: {
    title: "About Rahul Biswas",
    description: "Diving into the mind of Rahul Biswas. This portfolio is built differently. 🧠✨",
    url: "https://rahul-biswas.vercel.app/me",
    images: [{ url: "https://rahul-biswas.vercel.app/api/og?title=About Me&description=The story of a curious dropout, self-taught dev, and lifelong learner." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Rahul Biswas",
    description: "Diving into the mind of Rahul Biswas. This portfolio is built differently. 🧠✨",
    images: ["https://rahul-biswas.vercel.app/api/og?title=About Me&description=The story of a curious dropout, self-taught dev, and lifelong learner."],
  },
};

export default function MePage() {
  return (
    <div className="space-y-20 animate-fade-in-up pb-10">
      {/* Title block */}
      <div className="relative pt-8">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        
        <h1 className="text-6xl sm:text-9xl font-black tracking-tighter text-foreground relative z-10 transform -rotate-3 hover:rotate-0 transition-transform duration-500 w-fit">
          ME.
        </h1>
        
        <div className="relative mt-4 sm:mt-0 sm:absolute sm:top-24 sm:left-40 inline-block transform rotate-6 bg-foreground text-background px-4 py-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-widest shadow-xl hover:rotate-12 transition-transform duration-300 w-fit">
          The Story
        </div>
        
        <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 mt-8 max-w-xl relative z-10 font-serif italic leading-relaxed">
          &quot;The story of a curious dropout, self-taught dev, and lifelong learner.&quot;
        </p>
      </div>

      <div className="space-y-16 text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-prose">
        
        {/* Quirky Sticky Notes / Cards */}
        <section className="space-y-8 relative">
          
          <div className="absolute right-0 top-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />

          <div className="transform -rotate-2 hover:rotate-0 transition-all duration-500 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md relative z-10 mr-0 sm:mr-12">
            <div className="absolute -top-3 left-8 w-6 h-6 bg-amber-300 dark:bg-amber-700 rounded-full shadow-inner opacity-50" />
            <p className="text-neutral-900 dark:text-neutral-100 text-base sm:text-lg font-medium leading-relaxed">
              Hey! I&apos;m Rahul. Born in 2003 and raised in Krishnanagar, West Bengal, I have a habit of diving headfirst into whatever interests me. 
            </p>
          </div>
          
          <div className="transform rotate-2 hover:rotate-0 transition-all duration-500 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md relative z-10 ml-0 sm:ml-12">
            <div className="absolute -top-3 right-8 w-6 h-6 bg-blue-300 dark:bg-blue-700 rounded-full shadow-inner opacity-50" />
            <p className="text-neutral-900 dark:text-neutral-100 text-base sm:text-lg font-medium leading-relaxed">
              Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My journey hasn&apos;t been a straight line—from dropping out of engineering, to working as a System and Project Manager, to chasing the dream of being a Seafarer, and ultimately teaching myself to build full-stack web applications.
            </p>
          </div>
          
          <div className="transform -rotate-1 hover:rotate-0 transition-all duration-500 bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-900/50 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-md relative z-10 mr-0 sm:mr-8">
            <div className="absolute -top-3 left-1/2 w-6 h-6 bg-emerald-300 dark:bg-emerald-700 rounded-full shadow-inner opacity-50" />
            <p className="text-neutral-900 dark:text-neutral-100 text-base sm:text-lg font-medium leading-relaxed">
              Whether it&apos;s managing unexpected challenges in a corporate project or architecting new digital products from scratch, I thrive on continuous growth. When I&apos;m not coding, you&apos;ll find me reading, learning about AI, or practicing photography.
            </p>
          </div>
        </section>

        <div className="relative">
          <div className="absolute -left-10 top-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -z-10" />
          <JourneyTimeline />
        </div>

        <section className="space-y-6 pt-12 border-t-2 border-dashed border-border/60 relative">
          <div className="inline-block transform -rotate-2 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-2 shadow-sm border border-rose-200 dark:border-rose-900">
            Let&apos;s Chat!
          </div>
          <p className="text-base sm:text-lg text-foreground font-medium">
            I&apos;m always down to talk about tech, startups, self-taught journeys, or movies. Feel free to shoot me an email or find me on my socials.
          </p>
          <div className="transform hover:scale-105 transition-transform duration-300 w-fit">
            <SocialGrid />
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Rahul Biswas",
            "description": "The story of a curious dropout, self-taught dev, and lifelong learner.",
            "url": "https://rahul-website.vercel.app/me"
          })
        }}
      />
    </div>
  );
}
