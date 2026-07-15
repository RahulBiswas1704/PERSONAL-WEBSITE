import { Metadata } from "next";
import LiveRoasterWrapper from "@/components/sandbox/LiveRoasterWrapper";
import ShareRoastButton from "@/components/sandbox/ShareRoastButton";

type Props = {
  searchParams: { roast?: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const roast = searchParams.roast;
  const ogTitle = "Kishmish's Roast Room";
  const ogDescription = roast || "Get roasted by Kishmish, an unhinged AI, on Rahul Biswas's site! 🐈‍⬛🔥";
  const ogUrl = `https://rahul-biswas.vercel.app/api/og?title=${encodeURIComponent(ogTitle)}&description=${encodeURIComponent(ogDescription)}`;

  return {
    title: "Kishmish's Roast Room",
    description: "Live AI Roaster.",
    openGraph: {
      title: "Kishmish's Roast Room",
      description: ogDescription,
      url: "https://rahul-biswas.vercel.app/sandbox",
      images: [{ url: ogUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kishmish's Roast Room",
      description: ogDescription,
      images: [ogUrl],
    },
  };
}

import SandboxThemeRouter from "@/components/SandboxThemeRouter";

export default function SandboxPage() {
  return <SandboxThemeRouter />;
}
