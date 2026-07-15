import SocialGrid from "@/components/SocialGrid";
import JourneyTimeline from "@/components/JourneyTimeline";

export default function MinimalMe() {
  return (
    <div className="space-y-16 animate-fade-in-up pb-16 font-sans">
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-indigo-700 to-neutral-900 dark:from-white dark:via-indigo-300 dark:to-white">
          About
        </h1>
        <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
          The story of a curious dropout, self-taught dev, and lifelong learner.
        </p>
      </div>

      <div className="space-y-12 text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
        
        <section className="space-y-6">
          <p>
            Hey! I&apos;m Rahul. Born in 2003 and raised in Krishnanagar, West Bengal, I have a habit of diving headfirst into whatever interests me. 
          </p>
          <p>
            Driven by a passion for technology and a flair for communication, I am constantly seeking new knowledge. My journey hasn&apos;t been a straight line—from dropping out of engineering, to working as a System and Project Manager, to chasing the dream of being a Seafarer, and ultimately teaching myself to build full-stack web applications.
          </p>
          <p>
            Whether it&apos;s managing unexpected challenges in a corporate project or architecting new digital products from scratch, I thrive on continuous growth. When I&apos;m not coding, you&apos;ll find me reading, learning about AI, or practicing photography.
          </p>
        </section>

        <section className="pt-8 border-t border-indigo-100 dark:border-indigo-900/30">
          <h2 className="text-2xl font-medium text-foreground mb-8">Timeline</h2>
          <div className="pl-4 border-l-2 border-indigo-100 dark:border-indigo-900/50">
            {/* We might need a MinimalJourneyTimeline eventually, but for now we reuse JourneyTimeline */}
            <JourneyTimeline />
          </div>
        </section>

        <section className="pt-12 border-t border-indigo-100 dark:border-indigo-900/30">
          <h2 className="text-2xl font-medium text-foreground mb-6">Contact</h2>
          <p className="mb-8">
            I&apos;m always down to talk about tech, startups, self-taught journeys, or movies. Feel free to shoot me an email or find me on my socials.
          </p>
          <div className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            <SocialGrid />
          </div>
        </section>
      </div>
    </div>
  );
}
