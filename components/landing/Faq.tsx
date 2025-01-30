import { motion } from "framer-motion";
import { FaqItem } from "@/components/landing/FaqItem";
import { useState } from "react";

export function Faq() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background" id="faq">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-indigo-400"
          {...fadeInUp}
          viewport={{ once: true }}
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
  );
}
