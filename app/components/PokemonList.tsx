import { useEffect, useState, useCallback } from "react";
import PokemonCard from "./PokemonCard";

type Pokemon = {
   name: string;
   id: string;
   sprite: string;
};

const PokemonList = () => {
   const [retrievedPokemonList, setRetrievedPokemonList] = useState<Pokemon[]>(
      []
   );
   const pokemonLimit = 50; // Fixed limit
   const pokemonOffset = 0; // Fixed offset

   const fetchPokemonList = useCallback(async () => {
      try {
         const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${pokemonLimit}&offset=${pokemonOffset}`
         );

         if (!response.ok) {
            throw new Error("Can't find the list of Pokémon to be rendered.");
         }

         const data = await response.json();
         const pokemonData = await Promise.all(
            data.results.map(async (pokemon: { name: string; url: string }) => {
               const res = await fetch(pokemon.url);
               const details = await res.json();
               return {
                  name: pokemon.name,
                  id: details.id,
                  sprite: details.sprites.front_default,
               };
            })
         );

         setRetrievedPokemonList(pokemonData);
      } catch (error) {
         console.error(error);
      }
   }, [pokemonLimit, pokemonOffset]);

   useEffect(() => {
      fetchPokemonList();
   }, [fetchPokemonList]);

   return (
      <div className="flex flex-wrap gap-4 h-full">
         {retrievedPokemonList.map((pokemon) => (
            <PokemonCard
               key={pokemon.id}
               name={pokemon.name}
               id={pokemon.id}
               sprite={pokemon.sprite}
            />
         ))}
      </div>
   );
};

export default PokemonList;
