import axios from "axios";
import { useEffect, useState } from "react";
import { Pokemon } from "../Pokemon/Pokemon";
import { motion, AnimatePresence } from "framer-motion";

export const PokemonList = ({ searchTerm = '' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function DownloadPokemons() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
                const pokemonList = response.data.results;

                const pokemonDetails = await Promise.all(
                    pokemonList.map(async (pokemon) => {
                        const detailsResponse = await axios.get(pokemon.url);
                        return detailsResponse.data;
                    })
                );

                const res = pokemonDetails.map((pokeData) => {
                    return {
                        id: pokeData.id,
                        name: pokeData.name,
                        types: pokeData.types.map(typeInfo => typeInfo.type.name),
                        image: pokeData.sprites.front_default
                    };
                });

                setPokemonList(res);
                setFilteredList(res);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to download Pokémon data:", error);
                setError("Failed to load Pokémon. Please try again later.");
                setIsLoading(false);
            }
        }

        DownloadPokemons();
    }, []);

    useEffect(() => {
        const filtered = pokemonList.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pokemon.types.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredList(filtered);
    }, [searchTerm, pokemonList]);

    if (error) {
        return (
            <div className="text-center text-red-500 dark:text-red-400 p-4">
                {error}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="glassmorphism rounded-xl p-6">
                        <div className="skeleton w-32 h-32 mx-auto mb-4" />
                        <div className="skeleton h-6 w-3/4 mb-2" />
                        <div className="skeleton h-4 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <AnimatePresence>
            <Pokemon pokemonList={filteredList} />
        </AnimatePresence>
    );
};