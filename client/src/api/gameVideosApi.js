const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getGameMovies = async (rawgId) => {
  if (!rawgId) return [];

  const response = await fetch(`${API_BASE_URL}/rawg/games/${rawgId}/videos`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch gameplay videos");
  }

  return data;
};

export const getGameScreenshots = async (rawgId) => {
  if (!rawgId) return [];

  const response = await fetch(
    `${API_BASE_URL}/rawg/games/${rawgId}/screenshots`,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch game screenshots");
  }

  return data;
};
