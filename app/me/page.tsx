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

import MeThemeRouter from "@/components/MeThemeRouter";

export default function MePage() {
  return (
    <>
      <MeThemeRouter />
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
    </>
  );
}
