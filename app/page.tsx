"use client";
import { Header } from "@/components/landing/Header";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Galery } from "@/components/landing/Galery";

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Hero */}
      <Hero />
      {/* Gallery */}
      <Galery />
      {/* Pricing */}
      {/* FAQ */}
      <Faq />
      {/* Footer */}
      <Footer />
    </>
  );
}
