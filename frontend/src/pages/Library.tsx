import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GameCard from "../components/GameCard";
import AsyncState from "../components/AsyncState";
import { useGames } from "../hooks/useGames";

export default function Library() {
  const { games, loading, error } = useGames();
  if (loading || error) {
    return <AsyncState loading={loading} error={error} />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Bibliothek
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Deine gekauften Spiele.
        </Typography>
      </Box>

      {games.length === 0 ? (
        <Typography color="text.secondary">
          Deine Bibliothek ist noch leer.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <GameCard game={game} actionLabel="Spielen" showPrice={false} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
