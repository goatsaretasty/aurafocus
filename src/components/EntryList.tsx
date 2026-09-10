import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import WordCloud from './WordCloud'
import { topWords } from '../wordCloud'
import type { Entry } from '../types'

function groupByMonth(entries: Entry[]) {
  const months = new Map<string, Entry[]>()
  for (const entry of entries) {
    const key = entry.createdAt.slice(0, 7)
    const bucket = months.get(key)
    if (bucket) bucket.push(entry)
    else months.set(key, [entry])
  }
  return [...months.entries()]
}

function monthLabel(entry: Entry) {
  return new Date(entry.createdAt).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

function dayLabel(entry: Entry) {
  return new Date(entry.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

const EntryList = ({
  entries,
  onDelete,
}: {
  entries: Entry[]
  onDelete: (id: string) => void
}) => {
  if (entries.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4 }}>
        Nothing logged yet. The next song that won't leave you alone goes up there.
      </Typography>
    )
  }

  return (
    <Stack spacing={4}>
      {groupByMonth(entries).map(([key, monthEntries]) => (
        <Box key={key}>
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ display: 'block', mb: 1 }}
          >
            {monthLabel(monthEntries[0])} · {monthEntries.length}
          </Typography>

          <WordCloud words={topWords(monthEntries.map((entry) => entry.musing))} />

          <Stack spacing={2} sx={{ mt: 2 }}>
            {monthEntries.map((entry) => (
              <Paper key={entry.id} variant="outlined" sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 600 }}>
                      {entry.song}
                      {entry.artist && (
                        <Typography component="span" color="text.secondary" sx={{ fontWeight: 400 }}>
                          {' — '}
                          {entry.artist}
                        </Typography>
                      )}
                    </Typography>

                    {entry.musing && (
                      <Typography sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>{entry.musing}</Typography>
                    )}

                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                      {dayLabel(entry)}
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() => onDelete(entry.id)}
                    aria-label={`Delete entry for ${entry.song}`}
                    size="small"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

export default EntryList
