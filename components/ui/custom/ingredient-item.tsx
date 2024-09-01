import { AspectRatio } from "../aspect-ratio";
import { Card, CardContent, CardFooter } from "../card";
import Image from "next/image";
import { Separator } from "../separator";
import Link from "next/link";
import { Button } from "../button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../scroll-area";
import { Meal } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { writeBatch } from "@firebase/firestore";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
interface IngredientItemProps {
  currentMeal: Meal;
  noSave?: boolean;
}

export function IngredientItem({
  currentMeal,
  noSave = false,
}: IngredientItemProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!user) {
      alert("Not signed in!");
      return;
    }

    const userDocRef = doc(db, "users", user.id);
    const mealsCollectionRef = collection(userDocRef, "meals");
    try {
      await addDoc(mealsCollectionRef, currentMeal);
      setSaved(true);
    } catch (error) {
      console.error("Error adding meal: ", error);
      alert("Failed to save meal.");
    }
  };

  return (
    <Card className="h-[550px] w-[350px] bg-card text-card-foreground shadow flex flex-col overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={currentMeal.image}
          alt={currentMeal.name}
          layout="fill"
          className="object-cover object-center"
        />
      </AspectRatio>
      <CardContent>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center p-4 min-h-[6rem] flex justify-center items-center">
          {currentMeal.name}
        </h4>
        <Separator />
        <div className="flex items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-4">
            {`${currentMeal.calories} calories`}
          </h4>
        </div>
        <ScrollArea className="h-[100px] w-full">
          {currentMeal.description}
        </ScrollArea>
      </CardContent>
      {noSave ? (
        <></>
      ) : (
        <CardFooter className="flex justify-center">
          {saved ? (
            <div className="flex justify-center">
              <CheckIcon className="text-green-600 size-10" />
            </div>
          ) : (
            <Button className="w-full" onClick={handleSave}>
              Save
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
