export const TYPE_COLORS = {
  normal: "bg-gray-400",
  fighting: "bg-red-700",
  flying: "bg-indigo-300",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  rock: "bg-yellow-800",
  bug: "bg-lime-500",
  ghost: "bg-purple-800",
  steel: "bg-slate-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-400",
  psychic: "bg-pink-500",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-700",
  dark: "bg-stone-700",
  fairy: "bg-pink-300",
};

export const getTypeColor = (type) => TYPE_COLORS[type] || "bg-gray-500";
