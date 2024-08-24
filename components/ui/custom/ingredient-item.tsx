import { AspectRatio } from "../aspect-ratio";
import { Card, CardContent, CardFooter } from "../card";
import Image from "next/image";
import { Separator } from "../separator";
import Link from "next/link";
import { Button } from "../button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../scroll-area";

interface IngredientItemProps {}

export function IngredientItem({}: IngredientItemProps) {
  return (
    <Card className="h-[500px] w-[350px] bg-card text-card-foreground shadow flex flex-col overflow-hidden">
      <AspectRatio ratio={16 / 9}>
        <Image
          src="/strawberry.jpg"
          alt="Strawberry"
          layout="fill"
          className="object-cover object-center"
        />
      </AspectRatio>
      <CardContent>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center p-4">
          The People of the Kingdom
        </h4>
        <Separator />
        <div className="flex justify-between items-center">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight py-4">
            250 Calories
          </h4>
          <Link href="/">
            <Button>
              <ExternalLinkIcon />
            </Button>
          </Link>
        </div>
        <ScrollArea className="h-[100px] w-full">
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the kings pillow, in his
          soup, even in the royal toilet. The king was furious, but he couldnt
          seem to stop Jokester. And then, one day, the people of the kingdom
          discovered that the jokes left by Jokester were so funny that they
          couldnt help but laugh. And once they started laughing, they couldnt
          stop.
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save</Button>
      </CardFooter>
    </Card>
  );
}
