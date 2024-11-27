import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, Snackbar, Alert, Modal, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom'; // for navigation

const PomodoroTimer = () => {
  const [pomodoroMinutes, setPomodoroMinutes] = useState('25');
  const [breakMinutes, setBreakMinutes] = useState('5');
  const [pomodoroDuration, setPomodoroDuration] = useState(parseInt(pomodoroMinutes) * 60);
  const [breakDuration, setBreakDuration] = useState(parseInt(breakMinutes) * 60);
  const [timeLeft, setTimeLeft] = useState(pomodoroDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const bellSound = new Audio('/sounds/bell.mp3');

  const handlePomodoroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPomodoroMinutes(value);
    
    const minutes = parseInt(value) || 1; // Default to 1 if invalid
    const newDuration = minutes * 60;
    
    setPomodoroDuration(newDuration);
    if (isPomodoro && !isRunning) {
      setTimeLeft(newDuration);
    }
  };

  const handleBreakChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBreakMinutes(value);
    
    const minutes = parseInt(value) || 1; // Default to 1 if invalid
    const newDuration = minutes * 60;
    
    setBreakDuration(newDuration);
    if (!isPomodoro && !isRunning) {
      setTimeLeft(newDuration);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    const duration = isPomodoro ? parseInt(pomodoroMinutes) * 60 : parseInt(breakMinutes) * 60;
    setTimeLeft(duration);
  };

  // This useEffect is responsible for saving timer state when the user navigates to a new page
  useEffect(() => {
    if (isRunning) {
      // Save current state to localStorage so it persists across page navigation
      localStorage.setItem('pomodoro-state', JSON.stringify({
        isRunning,
        timeLeft,
        isPomodoro,
        pomodoroDuration,
        breakDuration,
      }));
    } else {
      // Clear timer state when stopped
      localStorage.removeItem('pomodoro-state');
    }
  }, [isRunning, timeLeft, isPomodoro, pomodoroDuration, breakDuration]);

  // This useEffect is responsible for restoring the timer state when the page is reloaded or navigated back to
  useEffect(() => {
    const savedState = localStorage.getItem('pomodoro-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      setIsRunning(state.isRunning);
      setTimeLeft(state.timeLeft);
      setIsPomodoro(state.isPomodoro);
      setPomodoroDuration(state.pomodoroDuration);
      setBreakDuration(state.breakDuration);
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            // Play the bell sound when timer ends with proper error handling
            bellSound.play().catch(error => {
              console.error('Error playing sound:', error);
              // Optionally show an error message to the user
              setSnackbarMessage('Could not play notification sound');
              setShowSnackbar(true);
            });

            // Show the Snackbar with message
            setSnackbarMessage(isPomodoro ? 'Pomodoro session complete!' : 'Break time is over!');
            setShowSnackbar(true);

            // Reset the timer and switch session
            if (isPomodoro) {
              setIsPomodoro(false);
              return breakDuration; // Start break timer
            } else {
              setIsPomodoro(true);
              return pomodoroDuration; // Start pomodoro timer again
            }
          }
          return prev - 1;
        });
      }, 1000); // Update every second
    }

    return () => clearInterval(timer); // Cleanup interval on component unmount or when isRunning changes
  }, [isRunning, pomodoroDuration, breakDuration, isPomodoro, bellSound]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal manually if required
  };

  // Modal styling for when the timer is in a modal form
  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    minWidth: 300,
  };

  return (
    <Box sx={{ 
      position: 'relative',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
    }}>
      <Typography variant="h4" gutterBottom align="center">
        Pomodoro Timer
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <TextField
            label="Pomodoro Duration (minutes)"
            type="number"
            value={pomodoroMinutes}
            onChange={handlePomodoroChange}
            disabled={isRunning}
            fullWidth
            inputProps={{ min: 1, max: 60 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Break Duration (minutes)"
            type="number"
            value={breakMinutes}
            onChange={handleBreakChange}
            disabled={isRunning}
            fullWidth
            inputProps={{ min: 1, max: 60 }}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2">
          {formatTime(timeLeft)}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {isPomodoro ? 'Pomodoro Session' : 'Break Time'}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartPause}
          size="large"
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          size="large"
        >
          Reset
        </Button>
      </Box>

      {/* Only show the floating timer when not on the timer page and timer is running */}
      {location.pathname !== '/pomodoro-timer' && isRunning && (
        <Box
          sx={{
            position: 'fixed',
            bottom: { xs: 70, sm: 20 }, // Adjust bottom margin to avoid footer
            right: 20,
            bgcolor: 'background.paper',
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1000, // Lower than modal but higher than most content
          }}
        >
          <Typography variant="h6" gutterBottom>
            {isPomodoro ? 'Pomodoro' : 'Break'}
          </Typography>
          <Typography variant="h4" align="center" gutterBottom>
            {formatTime(timeLeft)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            fullWidth
          >
            Open Timer
          </Button>
        </Box>
      )}

      {/* Keep Modal and Snackbar components as they are */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="timer-modal"
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" gutterBottom>
            {isPomodoro ? 'Pomodoro Timer' : 'Break Timer'}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                label="Pomodoro (min)"
                type="number"
                value={pomodoroMinutes}
                onChange={handlePomodoroChange}
                disabled={isRunning}
                fullWidth
                size="small"
                inputProps={{ min: 1, max: 60 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Break (min)"
                type="number"
                value={breakMinutes}
                onChange={handleBreakChange}
                disabled={isRunning}
                fullWidth
                size="small"
                inputProps={{ min: 1, max: 60 }}
              />
            </Grid>
          </Grid>

          <Typography variant="h4" align="center" sx={{ mb: 3 }}>
            {formatTime(timeLeft)}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleStartPause}
            >
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PomodoroTimer;
