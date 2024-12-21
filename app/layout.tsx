import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gen Walls",
  description: "Create and share wallpapers with the community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/gw.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="container mx-auto px-4 py-8 pt-20">
                {children}
              </main>
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
