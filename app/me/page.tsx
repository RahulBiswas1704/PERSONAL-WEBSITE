import { Metadata } from "next";
import Link from "next/link";
import SocialGrid from "@/components/SocialGrid";
import JourneyTimeline from "@/components/JourneyTimeline";

export const metadata: Metadata = {
  title: "Me",
  description: "About Rahul - self-taught full-stack developer and aspiring founder.",
};

export default function MePage() {
  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Title block */}
      <div className="border-b border-border pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Me</h1>
        <p className="text-sm text-muted dark:text-neutral-400 mt-1">
          The story of a curious dropout, self-taught dev, and aspiring founder.
        </p>
      </div>

      <div className="space-y-8 text-sm text-muted dark:text-neutral-300 leading-relaxed max-w-prose">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">A Brief Intro</h2>
          <p>
            Hey! I&apos;m Rahul. I&apos;m a self-taught full-stack developer, an aspiring founder, and generally a quirky guy with a massive curiosity for how things work. 
          </p>
          <p>
            Born in 2003 and raised in Krishnanagar, West Bengal, I have a habit of diving headfirst into whatever interests me—which usually circles back to tech, business, and genuinely good movies.
          </p>
        </section>

        <JourneyTimeline />

        <section className="space-y-4 pt-4 border-t border-border/60">
          <h2 className="text-base font-bold text-foreground">Let&apos;s Chat!</h2>
          <p>
            I&apos;m always down to talk about tech, startups, self-taught journeys, or movies. Feel free to shoot me an email or find me on my socials.
          </p>
          <SocialGrid />
        </section>
      </div>
    </div>
  );
}
