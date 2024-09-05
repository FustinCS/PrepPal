"use client";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/custom/navbar";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { useMeals } from "@/components/meals-context";
import { SignInButton, useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import getStripe from "@/utils/get-stripe";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [ingredients, setIngredients] = useState<String[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { meals, setMeals } = useMeals();
  const [open, setOpen] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const router = useRouter();

  const handleAdd = () => {
    if (text) {
      setText("");
      setIngredients([...ingredients, text]);
    }
  };

  const handleDelete = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    setLoading(true);

    if (!user) {
      setOpen(true);
      setLoading(false);
      return;
    }

    if (ingredients.length === 0) {
      alert("Please add ingredients");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    if (response.ok) {
      const data = await response.json();
      setMeals(data);
      router.push("/generated");
    } else {
      alert("Failed to generate meals");
    }
    setLoading(false);
  };

  const handleDonate = async () => {
    if (!user) {
      setOpenDonate(true);
      return;
    }

    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSessionJson.statusCode === 500) {
      console.error(checkoutSessionJson.message);
      return;
    }

    const stripe = await getStripe();
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.error(error.message);
    }

  }

  return (
    <main className="flex min-h-screen w-screen flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center p-8 gap-8">
        <Card className="w-full lg:w-[750px] bg-card text-card-foreground shadow">
          <CardHeader>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              PrepPal
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
              Coming up with a meal has never been easier.
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                value={text}
                placeholder="Ingredient"
                onChange={(e) => setText(e.target.value)}
              />
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
                      <div
                        key={index}
                        className="text-sm flex justify-between items-center"
                      >
                        <div>{ingredient}</div>
                        <Button
                          variant="ghost"
                          onClick={() => handleDelete(index)}
                        >
                          x
                        </Button>
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
            <Button
              className="flex-1"
              disabled={loading}
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full lg:w-[500px] bg-card text-card-foreground shadow">
          <CardHeader>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
              Donations
            </h4>
          </CardHeader>
          <CardContent>
            <CardDescription>
                Donations are always appreciated. If you like this project and
                want to see this site still running, feel free to donate. Thank
                you! (P.S. by donating, you will get access to the recipe storage feature)
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="flex-auto" onClick={handleDonate}>Donate</Button>
          </CardFooter>
        </Card>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
          </DialogHeader>
          <p>You need to be signed in to access this feature.</p>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </DialogContent>
      </Dialog>
      <Dialog open={openDonate} onOpenChange={setOpenDonate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
          </DialogHeader>
          <p>In order to get the benefits from donating, you need to be signed in.</p>
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
        </DialogContent>
      </Dialog>
    </main>
  );
}
