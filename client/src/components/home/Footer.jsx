import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-muted">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Game<span className="text-primary">Backlog</span>
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              Organize your collection, track your progress, and finally take
              control of your gaming backlog with a clean modern experience.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/" className="transition hover:text-foreground">
              Home
            </Link>

            <Link to="/features" className="transition hover:text-foreground">
              Features
            </Link>

            <Link to="/login" className="transition hover:text-foreground">
              Sign In
            </Link>

            <Link to="/signup" className="transition hover:text-foreground">
              Sign Up
            </Link>

            <a
              href="https://github.com/Mirio1010/game-backlog-tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 transition hover:text-foreground"
            >
              <FaGithub className="text-lg" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GameBacklog. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Built for gamers who want to finish what they start.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
