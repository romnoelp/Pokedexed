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
   const [pokemonResult, setPokemonResult] = useState<PokemonData>();
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
               throw new Error("Can&apost find the Pokémon you provided");
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
   }, [searchedPokemon]); // Correct dependency

   return (
      <div className="flex p-6 sm:p-12 h-screen overflow-hidden">
         <div className="flex flex-col w-full gap-4 h-full w-full">
            <h1 className="text-3xl font-bold">Pokedexed</h1>
            <SearchBar onSearch={handleSearchPokemon} />
            <Card className="h-full flex flex-col">
               <CardHeader>
                  {pokemonResult ? (
                     <>
                        <CardTitle>
                           Here&aposs the Pokémon/s you searched:
                        </CardTitle>
                        <CardDescription>
                           The pokedex will show you various information about
                           them.
                        </CardDescription>
                     </>
                  ) : (
                     <>
                        <CardTitle>
                           You haven&apost searched for anything yet.
                        </CardTitle>
                        <CardDescription>
                           For the meantime, here are some pokemons that might
                           pique your interest.
                        </CardDescription>
                     </>
                  )}
               </CardHeader>
               <CardContent className="flex-1 min-h-0">
                  <ScrollArea className="h-full max-h-[650px] w-full rounded-md border p-4 overflow-y-auto">
                     {pokemonResult ? (
                        <PokemonCard
                           name={pokemonResult.name}
                           id={pokemonResult.id}
                           sprite={pokemonSprite}
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
