// Every background here clears WCAG AA (>= 4.5:1) against the white badge
// text at text-sm; the hue per type is kept, only the shade is deepened.
export const TYPE_COLORS = {
  normal: "bg-gray-500",
  fighting: "bg-red-700",
  flying: "bg-indigo-600",
  poison: "bg-purple-600",
  ground: "bg-yellow-700",
  rock: "bg-yellow-800",
  bug: "bg-lime-700",
  ghost: "bg-purple-800",
  steel: "bg-slate-500",
  fire: "bg-red-600",
  water: "bg-blue-600",
  grass: "bg-green-700",
  electric: "bg-yellow-700",
  psychic: "bg-pink-600",
  ice: "bg-cyan-700",
  dragon: "bg-indigo-700",
  dark: "bg-stone-700",
  fairy: "bg-pink-700",
};

export const getTypeColor = (type) => TYPE_COLORS[type] || "bg-gray-500";
