import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export const Pokemon = ({ pokemonList }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
    >
      {pokemonList.map(pokemon => (
        <motion.div
          key={pokemon.id}
          variants={item}
          className="glassmorphism rounded-xl p-6 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <div className="w-full aspect-square flex items-center justify-center mb-4">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-32 h-32 object-contain drop-shadow-xl"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-bold capitalize mb-2 text-gray-900 dark:text-white">
              {pokemon.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.types.map(type => (
                <span key={type} className={`type-badge type-${type}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};