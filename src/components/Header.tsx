import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useThemeContext } from '../theme/ThemeContext'

const Header = () => {
  const { mode, toggleColorMode } = useThemeContext()

  return (
    <AppBar position="sticky" elevation={0} color="default" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="md">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            Earworm
          </Typography>

          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
