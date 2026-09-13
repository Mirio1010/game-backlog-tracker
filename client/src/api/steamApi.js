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


// This function sends the user's selected games to the backend for the 
// enrichment process.
export const enrichSteamGameData = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  const res = await fetch(`${API_BASE_URL}/steam/enrich-games`, options);

  if (!res.ok) {
    throw new Error(`Failed to enrich item: ${res.status}`);
  }

  return res.json();
};