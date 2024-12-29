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
