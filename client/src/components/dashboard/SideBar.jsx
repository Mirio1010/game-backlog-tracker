import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const linkBaseClasses =
    "rounded-xl px-4 py-3 text-left text-sm font-medium transition";

  const getLinkClasses = ({ isActive }) =>
    isActive
      ? `${linkBaseClasses} shrink-0 bg-white/10 text-white shadow-sm hover:bg-white/15 hover:text-violet-300`
      : `${linkBaseClasses} shrink-0 text-white/70 hover:bg-white/10 hover:text-white`;

  return (
    <aside className="flex h-full w-full flex-col border-b border-white/10 bg-black/30 px-4 py-4 text-white backdrop-blur md:w-64 md:border-b-0 md:border-r md:py-6">
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-8 md:block">
        <div>
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            Game Backlog
          </h2>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Track your progress
          </p>
        </div>

        <SignedInBox
          username={username}
          onLogout={handleLogout}
          className="hidden sm:block md:hidden"
          compact
        />
      </div>

      <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
        <NavLink to="/dashboard" end className={getLinkClasses}>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/backlog" className={getLinkClasses}>
          My Backlog
        </NavLink>

        <NavLink to="/dashboard/add-game" className={getLinkClasses}>
          Add Game
        </NavLink>

        <NavLink to="/dashboard/stats" className={getLinkClasses}>
          Stats
        </NavLink>

        <NavLink to="/dashboard/wishlist" className={getLinkClasses}>
          Wishlist
        </NavLink>
      </nav>

      <SignedInBox
        username={username}
        onLogout={handleLogout}
        className="mt-4 sm:hidden md:mt-auto md:block"
      />
    </aside>
  );
};

const SignedInBox = ({ username, onLogout, className = "", compact = false }) => {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-sm font-bold text-violet-200 ring-1 ring-violet-300/20">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {username}
          </p>
        </div>
      </div>

      {!compact && (
        <button
          onClick={onLogout}
          className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/70 transition hover:bg-red-500/10 hover:text-red-300"
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default SideBar;
