import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Typography 
          variant="body2" 
          align="center"
          color="text.secondary"
        >
          © {new Date().getFullYear()} Mood Timer App. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 