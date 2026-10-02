import { motion, useReducedMotion } from "framer-motion";
import { getTypeColor } from "../constants/pokemonTypes";

const PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><rect width='96' height='96' fill='%23e5e7eb'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-family='sans-serif' font-size='10'>No image</text></svg>";

const getSprite = (poke) => {
  const art = poke?.sprites?.other?.["official-artwork"]?.front_default;
  if (art) return art;
  const front = poke?.sprites?.front_default;
  if (front) return front;
  return PLACEHOLDER;
};

const getStat = (poke, name) =>
  poke?.stats?.find((s) => s.stat.name === name)?.base_stat ?? 0;

const StatBar = ({ label, value }) => {
  const pct = Math.min(100, Math.round((value / 200) * 100));
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-16 text-gray-600 uppercase">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-yellow-500 h-2 rounded-full"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <span className="w-8 text-right text-gray-800 font-semibold">{value}</span>
    </div>
  );
};

const PokemonCard = ({ poke }) => {
  const reduce = useReducedMotion();
  const hp = getStat(poke, "hp");
  const attack = getStat(poke, "attack");
  const defense = getStat(poke, "defense");

  return (
    <motion.article
      className="rounded-lg overflow-hidden shadow-md bg-white p-4"
      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: reduce ? 0 : 0.3 }}
    >
      <img
        src={getSprite(poke)}
        alt={poke.name}
        width={475}
        height={475}
        loading="lazy"
        decoding="async"
        className="w-full h-48 object-contain"
        onError={(e) => {
          if (e.currentTarget.src !== PLACEHOLDER) {
            e.currentTarget.src = PLACEHOLDER;
          }
        }}
      />
      <h2 className="text-xl font-bold text-center capitalize mt-2">
        {poke.name}
      </h2>
      <div className="flex justify-center flex-wrap gap-2 mt-2">
        {poke.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-3 py-1 rounded-full text-sm text-white ${getTypeColor(
              t.type.name
            )}`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-1">
        <StatBar label="HP" value={hp} />
        <StatBar label="Attack" value={attack} />
        <StatBar label="Defense" value={defense} />
      </div>
    </motion.article>
  );
};

export default PokemonCard;
