import { useEffect, useState } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { getGameMovies, getGameScreenshots } from "../api/gameVideosApi";

const GamePage = () => {
  const { id } = useParams();
  const { games } = useOutletContext();

  const [videos, setVideos] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState(null);

  const game = games.find((game) => String(game.id) === String(id));

  useEffect(() => {
    if (!game?.rawg_id) return;

    const loadMedia = async () => {
      try {
        setMediaLoading(true);
        setMediaError(null);

        const [gameVideos, gameScreenshots] = await Promise.all([
          getGameMovies(game.rawg_id),
          getGameScreenshots(game.rawg_id),
        ]);

        console.log("Gameplay videos:", gameVideos);
        console.log("Game screenshots:", gameScreenshots);

        setVideos(gameVideos);
        setScreenshots(gameScreenshots);
      } catch (error) {
        console.error("Error loading game media:", error);
        setMediaError("Could not load game preview media.");
      } finally {
        setMediaLoading(false);
      }
    };

    loadMedia();
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

        <GamePreview
          gameTitle={game.title}
          coverImage={game.cover_image}
          videos={videos}
          screenshots={screenshots}
          isLoading={mediaLoading}
          error={mediaError}
        />
      </div>
    </div>
  );
};

const GamePreview = ({
  gameTitle,
  coverImage,
  videos,
  screenshots,
  isLoading,
  error,
}) => {
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(null);

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${gameTitle} gameplay`,
  )}`;

  const selectedScreenshot =
    selectedScreenshotIndex !== null
      ? screenshots[selectedScreenshotIndex]
      : null;

  const hasVideos = videos.length > 0;
  const hasScreenshots = screenshots.length > 0;

  const openScreenshot = (index) => {
    setSelectedScreenshotIndex(index);
  };

  const closeScreenshot = () => {
    setSelectedScreenshotIndex(null);
  };

  const showPreviousScreenshot = () => {
    setSelectedScreenshotIndex((currentIndex) => {
      if (currentIndex === 0) {
        return screenshots.length - 1;
      }

      return currentIndex - 1;
    });
  };

  const showNextScreenshot = () => {
    setSelectedScreenshotIndex((currentIndex) => {
      if (currentIndex === screenshots.length - 1) {
        return 0;
      }

      return currentIndex + 1;
    });
  };

  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple-200/70">
            Media
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">Game Preview</h2>

          <p className="mt-2 text-sm text-white/60">
            Preview the game before deciding if it belongs at the top of your
            backlog.
          </p>
        </div>

        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit rounded-full border border-purple-400/30 bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-500/30 hover:text-white"
        >
          Search gameplay on YouTube
        </a>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white/60">
          Loading game preview...
        </div>
      )}

      {!isLoading && error && (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-sm text-red-100">
          {error}
        </div>
      )}

      {!isLoading && !error && hasVideos && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Gameplay Videos
            </h3>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-100">
              Found on RAWG
            </span>
          </div>

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
        </div>
      )}

      {!isLoading && !error && !hasVideos && hasScreenshots && (
        <div>
          <div className="mb-4 rounded-2xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-lg font-semibold text-white">Screenshots</h3>

            <p className="mt-2 text-sm leading-6 text-white/60">
              No gameplay videos were found for this game, so here are
              screenshots from RAWG instead.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {screenshots.slice(0, 4).map((screenshot, index) => (
              <button
                key={screenshot.id}
                type="button"
                onClick={() => openScreenshot(index)}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-black/30 text-left"
              >
                <img
                  src={screenshot.image}
                  alt={`${gameTitle} screenshot ${index + 1}`}
                  className="aspect-video h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-80"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {!isLoading && !error && !hasVideos && !hasScreenshots && (
        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
          <h3 className="text-lg font-semibold text-white">No preview found</h3>

          <p className="mt-2 text-sm leading-6 text-white/60">
            No videos or screenshots were found for this game yet.
          </p>

          {coverImage && (
            <img
              src={coverImage}
              alt={`${gameTitle} cover`}
              className="mt-4 aspect-video w-full rounded-2xl object-cover opacity-80"
            />
          )}
        </div>
      )}

      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
          <button
            type="button"
            onClick={closeScreenshot}
            className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            Close
          </button>

          {screenshots.length > 1 && (
            <button
              type="button"
              onClick={showPreviousScreenshot}
              className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-2xl font-bold text-white backdrop-blur transition hover:bg-white/20"
              aria-label="Previous screenshot"
            >
              ←
            </button>
          )}

          <div className="max-h-[90vh] max-w-6xl">
            <img
              src={selectedScreenshot.image}
              alt={`${gameTitle} screenshot enlarged`}
              className="max-h-[90vh] w-full rounded-2xl object-contain shadow-2xl"
            />

            <p className="mt-4 text-center text-sm text-white/50">
              {selectedScreenshotIndex + 1} / {screenshots.length}
            </p>
          </div>

          {screenshots.length > 1 && (
            <button
              type="button"
              onClick={showNextScreenshot}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-2xl font-bold text-white backdrop-blur transition hover:bg-white/20"
              aria-label="Next screenshot"
            >
              →
            </button>
          )}
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
