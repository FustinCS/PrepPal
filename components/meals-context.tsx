"use client";

import {createContext, useContext, useState } from "react";
import { Meal } from "../utils/types";

type MealsContextType = {
    meals: Meal[],
    setMeals: (meals: Meal[]) => void,
}

const MealContext = createContext<MealsContextType>({
    meals: [],
    setMeals: () => {},
});

export function useMeals() {
    return useContext(MealContext);
}



export function MealsProvider({children}: {children: React.ReactNode}) {
    const [meals, setMeals] = useState<Meal[]>([]);
    return (
        <MealContext.Provider value={{meals, setMeals}}>
            {children}
        </MealContext.Provider>
    )
}