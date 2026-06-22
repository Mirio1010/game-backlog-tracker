const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

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
