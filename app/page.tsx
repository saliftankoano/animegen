"use client";
import { Header } from "@/components/landing/Header";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Galery } from "@/components/landing/Galery";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
      {/* Gallery */}
      <Galery />
      {/* FAQ */}
      <Faq />
      {/* Footer */}
      <Footer />
    </div>
  );
}
