import { Link } from "react-router-dom";
import LoginBtn from "../ui/LoginBtn";
import SignupBtn from "../ui/SignupBtn";
const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <h1 className="text-xl font-bold tracking-tight text-white">
          Game<span className="text-cyan-400">Backlog</span>
        </h1>

        <nav className="flex items-center gap-8">
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
            <LoginBtn />
          
          
            <SignupBtn />
         
        </div>
      </div>
    </header>
  );
};

export default Header;
