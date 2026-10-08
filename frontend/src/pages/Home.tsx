import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import GameCard from "../components/GameCard";
import AsyncState from "../components/AsyncState";
import { useGames } from "../hooks/useGames";

export default function Home() {
  const { games, loading, error } = useGames();
  const navigate = useNavigate();
  if (loading || error) {
    return <AsyncState loading={loading} error={error} />;
  }

  const featuredGame = games.length > 0 ? games[0] : null;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          mb: 6,
          minHeight: { xs: 280, md: 340 },
          display: "flex",
          alignItems: "flex-end",
          backgroundImage:
            "linear-gradient(135deg, rgba(124,92,255,0.25), rgba(34,211,238,0.15))",
          backgroundColor: "background.paper",
        }}
      >
        <Box sx={{ p: { xs: 3, md: 5 }, maxWidth: 560 }}>
          {featuredGame ? (
            <>
              <Chip
                label={featuredGame.category}
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: "secondary.main",
                  color: "#0b0c10",
                  fontWeight: 700,
                }}
              />
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
                {featuredGame.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Ab {featuredGame.price.toFixed(2)} € · {featuredGame.stock} auf
                Lager
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1.5 }}>
                Willkommen bei ArcadeX
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Dein Launcher für neue Abenteuer. Schau im Store vorbei, sobald
                neue Spiele verfügbar sind.
              </Typography>
            </>
          )}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/shop"
            >
              Im Store ansehen
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/library"
            >
              Zur Bibliothek
            </Button>
          </Stack>
        </Box>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Entdecke unsere Spiele
      </Typography>
      {games.length === 0 ? (
        <Typography color="text.secondary">
          Aktuell sind keine Spiele verfügbar.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {games.map((game) => (
            <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <GameCard game={game} onAction={() => navigate("/shop")} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
