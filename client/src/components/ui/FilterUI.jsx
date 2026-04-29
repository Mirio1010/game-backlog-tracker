const FilterUI = ({
  selectedStatus,
  setSelectedStatus,
  selectedPlatform,
  setSelectedPlatform,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search games..."
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder:text-white/40 outline-none md:flex-1"
        />

        <select
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white outline-none"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Backlog">Backlog</option>
          <option value="Playing">Playing</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>

        <select
          className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white outline-none"
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
        >
          <option value="All">All Platforms</option>
          <option value="PC">PC</option>
          <option value="Steam">Steam</option>
          <option value="PlayStation 5">PlayStation 5</option>
          <option value="PlayStation 4">PlayStation 4</option>
          <option value="Xbox Series X/S">Xbox Series X/S</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Nintendo Switch">Nintendo Switch</option>
          <option value="Nintendo Switch 2">Nintendo Switch 2</option>
          <option value="Steam Deck">Steam Deck</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default FilterUI;
