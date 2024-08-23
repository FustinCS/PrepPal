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
import { useState } from "react";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text) {
      setText("");
      setIngredients([...ingredients, text]);
    }
  }

  const handleDelete = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  const handleGenerate = async () => {
    
  }

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
              <Input value={text} placeholder="Ingredient" onChange={(e) => setText(e.target.value)} />
              <Button onClick={handleAdd}>Add</Button>
            </div>
            <div className="my-4">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight my-2">
                Ingredients
              </h3>
              <ScrollArea className="h-72 w-full rounded-md border text-wrap">
                <div className="p-4">
                  {ingredients.map((ingredient, index) => (
                    <>
                      <div key={index} className="text-sm flex justify-between items-center">
                        <div>
                          {ingredient}
                        </div>
                        <Button variant="ghost" onClick={() => handleDelete(index)}>x</Button>
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
