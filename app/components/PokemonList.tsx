import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

type Pokemon = {
   name: string;
   url: string;
   id: string;
   sprite: string;
};

const PokemonList = () => {
   const [pokemonLimit, setPokemonLimit] = useState(20);
   const [pokemonOffset, setPokemonOffset] = useState(0);
   const [retrievedPokemonList, setRetrievedPokemonList] = useState<Pokemon[]>(
      []
   );
   const fetchPokemonList = async () => {
      const response = await fetch(
         `https://pokeapi.co/api/v2//pokemon?limit=${pokemonLimit}&offset=${pokemonOffset}`
      );

      if (!response.ok) {
         throw new Error("Can't find the list of pokemons to be rendered.");
      }

      const data = await response.json();
      setRetrievedPokemonList(data);
   };

   useEffect(() => {
      fetchPokemonList();
   }, []);

   return (
      <div>
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
