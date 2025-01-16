"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon, CheckIcon, XIcon } from "lucide-react";
import { FaqItem } from "@/components/landing/FaqItem";

export default function Home() {
  const images = [
    "/colosal.png",
    "/nezuko.png",
    "/eren.png",
    "/jinwoo.png",
    "/captain.png",
    "/demonslayer.png",
  ];
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };
  return (
    <>
      {/* Navbar */}
      <header
        id="header"
        className="sticky top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-wand-magic-sparkles text-indigo-400 text-2xl"></i>
              <span className="text-xl font-bold text-white">AnimeGen</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <span className="text-gray-400 hover:text-white cursor-pointer">
                Home
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                Gallery
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                Features
              </span>
              <span className="text-gray-400 hover:text-white cursor-pointer">
                Pricing
              </span>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-400 hover:text-white">
                Sign In
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                Start Creating
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero */}
      <section id="hero" className="h-[800px] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 transition-opacity duration-1000 bg-gradient-to-r from-gray-900/90 to-gray-900/10"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="carousel relative h-full">
            <Image
              className={`w-full h-full object-cover`}
              style={{ objectPosition: "10% 45%" }}
              src={"/zenitsu.png"}
              alt="zenitsu from demon slayer"
              width={1920}
              height={300}
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/10"></div>
        </motion.div>
        <motion.div
          className="container mx-auto px-4 relative h-full flex pt-[12%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="max-w-2xl">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-6"
              {...fadeInUp}
            >
              Create Stunning Anime Art with AI
            </motion.h1>
            <p className="text-xl text-gray-300 mb-8">
              Step into a world where your creative visions come to life.
              Transform your ideas into breathtaking anime masterpieces with our
              revolutionary AI technology. No artistic experience needed – just
              pure imagination.
            </p>
            <div className="flex space-x-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 group">
                Begin Your Journey
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm">
                Explore Artworks
              </button>
            </div>
          </div>
        </motion.div>
      </section>
      {/* Gallery */}
      <section id="gallery" className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-white mb-4"
              {...fadeInUp}
            >
              Imagination Made Real
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300"
              {...fadeInUp}
              viewport={{ once: true }}
            >
              Be inspired by the incredible creations from our global community
              of artists
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.8 }}
                viewport={{ once: true }}
              >
                <Image
                  className="rounded-xl w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={image}
                  alt={`anime gallery preview image ${index + 1}`}
                  width={800}
                  height={288}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
          <div className="w-full text-center mt-8">
            <motion.button
              className="text-white text-lg px-8 py-4 bg-indigo-600  rounded-lg hover:bg-indigo-500 inline-flex items-center"
              {...fadeInUp}
            >
              See More
              <ArrowRightIcon className="ml-2" />
            </motion.button>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="py-6 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Creative Journey
            </h2>
            <p className="text-xl text-gray-300">
              Unlock the full potential of your imagination with our flexible
              plans
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="h-[80%] mt-[20%] p-8 rounded-xl border-2 bg-gray-900 relative transform hover:-translate-y-2 transition-transform">
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $0<span className="text-lg text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>10 AI masterpieces monthly</span>
                </li>
                <li className="flex items-center line-through">
                  <XIcon className="text-red-400 mr-2" />
                  <span>AI prompt assistant</span>
                </li>

                <li className="flex items-center line-through">
                  <XIcon className="text-red-400 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
            </div>
            {/* Pro */}
            <div className="p-8 rounded-xl border-2 border-yellow-600 bg-gray-900 relative transform hover:-translate-y-2 transition-transform">
              <div className="absolute top-0 right-0 bg-yellow-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $10<span className="text-lg text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>100 AI masterpieces monthly</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>AI prompt assistant</span>
                </li>

                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500">
                Unleash Creativity
              </button>
            </div>
            {/* PRO+ */}
            <div className="p-8 rounded-xl border-2 border-cyan-600 bg-gray-900 relative transform hover:-translate-y-2 transition-transform">
              <h3 className="text-2xl font-bold text-white mb-4">Pro+</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $25<span className="text-lg text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>250 AI masterpieces monthly</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>AI prompt assistant</span>
                </li>

                <li className="flex items-center">
                  <CheckIcon className="text-green-400 mr-2" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500">
                Scale Your Art
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-indigo-400"
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
      {/* Footer */}
      <footer
        id="footer"
        className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fa-solid fa-wand-magic-sparkles text-indigo-400 text-2xl"></i>
                <span className="text-xl font-bold text-white">AnimeGen</span>
              </div>
              <p className="text-sm">
                Empowering artists worldwide to bring their anime visions to
                life through AI innovation
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <span className="hover:text-white cursor-pointer">
                    Features
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">
                    Pricing
                  </span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">
                    Gallery
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <span className="hover:text-white cursor-pointer">About</span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">Blog</span>
                </li>
                <li>
                  <span className="hover:text-white cursor-pointer">
                    Careers
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Join Our Community</h4>
              <div className="flex space-x-4">
                <span className="hover:text-white cursor-pointer transition-colors">
                  <i className="fa-brands fa-twitter text-xl"></i>
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">
                  <i className="fa-brands fa-instagram text-xl"></i>
                </span>
                <span className="hover:text-white cursor-pointer transition-colors">
                  <i className="fa-brands fa-discord text-xl"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            <p>&copy; 2025 AnimeGen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
