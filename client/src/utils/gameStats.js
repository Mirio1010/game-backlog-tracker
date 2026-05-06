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