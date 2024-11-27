import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <div>
        <Typography variant="h3" color="error">
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          The page you're looking for does not exist.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </div>
    </Box>
  );
};

export default NotFound;
