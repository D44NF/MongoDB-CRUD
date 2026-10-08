import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import type { Game } from "../types/Game";
import { createGame, updateGame, deleteGame } from "../api/gamesApi";
import { useGames } from "../hooks/useGames";
import AsyncState from "../components/AsyncState";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "",
  stock: "",
  imageUrl: "",
};

export default function Settings() {
  const { games, loading, error: loadError, refetch } = useGames();
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Game | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  const handleEditClick = (game: Game) => {
    setEditingId(game.id);
    setForm({
      name: game.name,
      category: game.category,
      price: String(game.price),
      stock: String(game.stock),
      imageUrl: game.imageUrl ?? "",
    });
    setFormError(null);
    setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim() || !form.category.trim()) {
      setFormError("Name und Kategorie dürfen nicht leer sein.");
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setFormError("Preis muss eine gültige, nicht-negative Zahl sein.");
      return;
    }
    if (Number.isNaN(stock) || stock < 0) {
      setFormError("Lagerbestand muss eine gültige, nicht-negative Zahl sein.");
      return;
    }

    const imageUrl = form.imageUrl.trim() || null;

    setSubmitting(true);
    try {
      if (editingId) {
        await updateGame(editingId, {
          name: form.name.trim(),
          category: form.category.trim(),
          price,
          stock,
          imageUrl,
        });
        setSuccess("Spiel wurde aktualisiert.");
      } else {
        await createGame({
          id: crypto.randomUUID(),
          name: form.name.trim(),
          category: form.category.trim(),
          price,
          stock,
          owned: false,
          imageUrl,
        });
        setSuccess("Spiel wurde erstellt.");
      }
      resetForm();
      await refetch();
    } catch {
      setFormError(
        editingId
          ? "Spiel konnte nicht aktualisiert werden."
          : "Spiel konnte nicht erstellt werden.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteGame(deleteTarget.id);
      if (editingId === deleteTarget.id) resetForm();
      await refetch();
    } catch {
      setFormError("Spiel konnte nicht gelöscht werden.");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Einstellungen
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Spiele im Store anlegen, bearbeiten oder löschen.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 5 }}>
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {editingId ? "Spiel bearbeiten" : "Neues Spiel"}
          </Typography>

          {formError && <Alert severity="error">{formError}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField
            label="Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            required
          />
          <TextField
            label="Kategorie"
            value={form.category}
            onChange={handleChange("category")}
            fullWidth
            required
          />
          <TextField
            label="Preis (€)"
            type="number"
            value={form.price}
            onChange={handleChange("price")}
            fullWidth
            required
            slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
          />
          <TextField
            label="Lagerbestand"
            type="number"
            value={form.stock}
            onChange={handleChange("stock")}
            fullWidth
            required
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
          />
          <TextField
            label="Bild-URL (optional)"
            value={form.imageUrl}
            onChange={handleChange("imageUrl")}
            fullWidth
            placeholder="https://..."
          />

          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={submitting}
            >
              {submitting
                ? "Wird gespeichert..."
                : editingId
                  ? "Speichern"
                  : "Spiel hinzufügen"}
            </Button>
            {editingId && (
              <Button
                variant="outlined"
                size="large"
                onClick={resetForm}
                disabled={submitting}
              >
                Abbrechen
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Alle Spiele
      </Typography>

      {loading || loadError ? (
        <AsyncState loading={loading} error={loadError} />
      ) : games.length === 0 ? (
        <Typography color="text.secondary">
          Noch keine Spiele vorhanden.
        </Typography>
      ) : (
        <List>
          {games.map((game) => (
            <ListItem
              key={game.id}
              divider
              secondaryAction={
                <Stack direction="row" spacing={1}>
                  <IconButton
                    edge="end"
                    aria-label="Bearbeiten"
                    onClick={() => handleEditClick(game)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Löschen"
                    onClick={() => setDeleteTarget(game)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              }
            >
              <ListItemAvatar>
                <Avatar src={game.imageUrl ?? undefined} variant="rounded">
                  <SportsEsportsIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={game.name}
                secondary={`${game.category} · ${game.price.toFixed(2)} € · ${game.stock} auf Lager${game.owned ? " · gekauft" : ""}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={deleteTarget !== null} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Spiel löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soll „{deleteTarget?.name}" wirklich gelöscht werden? Das kann
            nicht rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)} disabled={deleting}>
            Abbrechen
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={deleting}>
            {deleting ? "Wird gelöscht..." : "Löschen"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
