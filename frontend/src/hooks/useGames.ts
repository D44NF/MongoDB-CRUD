import { useCallback, useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { fetchGames } from "../api/gamesApi";

interface UseGamesResult {
  games: Game[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGames(): UseGamesResult {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGames();
      setGames(data);
    } catch {
      setError("Spiele konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { games, loading, error, refetch };
}
