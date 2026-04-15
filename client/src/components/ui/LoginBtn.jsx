import React from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link to="/Login">
      <button className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex">
        Log In
      </button>
    </Link>
  );
};

export default LoginBtn;
