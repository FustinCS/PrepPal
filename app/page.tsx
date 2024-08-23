"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/custom/navbar";
import { Input } from "@/components/ui/input";
import { ToggleTheme } from "@/components/ui/toggle-theme";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) =>
    `v1.2.0-beta.${
      a.length - i
    }`
);

export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex justify-center items-center p-8">
        <Card className="w-full lg:w-[750px] bg-card text-card-foreground shadow">
          <CardHeader>
            <CardTitle>AI Meal Suggestions</CardTitle>
            <CardDescription>Enter your ingredients here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input type="ingredients" placeholder="Ingedient" />
              <Button>Add</Button>
            </div>
            <div className="my-4">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
                Ingredients
              </h3>
              <ScrollArea className="h-72 w-full rounded-md border text-wrap">
                <div className="p-4">
                  {tags.map((tag) => (
                    <>
                      <div key={tag} className="text-sm">
                        {tag}
                      </div>
                      <Separator className="my-2" />
                    </>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </CardContent>
          <CardFooter className="flex">
            <Button className="flex-1">Generate</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
