import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import VisitorTracker from "@/components/VisitorTracker";
import MouseGlow from "@/components/MouseGlow";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";
import FixedLeftSidebar from "@/components/FixedLeftSidebar";
import AICompanionSidebar from "@/components/AICompanionSidebar";
import MobileDesktopHint from "@/components/MobileDesktopHint";
import { Analytics } from "@vercel/analytics/next";

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
  description: "Personal website and blog of Rahul. Driven by a passion for technology and a flair for communication.",
  metadataBase: new URL("https://rahul-website.vercel.app"),
  openGraph: {
    title: "Rahul | Full-stack Developer",
    description: "Personal website, projects, and digital garden.",
    url: "https://rahul-website.vercel.app",
    siteName: "Rahul",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul | Full-stack Developer",
    description: "Personal website, projects, and digital garden.",
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
      className={`${inter.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDark)) {
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
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-150 pb-16 sm:pb-0 overflow-x-hidden">
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
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
