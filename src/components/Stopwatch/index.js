import React from 'react';
import { IconButton } from '@mui/material';
import { Stop, PlayArrow, Pause } from '@mui/icons-material';
import { Grid } from '@material-ui/core';

const Stopwatch = ({
  seconds,
  minutes,
  hours,
  isRunning,
  start,
  pause,
  reset
}) => {
  // const { seconds, minutes, hours, isRunning, start, pause, reset } =
  //   usePluginData('stopwatch');

  const pad = (n) => n.toString().padStart(2, '0');

  return (
    <Grid container direction="row" alignItems="center">
      <span>
        <IconButton onClick={reset} size="small">
          <Stop />
        </IconButton>
        {isRunning ? (
          <IconButton onClick={pause} size="small">
            <Pause />
          </IconButton>
        ) : (
          <IconButton onClick={start} size="small">
            <PlayArrow />
          </IconButton>
        )}
      </span>
      <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
      <span>{pad(seconds)}</span>
    </Grid>
  );
};

export default Stopwatch;
