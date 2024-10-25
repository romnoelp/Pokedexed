"use client";

import SearchBar from "./components/SearchBar";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

type PokemonData = {
   name: string;
   height: number;
   weight: number;
};
const Home = () => {
   const [searchedPokemon, setSearchedPokemon] = useState("");
   const [pokemonResult, setPokmonResult] = useState<PokemonData>();

   const handleSearchPokemon = (value: string) => {
      setSearchedPokemon(value);
   };

   useEffect(() => {
      const fetchPokemon = async () => {
         try {
            const response = await fetch(
               `https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`
            );

            if (!response.ok) {
               throw new Error("Can't find the pokemon you provided");
            }

            const data = await response.json();
            setPokmonResult(data);
         } catch (error) {
            console.error(error);
         }
      };
      fetchPokemon();
   }, [searchedPokemon]);

   return (
      <div className="flex p-12">
         <div className="flex flex-col w-full gap-4">
            <h1 className="text-3xl font-bold">Pokedexed</h1>
            <SearchBar onSearch={handleSearchPokemon} />
            <Card>
               <CardHeader>
                  <CardTitle>Here's the Pokemon/s you searched:</CardTitle>
                  <CardDescription>
                     The pokedex will show you various information about them.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <ScrollArea className="h-72 w-full rounded-md border">
                     {pokemonResult ? (
                        <div>
                           <p>
                              <strong>Name:</strong> {pokemonResult.name}
                           </p>
                           <p>
                              <strong>Height:</strong> {pokemonResult.height}
                           </p>
                           <p>
                              <strong>Weight:</strong> {pokemonResult.weight}
                           </p>
                        </div>
                     ) : (
                        <p>No Pokémon found.</p>
                     )}
                  </ScrollArea>
               </CardContent>
               <CardFooter>
                  <p className="font-thin text-sm">Powered by Pokenode-ts</p>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
};

export default Home;
