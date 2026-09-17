const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchUserSteamGames = async (vanityName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/steam/library`, {
      params: {
        vanityName: vanityName,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user library",
    );
  }
};

// This function sends the user's selected games to the backend for the
// enrichment process.
export const enrichSteamGameData = async (data) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/steam/enrich-games`,
      data,
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to enrich item");
  }
};