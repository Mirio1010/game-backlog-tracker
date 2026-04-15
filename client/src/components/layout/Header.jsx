import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Game<span className="text-cyan-400">Backlog</span>
        </h1>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/features"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            features
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            about
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex">
            Log In
          </button>
          <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
