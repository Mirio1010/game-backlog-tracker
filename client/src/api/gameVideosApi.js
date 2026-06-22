const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getGameMovies = async (rawgId) => {
  if (!rawgId) return [];

  const response = await fetch(
    `${API_BASE_URL}/api/rawg/games/${rawgId}/videos`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch gameplay videos");
  }

  return response.json();
};

export const getGameScreenshots = async (rawgId) => {
  if (!rawgId) return [];

  const response = await fetch(
    `${API_BASE_URL}/api/rawg/games/${rawgId}/screenshots`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch game screenshots");
  }

  return response.json();
};
