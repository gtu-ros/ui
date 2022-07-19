import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Stop, PlayArrow, Pause } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { PLUGIN_KEYS } from '../../constants';
import { setLocalStorage } from '../../utils';

const Stopwatch = ({
  seconds,
  minutes,
  hours,
  isRunning,
  start,
  pause,
  reset
}) => {
  const pad = (n) => n.toString().padStart(2, '0');

  useEffect(
    () =>
      setLocalStorage(PLUGIN_KEYS.STOPWATCH)({
        isRunning,
        offset: hours * 3600 + minutes * 60 + seconds
      }),
    [hours, minutes, seconds, isRunning]
  );

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
