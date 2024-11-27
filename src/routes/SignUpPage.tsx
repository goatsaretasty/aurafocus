import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { Box, Container } from '@mui/material';

const SignUpPage = () => {
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
        <SignUp routing="path" path="/sign-up" />
      </Box>
    </Container>
  );
};

export default SignUpPage; 