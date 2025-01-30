import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "lucide-react";

export function Pricing() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };
  return (
    <section id="pricing" className="py-6 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Choose Your Creative Journey
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300"
            {...fadeInUp}
            viewport={{ once: true }}
          >
            Unlock the full potential of your imagination with our flexible
            plans
          </motion.p>
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
  );
}
