import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import type { NewEntry } from '../useEntries'

const EntryForm = ({ onAdd }: { onAdd: (entry: NewEntry) => void }) => {
  const [song, setSong] = useState('')
  const [artist, setArtist] = useState('')
  const [musing, setMusing] = useState('')

  const canSubmit = song.trim().length > 0

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!canSubmit) return

    onAdd({ song: song.trim(), artist: artist.trim(), musing: musing.trim() })
    setSong('')
    setArtist('')
    setMusing('')
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }} elevation={0} variant="outlined">
      <Typography variant="h6" sx={{ mb: 2 }}>
        What's stuck in your head?
      </Typography>

      <Stack spacing={2}>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="Song"
            value={song}
            onChange={(e) => setSong(e.target.value)}
            fullWidth
            required
            autoComplete="off"
          />
          <TextField
            label="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            fullWidth
            autoComplete="off"
          />
        </Box>

        <TextField
          label="What it dragged up"
          value={musing}
          onChange={(e) => setMusing(e.target.value)}
          fullWidth
          multiline
          minRows={3}
        />

        <Box>
          <Button type="submit" variant="contained" disabled={!canSubmit}>
            Log it
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}

export default EntryForm
