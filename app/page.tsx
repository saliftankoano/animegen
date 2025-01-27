"use client";

import Image from "next/image";
import { useState } from "react";
import { Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { JoinButton } from "@/components/JoinButton";
import { FaqItem } from "@/components/landing/FaqItem";
import { FeatureCard } from "@/components/landing/FeatureCard";
// import { Pricing } from "@/components/Pricing";
import { Navbar } from "@/components/Navbar";
const images = [
  "/demonslayer.png",
  "/eren.png",
  "/colosal.png",
  "/fight.png",
  "/captain.png",
  "/tanjiro.png",
  "/nezuko.png",
  "/fireandice.png",
  "/colosal.png",
];
export default function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <section className="mt-[10vh] w-[90vw] mx-auto h-[50%] md:h-[50vh] xl:h-[81vh] relative flex-grow flex items-center justify-center bg-gradient-to-b from-background to-secondary overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square relative overflow-hidden rounded-lg"
              >
                <Image
                  src={images[i % images.length]}
                  alt={`Image ${i + 1}`}
                  width={300}
                  height={300}
                  className="object-cover transition-transform duration-300 hover:scale-110"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="relative z-10 text-center space-y-6 p-8 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Welcome to AnimeGen
          </h1>
          <p className="text-xl md:text-2xl text-black/60 max-w-2xl mx-auto dark:text-white">
            The best anime images generated in community
          </p>
          <JoinButton />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-4 bg-card rounded-lg">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-primary"
            {...fadeInUp}
          >
            Why Choose AnimeGen?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FeatureCard
              title="Easy Image Creation"
              description="Write a prompt, One click, and get a high-quality image in 1 minute."
              imageSrc="/chillin.png"
              imageAlt="Easy Image Creation"
            />
            <FeatureCard
              title="Quality Images"
              description="Access high-quality images generated by the community."
              imageSrc="/meall.png"
              imageAlt="Quality Images"
            />
            <FeatureCard
              title="Free download"
              description="Download any image for free and use it for your own projects."
              imageSrc="/free.png"
              imageAlt="Free download"
            />
            <FeatureCard
              title="Community Interaction"
              description="Like, comment(soon) and share your images with the community."
              imageSrc="/join.png"
              imageAlt="Community Interaction"
            />
          </div>
        </motion.div>
      </section>
      {/* Pricing Section */}
      {/* <Pricing /> */}
      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-primary"
            {...fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem
              question="Is AnimeGen free to use?"
              answer="Yes, AnimeGen is currently free for all users. We plan to introduce premium features in the future, but a free tier will always be available."
              index={0}
              expandedFaq={expandedFaq}
              setExpandedFaq={setExpandedFaq}
            />
            <FaqItem
              question="What are the future plans for AnimeGen?"
              answer="We're constantly working on improving AnimeGen. Future plans include AI assited prompt generation, collaborative creation, and various styles of images."
              index={1}
              expandedFaq={expandedFaq}
              setExpandedFaq={setExpandedFaq}
            />
            <FaqItem
              question="How can I reach out?"
              answer="You can reach out to me on LinkedIn (see link in the footer)"
              index={2}
              expandedFaq={expandedFaq}
              setExpandedFaq={setExpandedFaq}
            />
            <FaqItem
              question="I would like to contribute to AnimeGen, how can I do that?"
              answer="Send me a DM on LinkedIn (see footer)"
              index={3}
              expandedFaq={expandedFaq}
              setExpandedFaq={setExpandedFaq}
            />
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="py-4 bg-background text-center">
        <p className="text-sm text-muted-foreground text-center text-orange-500 dark:text-white">
          Created by Salif Tankoano
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://saliftankoano.com"
            className="text-primary hover:underline"
          >
            <Laptop size={24} />
          </a>
          <a
            href="https://saliftankoano.com"
            className="text-primary hover:underline"
          >
            My Website
          </a>
          <a
            href="https://www.linkedin.com/in/salif-tankoano/"
            className="text-primary hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://www.linkedin.com/in/salif-tankoano/"
            className="text-primary hover:underline"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </footer>
    </div>
  );
}
