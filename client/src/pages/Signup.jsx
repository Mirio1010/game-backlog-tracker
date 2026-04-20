import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/home/Header";

const Signup = () => {
  return (
    <MainLayout>
      <Header></Header>
      <Form />
    </MainLayout>
  );
};

const LeftPanel = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-600/20 via-cyan-500/10 to-transparent p-10 md:p-16">
      <div className="max-w-md space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
          GameBacklog
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          Create an account
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
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    const res = await fetch("http://localhost:5001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.log("Backend error:", data.message);
      return;
    }

    console.log("Success:", data);
  };

  return (
    <main>
      <section className="grid min-h-screen grid-cols-1 overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur md:grid-cols-2">
        <LeftPanel />

        <div className="flex items-center justify-center bg-black/20 p-10 md:p-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-white">Sign Up</h2>

            <form
              autoComplete="off"
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-zinc-200"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />
              </div>

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
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
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
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-zinc-200"
                >
                  Confirm Password
                </label>
                {error && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                )}
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99]"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
