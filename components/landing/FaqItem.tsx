import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FaqItem({
  question,
  answer,
  index,
  expandedFaq,
  setExpandedFaq,
}: {
  question: string;
  answer: string;
  index: number;
  expandedFaq: number | null;
  setExpandedFaq: (index: number | null) => void;
}) {
  const isExpanded = index === expandedFaq;

  return (
    <motion.div
      className="border border-border rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-card hover:bg-muted/50 transition-colors"
        onClick={() => setExpandedFaq(isExpanded ? null : index)}
      >
        <span className="font-semibold">{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 bg-background">
          <p>{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
