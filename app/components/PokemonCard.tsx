import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type PokemonCardProps = {
   name: string;
   id: string;
   sprite: string;
};

const PokemonCard = (props: PokemonCardProps) => {
   return (
      <div className="w-44 h-48 flex">
         <Card className="w-full h-full">
            <CardHeader>
               <CardTitle>{props.name}</CardTitle>
               <CardDescription>Pokemon id: {props.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
               {props.sprite ? (
                  <Image
                     src={props.sprite}
                     alt={`${props.name} sprite`}
                     width={96}
                     height={96}
                  />
               ) : (
                  <p>Sprite not available</p>
               )}
            </CardContent>
         </Card>
      </div>
   );
};

export default PokemonCard;
