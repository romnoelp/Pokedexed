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
import PokemonCard from "./components/PokemonCard";
import PokemonList from "./components/PokemonList";

type PokemonData = {
   name: string;
   id: string;
   height: number;
   weight: number;
};

const Home = () => {
   const [searchedPokemon, setSearchedPokemon] = useState("");
   const [pokemonLimit, setPokemonLimit] = useState(20);
   const [pokemonOffset, setPokemonOffset] = useState(0);
   const [pokemonResult, setPokemonResult] = useState<
      PokemonData | undefined
   >();
   const [pokemonSprite, setPokemonSprite] = useState("");
   const handleSearchPokemon = (value: string) => {
      setSearchedPokemon(value);
   };

   useEffect(() => {
      const fetchPokemon = async () => {
         try {
            const response = await fetch(
               `https://pokeapi.co/api/v2/pokemon/${searchedPokemon.toLowerCase()}`
            );

            if (!response.ok) {
               throw new Error("Can't find the Pokémon you provided");
            }

            const data = await response.json();
            setPokemonResult({
               id: data.id,
               name: data.name,
               height: data.height,
               weight: data.weight,
            });
            setPokemonSprite(data.sprites.front_default);
         } catch (error) {
            console.error(error);
         }
      };

      if (searchedPokemon) fetchPokemon();
   }, [searchedPokemon]);

   return (
      <div className="flex p-12 h-screen">
         <div className="flex flex-col w-full gap-4">
            <h1 className="text-3xl font-bold">Pokedexed</h1>
            <SearchBar onSearch={handleSearchPokemon} />
            <Card className="h-full flex flex-col">
               <CardHeader>
                  <CardTitle>Here's the Pokemon/s you searched:</CardTitle>
                  <CardDescription>
                     The pokedex will show you various information about them.
                  </CardDescription>
               </CardHeader>
               <CardContent className="flex-1 flex">
                  <ScrollArea className="h-full w-full rounded-md border p-4">
                     {pokemonResult ? (
                        <PokemonCard
                           name={pokemonResult ? pokemonResult.name : ""}
                           id={pokemonResult ? pokemonResult.id : ""}
                           sprite={pokemonResult ? pokemonSprite : ""}
                        />
                     ) : (
                        <PokemonList />
                     )}
                  </ScrollArea>
               </CardContent>
               <CardFooter>
                  <p className="font-thin text-sm">Powered by PokeAPI.co</p>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
};

export default Home;
