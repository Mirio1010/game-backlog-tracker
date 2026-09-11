const enrichData = async (title, steamAppId) => {
  const url =
    `https://api.rawg.io/api/games` +
    `?key=${process.env.RAWG_API_KEY}` +
    `&search=${encodeURIComponent(title)}` +
    `&page_size=1`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG request failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.results?.length) {
    throw new Error(`No RAWG match found for "${title}"`);
  }

  const rawgGame = data.results[0];

  return {
    steamAppId,
    rawgId: rawgGame.id,
    title: rawgGame.name,
    coverImage: rawgGame.background_image,
    coverAlt: `${rawgGame.name} cover art`,
    released: rawgGame.released,
    rawgRating: rawgGame.rating,
    rawgPlaytime: rawgGame.playtime,
    genres: rawgGame.genres?.map((genre) => genre.name) ?? [],
    platforms:
      rawgGame.platforms?.map((platformData) => platformData.platform.name) ??
      [],
    status: "Backlog",
    notes: "",
    selected_platform: "steam",
    average_playtime: rawgGame.average_playtime ?? 0,
  };
};

module.exports = {
  enrichData,
};
