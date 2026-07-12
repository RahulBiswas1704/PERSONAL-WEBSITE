import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Professional resume of Rahul Biswas. System & Project Manager, and Full-Stack Developer with experience at ZK Construction and Unique Star.",
  openGraph: {
    title: "Rahul Biswas | Resume",
    description: "Professional resume of Rahul Biswas. System & Project Manager, and Full-Stack Developer.",
    url: "https://rahul-website.vercel.app/resume",
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
