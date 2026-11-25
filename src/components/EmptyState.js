const EmptyState = ({ message = "No Pokémon found." }) => (
  <div className="col-span-full text-center py-12 text-[color:var(--mfe-muted,#475569)]">
    <p>{message}</p>
  </div>
);

export default EmptyState;
