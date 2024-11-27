import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../theme/ThemeContext';

const Header = () => {
  const { mode, toggleColorMode } = useThemeContext();
  const location = useLocation();

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <AppBar position="sticky" elevation={1}>
      <Container maxWidth="lg">
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
            Mood Timer App
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleColorMode} color="inherit" size="large">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            
            <SignedIn>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  component={Link}
                  to="/dashboard"
                  color="inherit"
                  sx={{
                    textDecoration: 'none',
                    fontWeight: isActiveRoute('/dashboard') ? 700 : 400,
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  component={Link}
                  to="/search"
                  color="inherit"
                  sx={{
                    textDecoration: 'none',
                    fontWeight: isActiveRoute('/search') ? 700 : 400,
                  }}
                >
                  Search
                </Button>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      rootBox: {
                        height: 40,
                        width: 40,
                      }
                    }
                  }}
                />
              </Box>
            </SignedIn>
            
            <SignedOut>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  component={Link}
                  to="/sign-in"
                  color="inherit"
                  variant={isActiveRoute('/sign-in') ? 'outlined' : 'text'}
                >
                  Sign In
                </Button>
                <Button
                  component={Link}
                  to="/sign-up"
                  color="inherit"
                  variant={isActiveRoute('/sign-up') ? 'outlined' : 'text'}
                >
                  Sign Up
                </Button>
              </Box>
            </SignedOut>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 