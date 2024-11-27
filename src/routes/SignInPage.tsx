import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { Box, Container } from '@mui/material';

const SignInPage = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          pt: 8,
          pb: 6,
        }}
      >
        <SignIn routing="path" path="/sign-in" />
      </Box>
    </Container>
  );
};

export default SignInPage; 