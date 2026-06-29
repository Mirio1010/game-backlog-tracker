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
      <div className="p-6 text-foreground">
        <h1 className="text-2xl font-bold">Game not found</h1>

        <Link
          to="/dashboard/backlog"
          className="mt-4 inline-block text-primary hover:text-accent"
        >
          Back to backlog
        </Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <div className="absolute inset-0 overflow-hidden md:rounded-[2rem]">
        <img
          src={game.cover_image}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-100 blur-sm animate-slow-pan"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl p-4 sm:p-6">
        <Link
          to="/dashboard/backlog"
          className="mb-6 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm text-muted backdrop-blur transition hover:bg-white/20 hover:text-foreground sm:mb-8"
        >
          ← Back to backlog
        </Link>

        <section className="grid gap-8 md:grid-cols-[320px_1fr]">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl backdrop-blur">
            <img
              src={game.cover_image}
              alt={game.title}
              className="h-80 w-full object-cover sm:h-[420px] md:h-[480px]"
            />
          </div>

          <div className="flex flex-col justify-end">
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-full border border-primary/30 bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
                {game.status}
              </span>

              <span className="rounded-full border border-border bg-card px-4 py-1 text-sm text-muted">
                Playing on {game.selected_platform}
              </span>
            </div>

            <h1 className="break-words text-4xl font-black tracking-tight sm:text-5xl md:text-7xl">
              {game.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {game.genres?.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
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

        <section className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 rounded-3xl border border-border bg-card p-4 backdrop-blur sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">Notes</h2>

            <p className="mt-4 leading-7 text-muted">
              {game.notes || "You have not added any notes for this game yet."}
            </p>
          </div>

          <div className="min-w-0 rounded-3xl border border-border bg-card p-4 backdrop-blur sm:p-6">
            <h2 className="text-xl font-bold sm:text-2xl">Platforms</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {game.platforms?.map((platform) => (
                <span
                  key={platform}
                  className="rounded-xl bg-surface px-3 py-2 text-sm text-muted"
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
    <section className="mt-8 rounded-3xl border border-border bg-card p-4 backdrop-blur sm:mt-10 sm:p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Media
          </p>

          <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
            Game Preview
          </h2>

          <p className="mt-2 text-sm text-muted">
            Preview the game before deciding if it belongs at the top of your
            backlog.
          </p>
        </div>

        <a
          href={youtubeSearchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full justify-center rounded-full border border-primary/30 bg-primary/20 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/30 hover:text-foreground sm:w-fit"
        >
          Search gameplay on YouTube
        </a>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-border bg-surface p-5 text-sm text-muted">
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
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-white">
              Gameplay Videos
            </h3>

            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Found on RAWG
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {videos.map((video) => (
              <article
                key={video.id}
                className="overflow-hidden rounded-2xl border border-border bg-surface"
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
                  <h3 className="font-semibold text-foreground">
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
          <div className="mb-4 rounded-2xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">
              Screenshots
            </h3>

            <p className="mt-2 text-sm leading-6 text-muted">
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
                className="group overflow-hidden rounded-2xl border border-border bg-surface text-left"
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
        <div className="rounded-2xl border border-border bg-surface p-5">
          <h3 className="text-lg font-semibold text-foreground">
            No preview found
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 sm:p-6">
          <button
            type="button"
            onClick={closeScreenshot}
            className="absolute right-3 top-3 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-white/20 sm:right-5 sm:top-5"
          >
            Close
          </button>

          {screenshots.length > 1 && (
            <button
              type="button"
              onClick={showPreviousScreenshot}
              className="absolute bottom-5 left-4 rounded-full border border-border bg-card px-4 py-3 text-xl font-bold text-foreground backdrop-blur transition hover:bg-white/20 sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-y-1/2 sm:text-2xl"
              aria-label="Previous screenshot"
            >
              ←
            </button>
          )}

          <div className="max-h-[82vh] max-w-6xl sm:max-h-[90vh]">
            <img
              src={selectedScreenshot.image}
              alt={`${gameTitle} screenshot enlarged`}
              className="max-h-[78vh] w-full rounded-2xl object-contain shadow-2xl sm:max-h-[90vh]"
            />

            <p className="mt-4 text-center text-sm text-muted">
              {selectedScreenshotIndex + 1} / {screenshots.length}
            </p>
          </div>

          {screenshots.length > 1 && (
            <button
              type="button"
              onClick={showNextScreenshot}
              className="absolute bottom-5 right-4 rounded-full border border-border bg-card px-4 py-3 text-xl font-bold text-foreground backdrop-blur transition hover:bg-white/20 sm:bottom-auto sm:right-5 sm:top-1/2 sm:-translate-y-1/2 sm:text-2xl"
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
    <div className="min-w-0 rounded-2xl border border-border bg-surface p-4 backdrop-blur">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 break-words text-lg font-bold text-foreground sm:text-xl">
        {value}
      </p>
    </div>
  );
};

export default GamePage;
