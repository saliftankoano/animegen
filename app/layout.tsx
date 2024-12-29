import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import ThemeAwareToaster from "@/components/ThemeAwareToaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AnimeGen",
  description: "Create and share the best anime images with the community",
  keywords:
    "anime, AI art, anime generation, anime image generation, anime community, anime creator",
  authors: [{ name: "AnimeGen" }],
  openGraph: {
    title: "AnimeGen - AI Anime Image Generation",
    description: "Create and share the best anime images with the community",
    url: "https://animegen.io",
    siteName: "AnimeGen",
    images: [
      {
        url: "/AG.png",
        width: 40,
        height: 40,
        alt: "AnimeGen - Create Amazing Anime Art",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/AG.png" />
      </head>
      <body className={inter.className}>
        <ClerkProvider
          appearance={{
            baseTheme: neobrutalism,
          }}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="container mx-auto px-4 py-8 pt-20">
                <ThemeAwareToaster />
                {children}
                <Analytics />
              </main>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
