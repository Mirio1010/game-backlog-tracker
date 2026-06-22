const AddGameSearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl sm:mb-8 sm:p-6">
      <label
        htmlFor="game-search"
        className="mb-2 block text-sm font-medium text-white/70"
      >
        Search games
      </label>

      <input
        id="game-search"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search Elden Ring, Hollow Knight, Cyberpunk..."
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-violet-400"
      />
    </div>
  );
};

export default AddGameSearchBar;
