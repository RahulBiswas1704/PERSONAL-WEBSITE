import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Me",
  description: "About Rahul - developer, founder of bowlit, and MBA student.",
};

export default function MePage() {
  return (
    <div className="space-y-10">
      <div className="border-b border-border pb-3">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Me</h1>
        <p className="text-sm text-muted dark:text-neutral-400 mt-1">
          A summary of my work, studies, and building philosophy.
        </p>
      </div>

      <div className="space-y-8 text-sm text-muted dark:text-neutral-300 leading-relaxed">
        <section className="space-y-3">
          <p>
            Hello! I&apos;m Rahul. I am a full-stack developer based in India, currently working at the intersection of software logistics and construction finance.
          </p>
          <p>
            I enjoy building responsive, minimalist web applications with clean code. I balance my time between writing code, analyzing corporate working capital, and running a food logistics business.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-base font-bold text-foreground">Current Work</h2>
          <ul className="space-y-4">
            <li className="flex flex-col sm:flex-row gap-1 sm:gap-6">
              <span className="font-mono text-xs text-muted-light dark:text-neutral-500 w-24 shrink-0">
                bowlit
              </span>
              <div>
                <strong className="text-sm font-semibold text-foreground block">Founder & Developer</strong>
                <span className="text-xs text-muted dark:text-neutral-400 block mt-0.5">
                  Managing kitchen schedules and geo-based routing logistics for subscription-based tiffins.
                </span>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row gap-1 sm:gap-6">
              <span className="font-mono text-xs text-muted-light dark:text-neutral-500 w-24 shrink-0">
                Construction
              </span>
              <div>
                <strong className="text-sm font-semibold text-foreground block">Cash Management</strong>
                <span className="text-xs text-muted dark:text-neutral-400 block mt-0.5">
                  Managing subcontractors, cash registers, and progress billings on commercial real estate projects.
                </span>
              </div>
            </li>
            <li className="flex flex-col sm:flex-row gap-1 sm:gap-6">
              <span className="font-mono text-xs text-muted-light dark:text-neutral-500 w-24 shrink-0">
                Education
              </span>
              <div>
                <strong className="text-sm font-semibold text-foreground block">MBA Student</strong>
                <span className="text-xs text-muted dark:text-neutral-400 block mt-0.5">
                  Studying business economics, corporate operations, and financial accounting models.
                </span>
              </div>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">Skills & Tech</h2>
          <p className="text-xs text-muted dark:text-neutral-400">
            I specialize in the Javascript/TypeScript ecosystem. I prefer standard, highly performance-optimized utilities rather than bloating client-side bundles.
          </p>
          <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-muted-light dark:text-neutral-500">
            <span>Next.js</span>
            <span>&bull;</span>
            <span>React</span>
            <span>&bull;</span>
            <span>Tailwind CSS</span>
            <span>&bull;</span>
            <span>Supabase</span>
            <span>&bull;</span>
            <span>PostgreSQL</span>
            <span>&bull;</span>
            <span>Node.js</span>
            <span>&bull;</span>
            <span>Git</span>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-foreground">Contact</h2>
          <p>
            I am always open to chatting about software, database routing, or financial models. Feel free to shoot me an email at{" "}
            <a href="mailto:rahul@example.com" className="accent-link">
              rahul@example.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
