const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const getGameMovies = async (rawgId) => {
  try {
    if (!rawgId) return [];

    const response = await axios.get(
      `${API_BASE_URL}/rawg/games/${rawgId}/videos`,
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch gameplay videos",
    );
  }
};



export const getGameScreenshots = async (rawgId) => {
  try {
    if (!rawgId) return [];

    const response = await axios.get(
      `${API_BASE_URL}/rawg/games/${rawgId}/screenshots`,
    );

    return response.data;
  } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch screenshots",
      );
  }


};

