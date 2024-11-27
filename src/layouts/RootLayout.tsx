import { Link, Outlet } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="header">
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Mood Timer App
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <SignedOut>
                <Button
                  color="inherit"
                  component={Link}
                  to="/sign-in"
                >
                  Sign In
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/sign-up"
                >
                  Sign Up
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      rootBox: {
                        height: 40,
                        alignSelf: 'center'
                      }
                    }
                  }}
                />
              </SignedIn>
            </Box>
          </Toolbar>
        </AppBar>
      </header>
      <Outlet />
    </>
  )
}




