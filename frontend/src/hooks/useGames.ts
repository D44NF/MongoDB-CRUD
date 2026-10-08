import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { fetchGames } from "../api/gamesApi";

interface UseGamesResult {
  games: Game[];
  loading: boolean;
  error: string | null;
}

export function useGames(): UseGamesResult {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchGames()
      .then((data) => {
        if (!cancelled) setGames(data);
      })
      .catch(() => {
        if (!cancelled) setError("Spiele konnten nicht geladen werden.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { games, loading, error };
}
