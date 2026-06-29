import { Link } from "react-router-dom";
import LoginBtn from "../ui/LoginBtn";
import SignupBtn from "../ui/SignupBtn";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 md:flex-nowrap md:px-10 md:py-4 lg:px-16">
        <h1 className="shrink-0 text-xl font-bold tracking-tight text-foreground">
          Game<span className="text-primary">Backlog</span>
        </h1>

        <nav className="order-3 flex w-full items-center justify-center gap-4 overflow-x-auto pt-1 sm:gap-6 md:order-none md:w-auto md:justify-start md:gap-8 md:overflow-visible md:pt-0">
          <Link
            to="/"
            className="shrink-0 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/features"
            className="shrink-0 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            features
          </Link>

          <Link
            to="/about"
            className="shrink-0 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            about
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LoginBtn />

          <SignupBtn />
        </div>
      </div>
    </header>
  );
};

export default Header;
