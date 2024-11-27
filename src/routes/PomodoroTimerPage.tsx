import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const PomodoroTimer = () => {
  const [seconds, setSeconds] = useState(1500); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(1500); // Reset to 25 minutes
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <div>
      {/* Button to open Pomodoro Timer modal */}
      <Button onClick={handleOpen} variant="contained" color="primary" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
        Start Pomodoro Timer
      </Button>

      {/* Floating Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Pomodoro Timer</DialogTitle>
        <DialogContent>
          <div style={{ textAlign: 'center' }}>
            <h2>{`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}</h2>
            <LinearProgress variant="determinate" value={(100 * (1500 - seconds)) / 1500} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleStartPause} variant="contained" color="primary">
            {isActive ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleReset} variant="outlined" color="secondary">
            Reset
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PomodoroTimer;
