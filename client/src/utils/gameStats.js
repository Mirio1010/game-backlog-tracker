export const getGameStats = (games) => {
  const totalGames = games.length;

  const playingGames = games.filter((game) => game.status === "Playing").length;

  const completedGames = games.filter(
    (game) => game.status === "Completed",
  ).length;

  const backlogGames = games.filter((game) => game.status === "Backlog").length;

  const completedHoursPlayed = games.reduce((sum, game) => {
    return game.status === "Completed" ? sum + game.hoursPlayed : sum;
  }, 0);

  const completionRate =
    totalGames === 0 ? 0 : Math.round((completedGames / totalGames) * 100);

  return {
    totalGames,
    playingGames,
    completedGames,
    backlogGames,
    completedHoursPlayed,
    completionRate,
  };
};

export const getGamesByPlatform = (games = []) => {
  const platformCounts = games.reduce((acc, game) => {
    const platform = game.platform || "Unknown";

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
    return game.status === "Backlog" && typeof game.howLongToBeat === "number";
  });

  const totalBacklogHours = backlogGames.reduce((sum, game) => {
    return sum + game.howLongToBeat;
  }, 0);

  const averageBacklogHours =
    backlogGames.length === 0
      ? 0
      : Math.round(totalBacklogHours / backlogGames.length);

  const longestBacklogGame =
    backlogGames.length === 0
      ? null
      : backlogGames.reduce((longest, game) => {
          return game.howLongToBeat > longest.howLongToBeat ? game : longest;
        }, backlogGames[0]);

  const shortestBacklogGame =
    backlogGames.length === 0
      ? null
      : backlogGames.reduce((shortest, game) => {
          return game.howLongToBeat < shortest.howLongToBeat ? game : shortest;
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
    const genre = game.genre || "Unknown";

    acc[genre] = (acc[genre] || 0) + 1;

    return acc;
  }, {});

  return Object.entries(genreCounts).map(([genre, count]) => ({
    genre,
    count,
  }));
};