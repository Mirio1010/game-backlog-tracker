const FilterUI = ({
  selectedStatus,
  setSelectedStatus,
  selectedPlatform,
  setSelectedPlatform,
  searchTerm,
  setSearchTerm,
}) => {
  const selectClass =
    "w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white outline-none backdrop-blur-md transition focus:border-violet-400 focus:bg-white/15 md:w-auto md:min-w-40";

  const optionClass = "bg-zinc-900 text-white";

  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur sm:p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search games..."
          className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-white placeholder:text-white/40 outline-none transition focus:border-violet-400 focus:bg-white/15 md:flex-1"
        />

        <select
          className={selectClass}
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option className={optionClass} value="All">
            All Statuses
          </option>
          <option className={optionClass} value="Backlog">
            Backlog
          </option>
          <option className={optionClass} value="Playing">
            Playing
          </option>
          <option className={optionClass} value="Completed">
            Completed
          </option>
          <option className={optionClass} value="Dropped">
            Dropped
          </option>
        </select>

        <select
          className={selectClass}
          value={selectedPlatform}
          onChange={(event) => setSelectedPlatform(event.target.value)}
        >
          <option className={optionClass} value="All">
            All Platforms
          </option>
          <option className={optionClass} value="PC">
            PC
          </option>
          <option className={optionClass} value="Steam">
            Steam
          </option>
          <option className={optionClass} value="PlayStation 5">
            PlayStation 5
          </option>
          <option className={optionClass} value="PlayStation 4">
            PlayStation 4
          </option>
          <option className={optionClass} value="Xbox Series X/S">
            Xbox Series X/S
          </option>
          <option className={optionClass} value="Xbox One">
            Xbox One
          </option>
          <option className={optionClass} value="Nintendo Switch">
            Nintendo Switch
          </option>
          <option className={optionClass} value="Nintendo Switch 2">
            Nintendo Switch 2
          </option>
          <option className={optionClass} value="Steam Deck">
            Steam Deck
          </option>
          <option className={optionClass} value="Mobile">
            Mobile
          </option>
          <option className={optionClass} value="Other">
            Other
          </option>
        </select>
      </div>
    </div>
  );
};

export default FilterUI;
