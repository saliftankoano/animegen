"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitch } from "./ThemeSwitch";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-center z-50 border-b border-primary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-4">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">GenWalls</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Home
              </Button>
            </Link>
            <Link href="/create">
              <Button
                variant="ghost"
                className="text-primary hover:text-primary/80"
              >
                Create
              </Button>
            </Link>
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
        <ThemeSwitch />
      </div>
    </nav>
  );
}
