"use client";
import { SignInButton, SignUpButton, SignedIn, useUser } from "@clerk/nextjs";
import Link from "next/link";
import ProfileDropdown from "../ProfileDropdown";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const isLandingPage = pathname === "/";

  const handleNavigation = (sectionId: string) => {
    if (isLandingPage) {
      // If we're on the landing page, scroll to the section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to landing page with hash
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <header
      id="header"
      className="sticky top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <i className="fa-solid fa-wand-magic-sparkles text-indigo-400 text-2xl"></i>
            <span className="text-xl font-bold text-white">AnimeGen</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <span
              onClick={() => handleNavigation("hero")}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              Home
            </span>
            <span
              onClick={() => handleNavigation("gallery")}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              Gallery
            </span>
            <span
              onClick={() => handleNavigation("faq")}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              FAQ
            </span>
            <SignedIn>
              <Link href="/feed">
                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Feed
                </span>
              </Link>
            </SignedIn>
          </nav>

          <div className="flex items-center space-x-4">
            {user && <ProfileDropdown />}
            {!user && (
              <>
                <SignInButton
                  forceRedirectUrl={"/feed"}
                  signUpFallbackRedirectUrl={"/feed"}
                >
                  <button className="px-4 py-2 text-gray-400 hover:text-white">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                    Start Creating
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
