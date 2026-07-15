import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "I just found the most over-engineered resume on the internet. You have to see this. 💼✨",
  openGraph: {
    title: "Rahul Biswas | Resume",
    description: "I just found the most over-engineered resume on the internet. You have to see this. 💼✨",
    url: "https://rahul-biswas.vercel.app/resume",
    images: [{ url: "https://rahul-biswas.vercel.app/api/og?title=Resume&description=System & Project Manager by day, curious learner by night." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Biswas | Resume",
    description: "I just found the most over-engineered resume on the internet. You have to see this. 💼✨",
    images: ["https://rahul-biswas.vercel.app/api/og?title=Resume&description=System & Project Manager by day, curious learner by night."],
  },
  alternates: {
    canonical: "/resume",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
