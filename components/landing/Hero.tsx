import { motion } from "framer-motion";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  return (
    <section id="hero" className="h-[800px] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000 bg-gradient-to-r from-gray-900/90 to-gray-900/10"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
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
        viewport={{ once: true }}
      >
        <div className="max-w-2xl">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            {...fadeInUp}
            viewport={{ once: true }}
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
            <SignUpButton>
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 group">
                Begin Your Journey
                <i className="fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
              </button>
            </SignUpButton>
            <button
              className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 backdrop-blur-sm"
              onClick={() => scrollToSection("gallery")}
            >
              Explore Artworks
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
