import React from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link to="/Login">
      <button className="inline-flex whitespace-nowrap rounded-xl border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-white/10 sm:px-4">
        Log In
      </button>
    </Link>
  );
};

export default LoginBtn;
