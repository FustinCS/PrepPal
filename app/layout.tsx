import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { createContext, useContext } from "react";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from "@vercel/analytics/react"
import { cn } from "@/lib/utils";
import { MealsProvider } from "@/components/meals-context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Meal Suggestions",
  description: "Generate a list of meals based on your ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MealsProvider>{children}</MealsProvider>
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-HT10P1BM9Z" />
      </body>
    </html>
  );
}
