const getPlaytime = (game) => {
  return (
    game.average_playtime ??
    game.howLongToBeat ??
    game.rawgPlaytime ??
    game.playtime ??
    0
  );
};

const getPlatform = (game) => {
  return game.selected_platform || game.platform || "Unknown";
};

const getGenreNames = (game) => {
  if (Array.isArray(game.genres)) {
    return game.genres.length > 0 ? game.genres : ["Unknown"];
  }

  if (game.genre) {
    return [game.genre];
  }

  return ["Unknown"];
};

export const getGameStats = (games = []) => {
  const totalGames = games.length;

  const playingGames = games.filter((game) => game.status === "Playing").length;

  const completedGames = games.filter(
    (game) => game.status === "Completed",
  ).length;

  const backlogGames = games.filter((game) => game.status === "Backlog").length;

  const completedAveragePlaytime = games.reduce((sum, game) => {
    return game.status === "Completed" ? sum + getPlaytime(game) : sum;
  }, 0);

  const completionRate =
    totalGames === 0 ? 0 : Math.round((completedGames / totalGames) * 100);

  return {
    totalGames,
    playingGames,
    completedGames,
    backlogGames,

    // Keep this name if your components already expect it.
    completedHoursPlayed: completedAveragePlaytime,

    completionRate,
  };
};

export const getGamesByPlatform = (games = []) => {
  const platformCounts = games.reduce((acc, game) => {
    const platform = getPlatform(game);

    acc[platform] = (acc[platform] || 0) + 1;

    return acc;
  }, {});

  return Object.entries(platformCounts).map(([platform, count]) => ({
    platform,
    count,
  }));
};

export const getBacklogTimeStats = (games = []) => {
  const backlogGames = games.filter((game) => {
    return game.status === "Backlog" && getPlaytime(game) > 0;
  });

  const totalBacklogHours = backlogGames.reduce((sum, game) => {
    return sum + getPlaytime(game);
  }, 0);

  const averageBacklogHours =
    backlogGames.length === 0
      ? 0
      : Math.round(totalBacklogHours / backlogGames.length);

  const longestBacklogGame =
    backlogGames.length === 0
      ? null
      : backlogGames.reduce((longest, game) => {
          return getPlaytime(game) > getPlaytime(longest) ? game : longest;
        }, backlogGames[0]);

  const shortestBacklogGame =
    backlogGames.length === 0
      ? null
      : backlogGames.reduce((shortest, game) => {
          return getPlaytime(game) < getPlaytime(shortest) ? game : shortest;
        }, backlogGames[0]);

  return {
    totalBacklogHours,
    averageBacklogHours,
    longestBacklogGame,
    shortestBacklogGame,
  };
};

export const getGamesByGenre = (games = []) => {
  const genreCounts = games.reduce((acc, game) => {
    const genres = getGenreNames(game);

    genres.forEach((genre) => {
      acc[genre] = (acc[genre] || 0) + 1;
    });

    return acc;
  }, {});

  return Object.entries(genreCounts).map(([genre, count]) => ({
    genre,
    count,
  }));
};
