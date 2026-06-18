import Footer from "../components/home/Footer.jsx";
import Header from "../components/home/Header.jsx";
import {
  Gamepad2,
  ListChecks,
  Search,
  BarChart3,
  Clock,
  Sparkles,
} from "lucide-react";
const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-slate-900 to-black text-white">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-20">
        <section className="text-center">
          <span className="inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
            Built for gamers with growing backlogs
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight md:text-6xl">
            Keep track of the games you actually want to play.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Backlog Tracker helps you organize your unfinished games, track your
            progress, and decide what to play next without losing games in your
            library.
          </p>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Gamepad2 />}
            title="Build your game backlog"
            description="Add games you want to play later and keep them organized in one clean place."
          />

          <FeatureCard
            icon={<ListChecks />}
            title="Track game status"
            description="Mark games as backlog, playing, completed, or dropped so you always know where you stand."
          />

          <FeatureCard
            icon={<Search />}
            title="Discover game details"
            description="View useful details like platforms, genres, ratings, release dates, and average playtime."
          />

          <FeatureCard
            icon={<Clock />}
            title="Plan around playtime"
            description="See average playtime so you can pick a short game, a long RPG, or something in between."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Understand your progress"
            description="Get a clearer picture of your gaming habits and how your backlog is changing over time."
          />

          <FeatureCard
            icon={<Sparkles />}
            title="Immersive game pages"
            description="Open each game in a detailed page with cover art, notes, genres, and a cinematic layout."
          />
        </section>

        <section className="mt-24 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">
                Your backlog should feel exciting, not overwhelming.
              </h2>

              <p className="mt-5 leading-7 text-white/70">
                Instead of scrolling through a messy library and forgetting what
                you wanted to play, Backlog Tracker gives every game a place, a
                status, and a reason to come back to it.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
              <div className="space-y-4">
                <PreviewRow title="Persona 5" status="Backlog" />
                <PreviewRow title="Elden Ring" status="Playing" />
                <PreviewRow title="God of War" status="Completed" />
                <PreviewRow title="Hollow Knight" status="Backlog" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-200">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-white/60">{description}</p>
    </div>
  );
};

const PreviewRow = ({ title, status }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="font-medium">{title}</span>

      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-200">
        {status}
      </span>
    </div>
  );
};

export default Features;
