import { useState } from "react";
import { Box, TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useAuth } from "@clerk/clerk-react";
import { createEntry } from "../lib/api";

const EntryForm = () => {
  const { getToken } = useAuth();
  const [song, setSong] = useState("");
  const [musings, setMusings] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!song.trim()) return;

    setIsSaving(true);
    try {
      const token = await getToken();
      await createEntry(token, song, musings);
      setSnackbar({ open: true, message: "Logged.", severity: "success" });
      setSong("");
      setMusings("");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : "Something went wrong.",
        severity: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 480,
        margin: "0 auto",
        padding: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        What's stuck in your head?
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Song"
          variant="outlined"
          value={song}
          onChange={(e) => setSong(e.target.value)}
          fullWidth
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="What's it stirring up?"
          variant="outlined"
          value={musings}
          onChange={(e) => setMusings(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSaving || !song.trim()}
        >
          {isSaving ? "Logging..." : "Log it"}
        </Button>
      </form>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EntryForm;
