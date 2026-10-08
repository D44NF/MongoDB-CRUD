import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import GameCard from "../components/GameCard";
import AsyncState from "../components/AsyncState";
import { useGames } from "../hooks/useGames";
import { buyGame } from "../api/gamesApi";

type SortOption = "relevanz" | "preis-asc" | "preis-desc" | "lager-desc";

const CATEGORY_ALL = "Alle";

export default function Shop() {
  const { games, loading, error, refetch } = useGames();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(CATEGORY_ALL);
  const [sortBy, setSortBy] = useState<SortOption>("relevanz");
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [buyError, setBuyError] = useState<string | null>(null);

  const handleBuy = async (gameId: string) => {
    setBuyError(null);
    setBuyingId(gameId);
    try {
      await buyGame(gameId);
      await refetch();
    } catch {
      setBuyError("Kauf fehlgeschlagen.");
    } finally {
      setBuyingId(null);
    }
  };

  const categories = useMemo(
    () => [CATEGORY_ALL, ...new Set(games.map((game) => game.category))],
    [games],
  );

  const visibleGames = useMemo(() => {
    const filtered = games.filter((game) => {
      const matchesSearch = game.name
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());
      const matchesCategory =
        categoryFilter === CATEGORY_ALL || game.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "preis-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "preis-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "lager-desc":
        return [...filtered].sort((a, b) => b.stock - a.stock);
      default:
        return filtered;
    }
  }, [games, searchQuery, categoryFilter, sortBy]);

  if (loading || error) {
    return <AsyncState loading={loading} error={error} />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Store
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Entdecke neue Spiele für deine Bibliothek.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <TextField
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Spiele durchsuchen..."
          size="small"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="category-filter-label">Kategorie</InputLabel>
          <Select
            labelId="category-filter-label"
            label="Kategorie"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="sort-by-label">Sortierung</InputLabel>
          <Select
            labelId="sort-by-label"
            label="Sortierung"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortOption)}
          >
            <MenuItem value="relevanz">Relevanz</MenuItem>
            <MenuItem value="preis-asc">Preis aufsteigend</MenuItem>
            <MenuItem value="preis-desc">Preis absteigend</MenuItem>
            <MenuItem value="lager-desc">Lagerbestand</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {buyError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {buyError}
        </Alert>
      )}

      {visibleGames.length === 0 ? (
        <Typography color="text.secondary">Keine Spiele gefunden.</Typography>
      ) : (
        <Grid container spacing={3}>
          {visibleGames.map((game) => (
            <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <GameCard
                game={game}
                actionLabel={
                  game.owned
                    ? "Im Besitz"
                    : game.stock <= 0
                      ? "Ausverkauft"
                      : buyingId === game.id
                        ? "Wird gekauft..."
                        : "Kaufen"
                }
                disabled={
                  game.owned || game.stock <= 0 || buyingId === game.id
                }
                onAction={() => handleBuy(game.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
