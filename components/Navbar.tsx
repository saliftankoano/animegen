"use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignedIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "./ThemeSwitch";
import { useUser } from "@clerk/nextjs";
import ProfileDropdown from "@/components/ProfileDropdown";
export function Navbar() {
  const { user } = useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center z-50 border-b border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-16 items-center justify-between mx-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary hover:text-blue-700 dark:hover:text-white">
              AnimeGen
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/feed">
              <Button
                variant="ghost"
                className="text-primary font-bold hover:bg-blue-600 hover:text-white dark:hover:text-black dark:hover:bg-white"
              >
                Feed
              </Button>
            </Link>
            <SignedIn>
              <Link href="/create">
                <Button
                  variant="ghost"
                  className="font-bold  text-blue-700 hover:text-white hover:bg-blue-700 dark:text-yellow-500 dark:hover:text-black dark:hover:bg-white"
                >
                  Create
                </Button>
              </Link>
            </SignedIn>
            {user && (
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="text-primary font-bold hover:text-white hover:bg-blue-700 dark:hover:text-black dark:hover:bg-white"
                >
                  Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          {user && <ProfileDropdown />}
          {!user && (
            <SignInButton
              forceRedirectUrl={"/feed"}
              signUpFallbackRedirectUrl={"/feed"}
            >
              <Button className="bg-blue-700 hover:bg-white hover:text-black">
                Sign In
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}
