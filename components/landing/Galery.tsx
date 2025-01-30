import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
export function Galery() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };
  const images = [
    "/colosal.png",
    "/nezuko.png",
    "/eren.png",
    "/jinwoo.png",
    "/captain.png",
    "/demonslayer.png",
  ];
  return (
    <section id="gallery" className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Imagination Made Real
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Be inspired by the incredible creations from our global community of
            artists
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
            viewport={{ once: true }}
          >
            See More
            <ArrowRightIcon className="ml-2" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
