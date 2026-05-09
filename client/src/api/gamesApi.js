const API_BASE_URL = "http://localhost:5001/api";

export const fetchMyGames = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(`${API_BASE_URL}/games`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch games.");
  }

  return data.games;
};

export const saveGame = async (game) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found. Please log in again.");
  }

  const response = await fetch(`${API_BASE_URL}/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(game),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save game.");
  }

  return data.game;
};
