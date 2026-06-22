import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { getGameMovies } from "../api/gameVideosApi";

const GamePage = () => {
  const { id } = useParams();
  const { games } = useOutletContext();

  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState(null);

  const game = games.find((game) => String(game.id) === String(id));

  useEffect(() => {
    if (!game?.rawg_id) return;

    const loadVideos = async () => {
      try {
        setVideosLoading(true);
        setVideosError(null);

        const gameVideos = await getGameMovies(game.rawg_id);

        console.log("Gameplay videos:", gameVideos);

        setVideos(gameVideos);
      } catch (error) {
        console.error("Error loading gameplay videos:", error);
        setVideosError("Could not load gameplay videos.");
      } finally {
        setVideosLoading(false);
      }
    };

    loadVideos();
  }, [game?.rawg_id]);

  if (!game) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">Game not found</h1>

        <Link
          to="/dashboard/backlog"
          className="mt-4 inline-block text-purple-300 hover:text-purple-200"
        >
          Back to backlog
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <img
          src={game.cover_image}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-100 blur-sm animate-slow-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl p-6">
        <Link
          to="/dashboard/backlog"
          className="mb-8 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/20 hover:text-white"
        >
          ← Back to backlog
        </Link>

        <section className="grid gap-8 md:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur">
            <img
              src={game.cover_image}
              alt={game.title}
              className="h-[480px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-end">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full border border-purple-400/30 bg-purple-500/20 px-4 py-1 text-sm font-medium text-purple-100">
                {game.status}
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-4 py-1 text-sm text-white/80">
                Playing on {game.selected_platform}
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              {game.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-sm text-white/70"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Rating" value={game.rating || "N/A"} />

              <StatCard
                label="Playtime"
                value={
                  game.average_playtime ? `${game.average_playtime}h` : "N/A"
                }
              />

              <StatCard label="Released" value={game.released || "N/A"} />
              <StatCard label="Status" value={game.status || "N/A"} />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">Notes</h2>

            <p className="mt-4 leading-7 text-white/70">
              {game.notes || "You have not added any notes for this game yet."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">Platforms</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {game.platforms?.map((platform) => (
                <span
                  key={platform}
                  className="rounded-xl bg-black/30 px-3 py-2 text-sm text-white/70"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        <GameplayVideos
          videos={videos}
          isLoading={videosLoading}
          error={videosError}
        />
      </div>
    </div>
  );
};

const GameplayVideos = ({ videos, isLoading, error }) => {
  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <div className="mb-5">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-200/70">
          Media
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">Gameplay Videos</h2>

        <p className="mt-2 text-sm text-white/60">
          Watch a quick preview before deciding if this game is next in the
          queue.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white/60">
          Loading gameplay videos...
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-100">
          {error}
        </div>
      )}

      {!isLoading && !error && videos.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white/60">
          No gameplay videos found for this game yet.
        </div>
      )}

      {!isLoading && !error && videos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-2xl border border-white/10 bg-black/30"
            >
              <div className="aspect-video bg-black">
                <video
                  controls
                  poster={video.preview}
                  className="h-full w-full object-cover"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-white">
                  {video.title || "Gameplay video"}
                </h3>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

const StatCard = ({ label, value }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
      <p className="text-sm text-white/50">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
};

export default GamePage;
