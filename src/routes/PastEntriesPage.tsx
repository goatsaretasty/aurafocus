import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "@clerk/clerk-react";
import { listEntries, type Entry } from "../lib/api";

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "of", "to", "in", "on", "for",
  "is", "it", "this", "that", "i", "me", "my", "with", "was", "im",
]);

function wordCounts(entries: Entry[]) {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    const words = entry.musings.toLowerCase().match(/[a-z']+/g) ?? [];
    for (const word of words) {
      if (word.length < 3 || STOPWORDS.has(word)) continue;
      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30);
}

const PastEntriesPage = () => {
  const { getToken } = useAuth();
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        setEntries(await listEntries(token));
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load entries.");
      }
    })();
  }, [getToken]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!entries) return <CircularProgress />;

  const counts = wordCounts(entries);
  const maxCount = counts[0]?.[1] ?? 1;

  return (
    <Box sx={{ maxWidth: 640, margin: "0 auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        What's been on your mind
      </Typography>

      {counts.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            alignItems: "baseline",
            mb: 4,
            p: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          {counts.map(([word, count]) => (
            <span
              key={word}
              style={{ fontSize: `${0.85 + (count / maxCount) * 1.4}rem` }}
            >
              {word}
            </span>
          ))}
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 1 }}>
        Log
      </Typography>
      {entries.length === 0 ? (
        <Typography color="text.secondary">Nothing logged yet.</Typography>
      ) : (
        <List>
          {entries.map((entry) => (
            <ListItem key={entry.id} divider>
              <ListItemText
                primary={entry.song}
                secondary={`${entry.musings || "—"} · ${new Date(entry.created_at).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PastEntriesPage;
