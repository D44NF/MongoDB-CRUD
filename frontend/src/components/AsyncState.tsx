import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

interface AsyncStateProps {
  loading: boolean;
  error: string | null;
}

export default function AsyncState({ loading, error }: AsyncStateProps) {
  if (loading) {
    return (
      <Container
        maxWidth="xl"
        sx={{ py: 8, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return null;
}
