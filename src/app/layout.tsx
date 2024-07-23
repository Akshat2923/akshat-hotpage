import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
     <meta name="viewport" content="width=device-width, initial-scale=1" />

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          <main className="mx-auto max-w-3xl px-3 py-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
