"use client";

import * as React from "react";
import Link from "next/link";
import { ToggleTheme } from "../toggle-theme";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="flex justify-between lg:justify-around m-6">
      <div>
        <Link href="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            PrepPal
          </h3>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <SignedOut>
          <ToggleTheme />
          <Button>
            <SignInButton>Get Started</SignInButton>
          </Button>
        </SignedOut>
        <SignedIn>
          <Link href="/recipes">
            <Button variant="ghost">Recipes</Button>
          </Link>
          <ToggleTheme />
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
