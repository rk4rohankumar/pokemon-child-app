import { motion, useReducedMotion } from "framer-motion";

const Loader = ({ fullScreen = true, label = "Loading Pokémon..." }) => {
  const reduce = useReducedMotion();
  const wrapper = fullScreen
    ? "flex flex-col items-center justify-center h-screen"
    : "flex items-center justify-center gap-2 py-4";

  return (
    <div className={wrapper} role="status" aria-live="polite">
      <motion.div
        className={`${
          fullScreen ? "w-16 h-16 border-4" : "w-5 h-5 border-2"
        } border-t-yellow-500 border-gray-300 rounded-full ${
          reduce ? "" : "animate-spin"
        }`}
        aria-hidden="true"
      />
      {fullScreen && (
        <p className="text-lg font-semibold text-gray-700 mt-4">{label}</p>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Loader;
