import { NavLink } from "react-router-dom";

const SideBar = () => {
  const linkBaseClasses =
    "rounded-xl px-4 py-3 text-left text-sm font-medium transition";

  const getLinkClasses = ({ isActive }) =>
    isActive
      ? `${linkBaseClasses} bg-white/10 text-white shadow-sm hover:bg-white/15 hover:text-violet-300`
      : `${linkBaseClasses} text-white/70 hover:bg-white/10 hover:text-white`;

  return (
    <aside className="h-full w-64 border-r border-white/10 bg-black/30 px-4 py-6 text-white backdrop-blur">
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight">Game Backlog</h2>
        <p className="mt-1 text-sm text-white/50">Track your progress</p>
      </div>

      <nav className="flex flex-col gap-2">
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
    </aside>
  );
};

export default SideBar;
