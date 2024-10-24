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
   description: string;
};

const PokemonCard = (props: PokemonCardProps) => {
   return (
      <div className="w-64 flex">
         <Card>
            <CardHeader>
               <CardTitle>{props.name}</CardTitle>
               <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
               <p></p>
            </CardContent>
            <CardFooter>
               <p>Card Footer</p>
            </CardFooter>
         </Card>
      </div>
   );
};

export default PokemonCard;
