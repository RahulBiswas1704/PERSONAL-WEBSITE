import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "Rahul Biswas - System & Project Manager and Full-stack Developer. View my work experience, education, and skills.",
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
