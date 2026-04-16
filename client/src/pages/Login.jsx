import React from "react";
import MainLayout from "../components/layout/MainLayout";
import Header from "../components/home/Header";
const Login = () => {
  return (
    <MainLayout>
      <Header></Header>
      <Form></Form>
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
  return (
    <main>
      <section className="grid min-h-screen grid-cols-1 overflow-hidden border border-white/10 bg-white/5 shadow-2xl backdrop-blur md:grid-cols-2">
        <LeftPanel/>
        
        <div className="flex items-center justify-center bg-black/20 p-10 md:p-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/70 p-8 shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-white">Log In</h2>

            <form action="/server-endpoint" className="space-y-5">
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
                  className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99]"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
