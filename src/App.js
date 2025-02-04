import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import 'tailwindcss/tailwind.css';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-t-yellow-500 border-gray-300 rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      ></motion.div>
      <p className="text-lg font-semibold text-gray-700 mt-4">Loading Pokémon...</p>
    </div>
  );
};

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPokemon();
  }, []);

  const fetchPokemon = async (query = "") => {
    setLoading(true);
    const url = query
      ? `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
      : `https://pokeapi.co/api/v2/pokemon?limit=50`;

    try {
      if (query) {
        const response = await axios.get(url);
        setPokemon([response.data]); // Convert single Pokémon object to an array
      } else {
        const response = await axios.get(url);
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (poke) => {
            const res = await axios.get(poke.url);
            return res.data;
          })
        );
        setPokemon(pokemonDetails);
      }
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
      setPokemon([]); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🔴 Pokémon List</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="p-2 border border-gray-300 rounded-md w-64 text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          onClick={() => fetchPokemon(searchTerm)}
        >
          Search
        </button>
      </div>

      {/* Pokémon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pokemon.length > 0 ? (
          pokemon.map((poke) => (
            <motion.div
              key={poke.id}
              className="rounded-lg overflow-hidden shadow-md bg-white p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={poke.sprites.other["official-artwork"].front_default}
                alt={poke.name}
                className="w-full h-48 object-contain"
              />
              <h2 className="text-xl font-bold text-center capitalize mt-2">{poke.name}</h2>
              <div className="flex justify-center space-x-2 mt-2">
                {poke.types.map((typeInfo) => (
                  <span
                    key={typeInfo.type.name}
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      typeInfo.type.name === "grass"
                        ? "bg-green-500"
                        : typeInfo.type.name === "fire"
                        ? "bg-red-500"
                        : typeInfo.type.name === "water"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-red-500">No Pokémon found.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
