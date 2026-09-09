import { Box, Typography, Container } from '@mui/material'

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, mt: 'auto', borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary">
          Earworm · entries live in this browser only, for now
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
