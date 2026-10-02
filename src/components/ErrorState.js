const ErrorState = ({ message = "Something went wrong.", onRetry }) => (
  <div
    className="flex flex-col items-center justify-center py-12 text-center"
    role="alert"
  >
    <p className="text-red-600 font-semibold mb-4">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        aria-label="Retry loading Pokémon"
        className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-700"
      >
        Retry
      </button>
    )}
  </div>
);

export default ErrorState;
