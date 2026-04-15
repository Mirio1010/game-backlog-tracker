import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Game<span className="text-cyan-400">Backlog</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
              Organize your collection, track your progress, and finally take
              control of your gaming backlog with a clean modern experience.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            
              <Link to="/">Home</Link>
            
           
              <Link to="/features">features</Link>
           
            <a href="#" className="transition hover:text-white">
              Sign In
            </a>
            <a href="#" className="transition hover:text-white">
              Sign Up
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GameBacklog. All rights reserved.</p>
          <p>Built for gamers who want to finish what they start.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer