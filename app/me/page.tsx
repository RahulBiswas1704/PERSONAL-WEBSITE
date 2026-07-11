import { Metadata } from "next";
import Link from "next/link";
import SocialGrid from "@/components/SocialGrid";

export const metadata: Metadata = {
  title: "Me",
  description: "About Rahul - developer, founder of bowlit, and MBA student.",
};

export default function MePage() {
  return (
    <div className="space-y-12 animate-fade-in-up">
      {/* Title block */}
      <div className="border-b border-border pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Me</h1>
        <p className="text-sm text-muted dark:text-neutral-400 mt-1">
          The story behind the screen, kitchens, and balance sheets.
        </p>
      </div>

      <div className="space-y-8 text-sm text-muted dark:text-neutral-300 leading-relaxed max-w-prose">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">A Brief Intro</h2>
          <p>
            Hey! I&apos;m Rahul. I&apos;m a developer, business builder, and graduate student based in India. I don&apos;t think about code in a vacuum—for me, software is a tool to solve physical, operational bottlenecks. 
          </p>
          <p>
            Whether it is dispatching meals on time or calculating interest rates on subcontractor draws, I like writing clean code that connects data directly to real-world outcomes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">The bowlit Story</h2>
          <p>
            Like many projects, <strong className="text-foreground font-semibold">bowlit</strong> began because I wanted to solve a personal pain point. Tiffin subscriptions are often disorganized, unreliable, and lack quality control. I wondered if we could build a centralized kitchen system that ran with the precision of a software pipeline.
          </p>
          <p>
            So, we built it. Today, bowlit manages orders, plans recipe batches, and coordinates drivers geographically. It is built entirely on Next.js and Supabase, which lets us scale operations without maintaining heavy servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">Construction Finance</h2>
          <p>
            When I&apos;m not checking kitchen dashboards, I work in cash management for commercial construction projects. Construction runs on paper-thin margins and massive billing delays (milestones, progress claims, and retention pools).
          </p>
          <p>
            I model cash positions and forecast subcontractor liquidity. Bridging the gap between spreadsheet formulas and database queries allows us to spot potential deficits weeks before they affect project sites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">The MBA & Coding Philosophy</h2>
          <p>
            I am currently pursuing my MBA to study corporate operations, growth economics, and finance. It has heavily shaped how I write code—I value high performance, zero weight, and immediate utility. 
          </p>
          <p>
            I draw heavy design inspiration from Tania Rascia&apos;s style: minimal design, high contrast, generous layouts, and code blocks that load in milliseconds.
          </p>
        </section>

        <section className="space-y-4 pt-4 border-t border-border/60">
          <h2 className="text-base font-bold text-foreground">Let&apos;s Chat!</h2>
          <p>
            I&apos;m always down to talk about React architectures, database configurations, food startups, or financial models. Feel free to shoot me an email or find me on my socials.
          </p>
          <SocialGrid />
        </section>
      </div>
    </div>
  );
}
