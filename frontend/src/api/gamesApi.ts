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

export async function buyGame(gameId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/buy_games/${gameId}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Kauf fehlgeschlagen (${response.status})`);
  }
}

export type GameUpdateInput = Omit<Game, "id" | "owned">;

export async function updateGame(
  gameId: string,
  game: GameUpdateInput,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/update_games/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  });
  if (!response.ok) {
    throw new Error(`Spiel konnte nicht aktualisiert werden (${response.status})`);
  }
}

export async function deleteGame(gameId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/delete_games/${gameId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Spiel konnte nicht gelöscht werden (${response.status})`);
  }
}
