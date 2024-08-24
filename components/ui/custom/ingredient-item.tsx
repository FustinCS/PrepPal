import { AspectRatio } from "../aspect-ratio";
import { Card, CardContent, CardFooter } from "../card";
import Image from "next/image";
import { Separator } from "../separator";
import Link from "next/link";
import { Button } from "../button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../scroll-area";
import { Meal } from "@/utils/types";

interface IngredientItemProps {
  currentMeal: Meal;
}

export function IngredientItem({currentMeal}: IngredientItemProps) {
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
      <CardFooter>
        <Button className="w-full">Save</Button>
      </CardFooter>
    </Card>
  );
}
