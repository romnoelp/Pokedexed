import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

type PokemonCardProps = {
   name: string;
   id: string;
   sprite: string;
};

const PokemonCard = (props: PokemonCardProps) => {
   return (
      <div className="w-44 h-48 flex">
         <Card className="w-full h-full ">
            <CardHeader>
               <CardTitle>{props.name}</CardTitle>
               <CardDescription>Pokemon id: {props.id}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
               <img src={props.sprite} alt="pokemon-not found" />
            </CardContent>
         </Card>
      </div>
   );
};

export default PokemonCard;
