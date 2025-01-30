export function Footer() {
  return (
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
              Empowering artists worldwide to bring their anime visions to life
              through AI innovation
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
                <span className="hover:text-white cursor-pointer">Pricing</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Gallery</span>
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
                <span className="hover:text-white cursor-pointer">Careers</span>
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
  );
}
