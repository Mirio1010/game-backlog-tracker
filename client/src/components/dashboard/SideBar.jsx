import { NavLink, useNavigate } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdListAlt,
} from "react-icons/md";

import { RiFunctionAddLine } from "react-icons/ri";

import { IoIosStats } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";


const SideBar = () => {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const iconClass = "shrink-0 text-lg";

  const linkBaseClasses =
    "flex items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-medium transition";

  const getLinkClasses = ({ isActive }) =>
    isActive
      ? `${linkBaseClasses} shrink-0 bg-card text-foreground shadow-sm hover:bg-white/15 hover:text-primary`
      : `${linkBaseClasses} shrink-0 text-muted hover:bg-card hover:text-foreground`;

  return (
    <aside className="flex h-full w-full flex-col border-b border-border bg-surface/80 px-4 py-4 text-foreground backdrop-blur md:w-64 md:border-b-0 md:border-r md:py-6">
      <div className="mb-4 flex items-center justify-between gap-4 md:mb-8 md:block">
        <div>
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            Game Backlog
          </h2>
          <p className="mt-1 text-xs text-muted sm:text-sm">
            Track your progress
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="shrink-0 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted transition hover:bg-red-500/10 hover:text-red-300 md:hidden"
        >
          Log out
        </button>
      </div>

      <nav className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
        <NavLink to="/dashboard" end className={getLinkClasses}>
          <MdOutlineDashboard className={iconClass} />
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/backlog" className={getLinkClasses}>
          <MdListAlt className={iconClass} />
          My Backlog
        </NavLink>

        <NavLink to="/dashboard/add-game" className={getLinkClasses}>
          <RiFunctionAddLine className={iconClass} />
          Add Game
        </NavLink>

        <NavLink to="/dashboard/stats" className={getLinkClasses}>
          <IoIosStats className={iconClass} />
          Stats
        </NavLink>

        <NavLink to="/dashboard/wishlist" className={getLinkClasses}>
          <FaRegStar className={iconClass}/>
          Wishlist
        </NavLink>
      </nav>

      <SignedInBox
        username={username}
        onLogout={handleLogout}
        className="mt-auto hidden md:block"
      />
    </aside>
  );
};

const SignedInBox = ({ username, onLogout, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-4 shadow-lg backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary ring-1 ring-primary/20">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {username}
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="mt-4 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted transition hover:bg-red-500/10 hover:text-red-300"
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
