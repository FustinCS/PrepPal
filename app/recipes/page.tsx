"use client";
import { IngredientItem } from "@/components/ui/custom/ingredient-item";
import { Navbar } from "@/components/ui/custom/navbar";
import { db } from "@/firebase";
import { useDonationStatus } from "@/hooks/useDonationStatus";
import { Meal } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import {
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function RecipesPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [storedMeals, setStoredMeals] = useState<Meal[]>([]);
  const donated = useDonationStatus();

  useEffect(() => {
    async function getStoredMeals() {
      if (!user) return;
      const userDocRef = doc(db, "users", user.id);
      const mealsCollectionRef = collection(userDocRef, "meals");
      const mealsDoc = await getDocs(mealsCollectionRef);

      const meals: Meal[] = [];

      mealsDoc.forEach((doc: QueryDocumentSnapshot) => {
        meals.push({ ...(doc.data() as Meal) });
      });
      setStoredMeals(meals);
    }

    getStoredMeals();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  if (!donated) {
    return (
      <main className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-4xl font-bold text-center">
            Please donate to view this page
          </h1>
        </div>
      </main>
    );
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
            {storedMeals.map((meal, index) => {
              return (
                <motion.li key={index} variants={item}>
                  <IngredientItem currentMeal={meal} noSave={true} />
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </main>
  );
}
