import { Box, Typography } from '@mui/material'
import type { WordCount } from '../wordCloud'

const MIN_REM = 0.85
const MAX_REM = 2.5

function scatter(word: string): number {
  let hash = 0
  for (let i = 0; i < word.length; i++) {
    hash = (hash * 31 + word.charCodeAt(i)) | 0
  }
  return hash
}

const WordCloud = ({ words }: { words: WordCount[] }) => {
  if (words.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
        Write down what a song dragged up and it starts showing here.
      </Typography>
    )
  }

  const max = words[0].count
  const min = words[words.length - 1].count
  const range = max - min

  // Alphabetical order clumps the heavy words together whenever they happen to
  // share a first letter. Ordering by a hash of the word scatters them across
  // the block instead, and stays stable between renders.
  const display = [...words].sort((a, b) => scatter(a.word) - scatter(b.word))

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        gap: '0.1rem 0.8rem',
        py: 1.5,
      }}
    >
      {display.map(({ word, count }) => {
        const weight = range === 0 ? 0 : (count - min) / range
        return (
          <Box
            key={word}
            component="span"
            title={`${count}×`}
            sx={{
              fontSize: `${MIN_REM + weight * (MAX_REM - MIN_REM)}rem`,
              fontWeight: weight > 0.5 ? 700 : 400,
              opacity: 0.55 + weight * 0.45,
              lineHeight: 1.35,
            }}
          >
            {word}
          </Box>
        )
      })}
    </Box>
  )
}

export default WordCloud
