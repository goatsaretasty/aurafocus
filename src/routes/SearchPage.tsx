import React from 'react';
import { Box } from '@mui/material';
import MoodInput from '../components/MoodInput';
import PomodoroTimer from '../components/PomodoroTimer';

const SearchPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <MoodInput />
      <PomodoroTimer />
    </Box>
  );
};

export default SearchPage; 