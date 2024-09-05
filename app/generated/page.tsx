"use client";

import { Navbar } from "@/components/ui/custom/navbar";
import { motion } from "framer-motion";
import { IngredientItem } from "@/components/ui/custom/ingredient-item";
import { useMeals } from "@/components/meals-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import getStripe from "@/utils/get-stripe";

const container = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
};

export default function ResultPage() {
  const {meals, setMeals} = useMeals();
  const [openDonate, setOpenDonate] = useState(false);

  const handleDonate = async () => {
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
    <main className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex justify-center">
        <div className="w-full sm:w-10/12">
          <motion.ul
            className="flex flex-wrap justify-center gap-8 m-8"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {meals.map((meal, index) => {
              return (
              <motion.li key={index} variants={item}>
                <IngredientItem currentMeal={meal} setOpenDonate={setOpenDonate} />
              </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
      <Dialog open={openDonate} onOpenChange={setOpenDonate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Donation Required</DialogTitle>
          </DialogHeader>
          <p>Please consider donating to use this feature. Thank you!!</p>
          <SignInButton>
            <Button onClick={handleDonate}>Donate</Button>
          </SignInButton>
        </DialogContent>
      </Dialog>
    </main>
  );
}
