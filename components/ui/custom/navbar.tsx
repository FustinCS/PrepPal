"use client";

import * as React from "react";
import Link from "next/link";
import { ToggleTheme } from "../toggle-theme";
import { Button } from "../button";

export function Navbar() {
  return (
    <nav className="flex justify-between lg:justify-around m-6">
      <div>
        <Link href="/">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            AI Meal Suggestions
          </h3>
        </Link>
      </div>
      <div>
        <ToggleTheme />
      </div>
    </nav>
  );
}
