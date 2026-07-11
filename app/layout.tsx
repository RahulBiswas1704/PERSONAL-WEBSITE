import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import VisitorTracker from "@/components/VisitorTracker";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rahul",
    default: "Rahul | Full-stack Developer & Founder",
  },
  description: "Personal website and blog of Rahul. Full-stack developer, founder of bowlit, and MBA student.",
  metadataBase: new URL("https://rahul.dev"), // Fallback base URL for metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
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
                  
                  var accent = localStorage.getItem('accent') || 'amber';
                  document.documentElement.setAttribute('data-accent', accent);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-150 pb-16 sm:pb-0">
        <Header />
        <main className="max-w-2xl mx-auto px-6 py-12 flex-1 w-full">
          {children}
        </main>
        <Footer />
        <MobileNav />
        <VisitorTracker />
      </body>
    </html>
  );
}
