import { Metadata } from "next";
import Link from "next/link";
import SocialGrid from "@/components/SocialGrid";

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

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">The Unconventional Path</h2>
          <p>
            My path hasn&apos;t been a straight line. After finishing my schooling at Krishnanagar AV High School in 2019, I enrolled in a Diploma in Electrical Engineering at the Modern Institute of Engineering and Technology. 
          </p>
          <p>
            But when the 2020 lockdowns hit, I had a lot of time at home to think about my future. I realized that a piece of paper isn&apos;t everything. I made the tough call to drop out after my third semester so I could take control of my own education.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">Self-Taught & Driven</h2>
          <p>
            I have never taken a professional coding course. Everything I know about building software, architecting systems, and creating web experiences, I learned myself through the web and YouTube. I believe that curiosity is the best curriculum.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">Exploring Different Lives</h2>
          <p>
            I&apos;ve explored a few different lives before settling on software. At one point, the promise of high pay and traveling the world had me seriously pursuing a career as a seafarer! 
          </p>
          <p>
            Ultimately, building digital products won me over. I get to travel the world through the internet anyway, building things that reach people globally.
          </p>
        </section>

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
