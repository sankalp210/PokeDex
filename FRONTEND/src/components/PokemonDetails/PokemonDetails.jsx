import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export const PokemonDetails = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function downloadPokemon() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            
            setPokemon({
                id: data.id,
                name: data.name,
                height: data.height / 10, // Convert to meters
                weight: data.weight / 10, // Convert to kg
                image: data.sprites.other.dream_world.front_default || data.sprites.front_default,
                types: data.types.map(typeInfo => typeInfo.type.name),
                abilities: data.abilities.map(abilityInfo => abilityInfo.ability.name)
            });
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching Pokemon data:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        downloadPokemon();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
                <div className="glassmorphism rounded-xl p-8 max-w-4xl mx-auto">
                    <div className="skeleton h-8 w-48 mb-8" />
                    <div className="skeleton h-64 w-64 mx-auto mb-8" />
                    <div className="space-y-4">
                        <div className="skeleton h-6 w-32" />
                        <div className="skeleton h-6 w-48" />
                        <div className="skeleton h-6 w-40" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glassmorphism rounded-xl p-8 max-w-4xl mx-auto"
            >
                <Link
                    to="/"
                    className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Pokédex
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-center">
                        <motion.img
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-64 h-64 object-contain drop-shadow-xl"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="pokemon-title text-3xl capitalize text-gray-900 dark:text-white mb-2">
                                {pokemon.name}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300">#{pokemon.id.toString().padStart(3, '0')}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {pokemon.types.map(type => (
                                <span key={type} className={`type-badge type-${type}`}>
                                    {type}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glassmorphism rounded-lg p-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Height</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{pokemon.height}m</p>
                                    </div>
                                    <div className="glassmorphism rounded-lg p-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Weight</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{pokemon.weight}kg</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Abilities</h2>
                                <div className="flex flex-wrap gap-2">
                                    {pokemon.abilities.map(ability => (
                                        <span
                                            key={ability}
                                            className="glassmorphism px-3 py-1 rounded-full capitalize text-gray-900 dark:text-white"
                                        >
                                            {ability}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};