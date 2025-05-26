import { Routes, Route } from 'react-router-dom';
import { Pokedex } from '../Pokedex/Pokedex';
import { PokemonDetails } from '../PokemonDetails/PokemonDetails';
export const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
    )
}    