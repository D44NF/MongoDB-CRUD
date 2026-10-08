import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import type { Game } from "../types/Game";

interface GameCardProps {
  game: Game;
  actionLabel?: string;
  showPrice?: boolean;
  disabled?: boolean;
  onAction?: () => void;
}

export default function GameCard({
  game,
  actionLabel = "Ansehen",
  showPrice = true,
  disabled,
  onAction,
}: GameCardProps) {
  const outOfStock = game.stock <= 0;
  const isDisabled = disabled ?? outOfStock;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: "2 / 3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "action.hover",
        }}
      >
        <SportsEsportsIcon sx={{ fontSize: 64, color: "text.disabled" }} />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
          {game.name}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ mt: 0.5, alignItems: "center" }}
        >
          <Chip
            label={game.category}
            size="small"
            sx={{ bgcolor: "action.selected" }}
          />
          <Typography
            variant="body2"
            color={outOfStock ? "error" : "text.secondary"}
          >
            {outOfStock ? "Ausverkauft" : `${game.stock} auf Lager`}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: showPrice ? "space-between" : "flex-end",
          px: 2,
          pb: 2,
        }}
      >
        {showPrice && (
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {game.price.toFixed(2)} €
          </Typography>
        )}
        <Button
          variant="contained"
          size="small"
          disabled={isDisabled}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      </CardActions>
    </Card>
  );
}
