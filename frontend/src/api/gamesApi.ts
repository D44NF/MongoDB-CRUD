import type { Game } from "../types/Game";

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000";

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE_URL}/get_all_games`);
  if (!response.ok) {
    throw new Error(`Spiele konnten nicht geladen werden (${response.status})`);
  }
  return response.json();
}

export async function createGame(game: Game): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/create_games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
  if (!response.ok) {
    throw new Error(`Spiel konnte nicht erstellt werden (${response.status})`);
  }
  return response.json();
}
