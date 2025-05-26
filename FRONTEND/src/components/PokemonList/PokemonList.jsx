import { Pokemon } from "../Pokemon/Pokemon";
import { motion, AnimatePresence } from "framer-motion";
import { usePokemonList } from "../../hooks/usePokemonList";

export const PokemonList = ({ searchTerm = '' }) => {
    
    // Using the custom hook to fetch and manage Pokémon data
    const { pokemonList, filteredList, isLoading, error, prevUrl, nextUrl, setPokemonListState } = usePokemonList(searchTerm);

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
        <>
            <AnimatePresence>
                <Pokemon pokemonList={filteredList} />
            </AnimatePresence>

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    disabled={prevUrl == null}
                    onClick={() =>
                        setPokemonListState(prevState => ({
                            ...prevState,
                            pokedexUrl: prevUrl
                        }))
                    }
                    className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ⬅ Prev
                </button>

                <button
                    disabled={nextUrl == null}
                    onClick={() =>
                        setPokemonListState(prevState => ({
                            ...prevState,
                            pokedexUrl: nextUrl
                        }))
                    }
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Next ➡
                </button>
            </div>
        </>
    );
};
