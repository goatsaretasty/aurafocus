import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';

// Mock function for now - replace with actual API call later
const fetchPlaylist = async (mood: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Generated playlist based on mood: ${mood}`;
};

const MoodInput = () => {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mood) return;

    setIsLoading(true);
    try {
      const response = await fetchPlaylist(mood);
      setSnackbarMessage(response);
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Something went wrong. Please try again.');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
      setMood('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        margin: '0 auto',
        padding: 2,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Enter Your Mood
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          fullWidth
          label="Your Mood"
          variant="outlined"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          disabled={isLoading}
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading || !mood}
        >
          {isLoading ? 'Generating Playlist...' : 'Generate Playlist'}
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MoodInput;
