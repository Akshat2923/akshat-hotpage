import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Akshat Saladi",
    default: "Akshat Saladi",
  },
  description: "Welcome to my Hot Page with a custom AI chatbot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="light-background dark:hidden" />
          <div className="dark-background hidden dark:block" />
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <PageTransition>
              <main className="flex-grow mx-auto max-w-3xl px-3 py-10">{children}<SpeedInsights /></main>
            </PageTransition>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
