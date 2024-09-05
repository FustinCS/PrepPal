import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { GoogleAnalytics } from '@next/third-parties/google';
import { cn } from "@/lib/utils";
import { MealsProvider } from "@/components/meals-context";
import { ClerkProvider } from '@clerk/nextjs'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "PrepPal",
  description: "Generate a list of meals based on your ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
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
          <GoogleAnalytics gaId="G-HT10P1BM9Z" />
        </body>
      </html>
    </ClerkProvider>
  );
}
