import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import { Gamepad2, ListChecks, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white">
      <Header />

      <main className="relative overflow-hidden">
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute right-0 top-96 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

        <section className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <p className="text-sm font-medium text-cyan-300">
            About Game Backlog Tracker
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            For people who keep saying, “I’ll play that eventually.”
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            Game Backlog Tracker is a simple app for keeping track of the games
            you want to play, the ones you are currently playing, and the ones
            you finally finished.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            The goal is not to make your backlog feel like homework. It is to
            make it easier to remember what you added, why you cared about it,
            and what might be worth playing next.
          </p>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-20">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">
              Why I built this
            </h2>

            <div className="mt-6 space-y-5 leading-8 text-zinc-300">
              <p>
                A lot of gamers have the same problem: too many games, too many
                libraries, and no clear system for deciding what to actually
                play.
              </p>

              <p>
                You add a game because it looks interesting, then weeks or
                months later you forget about it. Or you open your library and
                spend more time scrolling than playing.
              </p>

              <p>
                This app is meant to make that process cleaner. Add the game,
                give it a status, keep a few notes, and come back when you are
                ready.
              </p>
            </div>
          </div>
        </section>

        <section className="relative mx-auto grid max-w-5xl gap-6 px-6 pb-24 md:grid-cols-3">
          <AboutCard
            icon={<Gamepad2 />}
            title="Add games"
            description="Keep the games you want to play in one place instead of relying on memory."
          />

          <AboutCard
            icon={<ListChecks />}
            title="Track status"
            description="Separate what you are playing, what is finished, and what is still waiting."
          />

          <AboutCard
            icon={<Clock />}
            title="Pick smarter"
            description="Use details like playtime, platform, and notes to decide what fits your mood."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const AboutCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-cyan-400/30 hover:bg-white/10">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">
        {icon}
      </div>

      <h3 className="mt-5 text-lg font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-zinc-400">{description}</p>
    </div>
  );
};

export default About;
