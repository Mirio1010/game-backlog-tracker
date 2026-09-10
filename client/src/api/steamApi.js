const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchUserSteamGames = async (vanityName) => {
  const res = await fetch(
    `${API_BASE_URL}/steam/library?vanityName=${encodeURIComponent(vanityName)}`,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch user library");
  }

  return data;
};
