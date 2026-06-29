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
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background text-foreground">
      <Header />

      <main className="relative overflow-hidden">
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute right-0 top-96 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

        <section className="relative mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
         

          <h1 className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
            Everything you need to organize your games and{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              decide what to play next
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Game Backlog Tracker helps you manage your collection, track your
            progress, and keep your backlog from turning into a pile of games
            you forgot about.
          </p>
        </section>

        <section className="relative mx-auto grid max-w-6xl gap-4 px-4 pb-16 sm:gap-6 sm:px-6 sm:pb-20 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Gamepad2 />}
            title="Build your backlog"
            description="Add games you want to play later and keep them organized in one clean dashboard."
          />

          <FeatureCard
            icon={<ListChecks />}
            title="Track every status"
            description="Mark games as backlog, playing, completed, or dropped so your collection always stays clear."
          />

          <FeatureCard
            icon={<Search />}
            title="View game details"
            description="See useful information like platforms, genres, ratings, release dates, and average playtime."
          />

          <FeatureCard
            icon={<Clock />}
            title="Pick based on time"
            description="Use average playtime to decide whether you want a short game, a long RPG, or something in between."
          />

          <FeatureCard
            icon={<BarChart3 />}
            title="Understand progress"
            description="Get a better picture of what you are playing, what you finished, and what is still waiting."
          />

          <FeatureCard
            icon={<Sparkles />}
            title="Immersive game pages"
            description="Open each game in a detailed cinematic page with cover art, stats, notes, platforms, and genres."
          />
        </section>

        <section className="relative mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div>
                <span className="text-sm font-medium text-cyan-300">
                  Why it matters
                </span>

                <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl">
                  Your backlog should feel exciting, not overwhelming.
                </h2>

                <p className="mt-5 leading-8 text-muted">
                  Instead of scrolling through a messy game library and
                  forgetting what you wanted to play, Backlog Tracker gives each
                  game a status, details, and a reason to come back to it.
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-surface p-5">
                <div className="space-y-4">
                  <PreviewRow title="Persona 5" status="Backlog" />
                  <PreviewRow title="Elden Ring" status="Playing" />
                  <PreviewRow title="God of War" status="Completed" />
                  <PreviewRow title="Hollow Knight" status="Backlog" />
                </div>
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
  <div className="group rounded-3xl border border-border bg-card p-5 shadow-xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10 sm:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition group-hover:bg-cyan-500/20">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-bold">{title}</h3>

      <p className="mt-3 leading-7 text-muted">{description}</p>
    </div>
  );
};

const PreviewRow = ({ title, status }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="font-medium text-foreground">{title}</span>

      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
        {status}
      </span>
    </div>
  );
};

export default Features;
