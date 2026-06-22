import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/home/Header";

const Login = () => {
  return (
    <MainLayout>
      <Header />
      <Form />
    </MainLayout>
  );
};

const LeftPanel = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-600/20 via-cyan-500/10 to-transparent p-6 sm:p-10 md:p-16">
      <div className="max-w-md space-y-4 sm:space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
          GameBacklog
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Welcome Back
        </h1>

        <p className="text-base leading-7 text-zinc-300">
          Did you know most gamers have a growing, unplayed library of dozens of
          games—sometimes over 100—built up through digital sales, subscription
          services like Game Pass, and free giveaways?
        </p>
      </div>
    </div>
  );
};

const Form = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const location = useLocation();

  const signupMessage = location.state?.message;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed. Please try again.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage(data.message);

      console.log("Login successful:", data);

      navigate("/dashboard");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <section className="grid min-h-[calc(100vh-105px)] grid-cols-1 overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur md:min-h-screen md:grid-cols-2">
        <LeftPanel />

        <div className="flex items-center justify-center bg-black/20 p-4 sm:p-10 md:p-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-5 shadow-xl sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-white">Log In</h2>

            {error && (
              <p className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            {(signupMessage || message) && (
              <p className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                {signupMessage || message}
              </p>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-200"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-200"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading && (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"></span>
                )}

                {isLoading ? "Logging in..." : "Submit"}
              </button>

              {isLoading && (
                <p className="text-center text-sm text-zinc-400">
                  Waking things up, this may take a moment...
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
