"use client";

import { Navbar } from "@/components/ui/custom/navbar";
import { motion } from "framer-motion";
import { IngredientItem } from "@/components/ui/custom/ingredient-item";
import { useMeals } from "@/components/meals-context";

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
                <IngredientItem currentMeal={meal} />
              </motion.li>
              )
            })}
          </motion.ul>
        </div>
      </div>
    </main>
  );
}
