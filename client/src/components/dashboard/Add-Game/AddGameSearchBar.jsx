const AddGameSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-4 shadow-xl sm:mb-8 sm:p-6">
      <label
        htmlFor="game-search"
        className="mb-2 block text-sm font-medium text-muted"
      >
        Search games
      </label>

      <input
        id="game-search"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search Elden Ring, Hollow Knight, Cyberpunk..."
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground outline-none placeholder:text-muted focus:border-primary"
      />
    </div>
  );
};

export default AddGameSearchBar;
