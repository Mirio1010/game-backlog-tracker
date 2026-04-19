const SideBar = () => {
  return (
    <aside className="min-h-screen w-64 border-r border-white/10 bg-black/30 px-4 py-6 text-white backdrop-blur">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight">Game Backlog</h2>
        <p className="mt-1 text-sm text-white/50">Track your progress</p>
      </div>

      <nav className="flex flex-col gap-2">
        <button className="rounded-xl bg-white/10 px-4 py-3 text-left text-sm font-medium text-white shadow-sm transition hover:bg-white/15 hover:text-violet-300">
          Dashboard
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
          My Backlog
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
          Add Game
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
          Playing
        </button>

        <button className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white">
          Completed
        </button>
      </nav>
    </aside>
  );
};

export default SideBar;
