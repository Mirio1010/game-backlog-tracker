export const totalGames = mockGames.length;

export const playingGames = mockGames.filter(
  (game) => game.status === "Playing",
).length;

export const completedGames = mockGames.filter(
  (game) => game.status === "Completed",
).length;

export const backlogGames = mockGames.filter(
  (game) => game.status === "Backlog",
).length;

export const totalHoursPlayed = mockGames.reduce(
  (sum, game) => sum + game.hoursPlayed,
  0,
);

