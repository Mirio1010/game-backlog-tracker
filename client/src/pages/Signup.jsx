import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="flex items-center justify-center bg-gradient-to-br from-indigo-600/20 via-cyan-500/10 to-transparent p-6 sm:p-10 md:p-16">
      <div className="max-w-md space-y-4 sm:space-y-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
          GameBacklog
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Create an account
        </h1>

        <p className="text-base leading-7 text-muted">
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

    const res = await fetch(`${API_URL}/api/auth/register`, {
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
      setError(data.message || "Something went wrong. Please try again.");
      return;
    }

    console.log("Success:", data);
    navigate("/login", {
      state: {
        message: "Account created successfully. Please log in.",
      },
    });
  };

  return (
    <main>
      <section className="grid min-h-[calc(100vh-105px)] grid-cols-1 overflow-hidden border border-border bg-card shadow-2xl backdrop-blur md:min-h-screen md:grid-cols-2">
        <LeftPanel />

        <div className="flex items-center justify-center bg-surface p-4 sm:p-10 md:p-16">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface/80 p-5 shadow-xl sm:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">
              Sign Up
            </h2>

            <form
              autoComplete="off"
              className="space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-muted"
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
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-muted"
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
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-muted"
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
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-muted"
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
                  className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <LoginRedirect/>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:bg-cyan-300 active:scale-[0.99]"
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


const LoginRedirect = () => {
  return (
    <p className="text-center text-sm text-muted">
      Have have an account?{" "}
      <Link
        to="/login"
        className="font-medium text-primary transition hover:text-primary/70"
      >
        Log In
      </Link>
    </p>
  );
};

export default Signup;
