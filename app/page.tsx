"use client";

import SearchBar from "./components/SearchBar";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import { error } from "console";

const Home = () => {
   const [searchedPokemon, setSearchedPokemon] = useState("");
   const [pokemonResult, setPokemonResult] = useState([]);
   const pokemonClient = new PokemonClient();
   const handleSearchPokemon = () => {
      console.log("Button clicked!");
   };

   useEffect(() => {
      fetch(`https://pokeapi.co/api/v2/pokemon/`)
         .then((response) => response.json())
         .then((data) => setPokemonResult(data))
      .catch((error) => console.error(error))
   }, [searchedPokemon]);

   return (
      <div className="flex p-12">
         <div className="flex flex-col w-full gap-4">
            <h1 className="text-3xl font-bold">Pokedexed</h1>
            <div className="flex gap-4">
               <SearchBar />
               <Button onClick={handleSearchPokemon}>Search</Button>
            </div>
            <Card>
               <CardHeader>
                  <CardTitle></CardTitle>
                  <CardDescription></CardDescription>
               </CardHeader>
               <CardContent>
                  <PokemonCard name={"Pikachu"} description="test" />
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
