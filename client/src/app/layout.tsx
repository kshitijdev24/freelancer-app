import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Providers } from "@/components/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "freeLance. | Modern Freelance Marketplace",
  description: "Find the best freelance services with our modern, minimal marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased font-outfit min-h-screen transition-colors duration-300`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <main className="min-h-[calc(100vh-80px)]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
