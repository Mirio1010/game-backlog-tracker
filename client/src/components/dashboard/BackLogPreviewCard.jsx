const games = [
  {
    id: 1,
    title: "Elden Ring",
    platform: "PS5",
    status: "Playing",
    hoursPlayed: 25,
    rating: 9,
  },
  {
    id: 2,
    title: "Hollow Knight",
    platform: "Switch",
    status: "Completed",
    hoursPlayed: 40,
    rating: 10,
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    platform: "PC",
    status: "Backlog",
    hoursPlayed: 0,
    rating: null,
  },
];

const BackLogPreviewCard = () => {
  const totalGames = games.length;

  const playingGames = games.filter((game) => game.status === "Playing").length;

  const completedGames = games.filter(
    (game) => game.status === "Completed",
  ).length;

  const totalHours = games.reduce((sum, game) => sum + game.hoursPlayed, 0);

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Backlog Preview</h2>
        <p className="text-sm text-white/50">
          A quick look at the games currently in your tracker.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {games.map((game) => (
          <div
            key={game.id}
            className="rounded-xl border border-white/10 bg-black/20 p-4"
          >
            <h3 className="font-semibold">{game.title}</h3>
            <p className="text-sm text-white/50">{game.platform}</p>
            <p className="mt-3 text-sm">{game.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BackLogPreviewCard;
