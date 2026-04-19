const EmptyState = ({ message = "No Pokémon found." }) => (
  <div className="col-span-full text-center py-12 text-gray-600">
    <p>{message}</p>
  </div>
);

export default EmptyState;
