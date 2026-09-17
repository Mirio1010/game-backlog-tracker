const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getGameMovies = async (rawgId) => {
  try {
    if (!rawgId) return [];

    const response = await axios.get(
      `${API_BASE_URL}/rawg/games/${rawgId}/screenshots`,
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch game screenshots",
    );
  }
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

