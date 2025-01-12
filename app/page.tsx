import Image from "next/image";

export default function Home() {
  return (
    <div id="wrapper" className="bg-gray-900">
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
      <section id="hero" className="h-[800px] relative overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <div className="carousel relative h-full">
            <Image
              className="w-full h-full object-cover"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/3446f71adb-2b32d97b5a666cac83dc.png"
              alt="anime futuristic city at night with neon lights and flying vehicles, cyberpunk style"
              width={800}
              height={288}
            />
            <Image
              className="w-full h-full object-cover hidden"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6a3f638e11-d65c64672de0133d77f8.png"
              alt="magical anime forest with glowing spirits and mystical elements, fantasy style"
              width={800}
              height={288}
            />
            <Image
              className="w-full h-full object-cover hidden"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/897a61a1af-a79831db24274c61d958.png"
              alt="post-apocalyptic anime cityscape with nature reclaiming buildings, dramatic lighting"
              width={800}
              height={288}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60"></div>
        </div>
        <div className="container mx-auto px-4 relative h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Create Stunning Anime Art with AI
            </h1>
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
        </div>
      </section>
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
                customize every detail, and develop your unique artistic
                signature
              </p>
            </div>
            <div className="p-8 rounded-xl bg-gray-700/50 backdrop-blur-sm transform hover:-translate-y-1 transition-all">
              <i className="fa-solid fa-download text-3xl text-indigo-400 mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">
                Crystal-Clear Quality
              </h3>
              <p className="text-gray-300">
                Export your masterpieces in stunning high resolution, perfect
                for prints, social media, or professional projects
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="gallery" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Imagination Made Real
            </h2>
            <p className="text-xl text-gray-300">
              Be inspired by the incredible creations from our global community
              of artists
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                className="rounded-xl w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/658ce6cd67-d24d3f1465cabf1f292f.png"
                alt="anime girl with cyberpunk outfit and neon hair, futuristic city background"
                width={800}
                height={288}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                className="rounded-xl w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1af64efb2b-6f09627393fabcc86168.png"
                alt="epic anime battle scene with magic and energy effects, dramatic lighting"
                width={800}
                height={288}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="group relative overflow-hidden rounded-xl">
              <Image
                className="rounded-xl w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5b8a33f57d-f780b5c374f715bbb8e9.png"
                alt="serene anime landscape with floating islands and aurora lights"
                width={800}
                height={288}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 bg-gray-800">
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
            <div className="p-8 rounded-xl border border-gray-700 bg-gray-900 hover:border-indigo-400 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">Explorer</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $9<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>100 AI masterpieces monthly</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>Essential anime styles</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>Full HD quality exports</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                Start Creating
              </button>
            </div>
            <div className="p-8 rounded-xl border-2 border-indigo-500 bg-gray-900 relative transform hover:-translate-y-2 transition-transform">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-xl text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Creator</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $29<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>500 AI masterpieces monthly</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>Premium style collection</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>4K quality exports</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>Priority creative support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400">
                Unleash Creativity
              </button>
            </div>
            <div className="p-8 rounded-xl border border-gray-700 bg-gray-900 hover:border-indigo-400 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">Studio</h3>
              <div className="text-4xl font-bold text-white mb-6">
                $99<span className="text-lg text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>Unlimited creations</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>Custom style development</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>8K ultra-HD exports</span>
                </li>
                <li className="flex items-center">
                  <i className="fa-solid fa-check text-indigo-400 mr-2"></i>
                  <span>24/7 dedicated support</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                Scale Your Art
              </button>
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
}
