import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const MoodInputForm = () => {
  const [mood, setMood] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User mood: ', mood); // This is where you'll later connect to backend or state management
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
      <TextField
        label="What's your mood?"
        variant="outlined"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
        Submit
      </Button>
    </form>
  );
};

export default MoodInputForm;
