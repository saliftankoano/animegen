"use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignedIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "./ThemeSwitch";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
export function Navbar() {
  const { user } = useUser();
  const router = useRouter();
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center z-50 border-b border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">GenWalls</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/feed">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Feed
              </Button>
            </Link>
            <SignedIn>
              <Link href="/create">
                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary/80"
                >
                  Create
                </Button>
              </Link>
            </SignedIn>
            <Link href="/profile">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Profile
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeSwitch />
          {user && (
            <Avatar
              className="hover:cursor-pointer"
              onClick={() => router.push("/profile")}
            >
              <AvatarImage src={user?.imageUrl || "/dawg.png"} />
              <AvatarFallback>
                {user?.username?.charAt(0) || "G"}
              </AvatarFallback>
            </Avatar>
          )}
          {!user && (
            <SignInButton>
              <Button className="bg-blue-700 hover:bg-black">Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
}
