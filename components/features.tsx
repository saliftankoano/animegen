export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Magic at Your Fingertips
          </h2>
          <p className="text-xl text-gray-300">
            Discover the tools that will transform your creative vision into
            reality
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
            <i className="fa-solid fa-wand-magic-sparkles text-3xl text-indigo-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">
              AI Magic Engine
            </h3>
            <p className="text-gray-300">
              Experience the power of our next-gen AI that understands and
              creates stunning anime art from your descriptions with
              unprecedented accuracy
            </p>
          </div>
          <div className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
            <i className="fa-solid fa-palette text-3xl text-indigo-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">
              Infinite Style Universe
            </h3>
            <p className="text-gray-300">
              Explore countless anime styles from classNameic to modern,
              customize every detail, and develop your unique artistic signature
            </p>
          </div>
          <div className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
            <i className="fa-solid fa-download text-3xl text-indigo-400 mb-4"></i>
            <h3 className="text-xl font-bold text-white mb-2">
              Crystal-Clear Quality
            </h3>
            <p className="text-gray-300">
              Export your masterpieces in stunning high resolution, perfect for
              prints, social media, or professional projects
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
