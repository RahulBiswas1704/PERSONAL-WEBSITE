import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import PullToRefreshEgg from "@/components/PullToRefreshEgg";
import VisitorTracker from "@/components/VisitorTracker";
import MouseGlow from "@/components/MouseGlow";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";
import FixedLeftSidebar from "@/components/FixedLeftSidebar";
import AICompanionSidebar from "@/components/AICompanionSidebar";
import MobileDesktopHint from "@/components/MobileDesktopHint";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rahul",
    default: "Rahul | Full-stack Developer & Lifelong Learner",
  },
  description: "Personal website, portfolio, and digital garden of Rahul Biswas. Exploring system management, full-stack web development, and creative digital products.",
  keywords: ["Rahul Biswas", "Rahul Biswas Portfolio", "System Manager West Bengal", "Full-stack Developer", "Self-taught Developer", "Software Engineer", "Web Development", "React", "Next.js"],
  metadataBase: new URL("https://rahul-website.vercel.app"),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Rahul Biswas | Full-stack Developer & System Manager",
    description: "Personal website, portfolio, and digital garden of Rahul Biswas.",
    url: "https://rahul-website.vercel.app",
    siteName: "Rahul",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Biswas | Full-stack Developer",
    description: "Personal website, portfolio, and digital garden of Rahul Biswas.",
    creator: "@rahulbiswas1704",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased overflow-x-hidden print:overflow-visible print:h-auto`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  // Default to dark mode for new visitors
                  if (theme === 'dark' || !theme) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  var accents = ['amber', 'emerald', 'rose', 'blue', 'purple'];
                  var randomAccent = accents[Math.floor(Math.random() * accents.length)];
                  localStorage.setItem('accent', randomAccent);
                  document.documentElement.setAttribute('data-accent', randomAccent);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rahul Biswas",
              "url": "https://rahul-website.vercel.app",
              "jobTitle": ["System Manager", "Full-Stack Developer"],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "ZK Construction"
                }
              ],
              "alumniOf": "Krishnanagar Jawaharlal Nehru National Youth Computer Centre",
              "sameAs": [
                "https://github.com/RahulBiswas1704",
                "https://twitter.com/rahulbiswas1704",
                "https://www.linkedin.com/in/rahulbiswas1704"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Krishnanagar",
                "addressRegion": "West Bengal",
                "addressCountry": "India"
              }
            })
          }}
        />
      </head>
      <body 
        suppressHydrationWarning 
        className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-150 overflow-x-hidden print:overflow-visible print:min-h-0 print:pb-0"
      >
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative print:overflow-visible print:min-h-0">
          <PullToRefreshEgg />
          <Header />
          <FixedLeftSidebar />
          <main className="max-w-3xl mx-auto px-6 py-12 flex-1 w-full relative z-10">
            {children}
          </main>
          <MobileDesktopHint />
          <AICompanionSidebar />
          <Footer />
        </div>
        <MobileNav />
        <VisitorTracker />
        <MouseGlow />
        <TerminalEasterEgg />
        <Analytics />
      </body>
    </html>
  );
}
