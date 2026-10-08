import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import type { Game } from "../types/Game";
import { createGame } from "../api/gamesApi";

const EMPTY_FORM = { name: "", category: "", price: "", stock: "" };

export default function Settings() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim() || !form.category.trim()) {
      setError("Name und Kategorie dürfen nicht leer sein.");
      return;
    }
    if (Number.isNaN(price) || price < 0) {
      setError("Preis muss eine gültige, nicht-negative Zahl sein.");
      return;
    }
    if (Number.isNaN(stock) || stock < 0) {
      setError("Lagerbestand muss eine gültige, nicht-negative Zahl sein.");
      return;
    }

    const game: Game = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      category: form.category.trim(),
      price,
      stock,
      owned: false,
    };

    setSubmitting(true);
    try {
      await createGame(game);
      setForm(EMPTY_FORM);
      setSuccess(true);
    } catch {
      setError("Spiel konnte nicht erstellt werden.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Einstellungen
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Neues Spiel zum Store hinzufügen.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Spiel wurde erstellt.</Alert>}

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

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
          >
            {submitting ? "Wird erstellt..." : "Spiel hinzufügen"}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
