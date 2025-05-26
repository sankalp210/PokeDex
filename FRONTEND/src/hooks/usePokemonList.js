import { useState, useEffect } from 'react';
import axios from 'axios';


export const usePokemonList = (searchTerm = '') => {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        filteredList: [],
        isLoading: true,
        error: null,
        prevUrl: null,
        nextUrl: null,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon'
    });

    const { pokemonList, filteredList, isLoading, error, prevUrl, nextUrl, pokedexUrl } = pokemonListState;

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const response = await axios.get(pokedexUrl);
                const pokemonList = response.data.results;

                setPokemonListState(prevState => ({
                    ...prevState,
                    prevUrl: response.data.previous,
                    nextUrl: response.data.next
                }));

                const pokemonDetails = await Promise.all(
                    pokemonList.map(async (pokemon) => {
                        const detailsResponse = await axios.get(pokemon.url);
                        return detailsResponse.data;
                    })
                );

                const res = pokemonDetails.map((pokeData) => ({
                    id: pokeData.id,
                    name: pokeData.name,
                    types: pokeData.types.map(typeInfo => typeInfo.type.name),
                    image: pokeData.sprites.other.dream_world.front_default || pokeData.sprites.front_default
                }));

                setPokemonListState(prevState => ({
                    ...prevState,
                    pokemonList: res,
                    filteredList: res.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())),
                    isLoading: false
                }));

            } catch (error) {
                console.error("Failed to download Pokémon data:", error);
                setPokemonListState(prevState => ({
                    ...prevState,
                    error: 'Failed to fetch Pokémon data.',
                    isLoading: false
                }));
            }
        }

        fetchPokemons();
    }, [pokedexUrl, searchTerm]);

    return { pokemonList, filteredList, isLoading, error, prevUrl, nextUrl, setPokemonListState  };
}