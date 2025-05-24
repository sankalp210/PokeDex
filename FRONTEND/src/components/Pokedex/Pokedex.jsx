import { useState } from "react";
import { Search } from "../Search/Search";
import { PokemonList } from "../PokemonList/PokemonList";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

export const Pokedex = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="pokemon-title text-4xl md:text-5xl text-gray-900 dark:text-white">
                        Pokédex
                    </h1>
                    <ThemeToggle />
                </div>
                <Search onSearch={setSearchTerm} />
                <div className="mt-8">
                    <PokemonList searchTerm={searchTerm} />
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};