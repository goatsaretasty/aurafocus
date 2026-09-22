import { useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import type { NewEntry } from '../useEntries'

// localStorage caps out around 5MB per site, so unbounded notes would
// eventually make every save fail.
const MAX_TITLE = 200
const MAX_MUSING = 2000

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
            slotProps={{ htmlInput: { maxLength: MAX_TITLE } }}
          />
          <TextField
            label="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            fullWidth
            autoComplete="off"
            slotProps={{ htmlInput: { maxLength: MAX_TITLE } }}
          />
        </Box>

        <TextField
          label="What it dragged up"
          value={musing}
          onChange={(e) => setMusing(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          slotProps={{ htmlInput: { maxLength: MAX_MUSING } }}
          helperText={musing.length > MAX_MUSING * 0.9 ? `${musing.length} / ${MAX_MUSING}` : ' '}
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
