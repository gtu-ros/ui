import React from 'react';
import { useTime } from 'react-timer-hook';
import { Grid } from '@mui/material';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants';

const Time = () => {
  const { seconds, minutes, hours } = useTime({ format: '24-hour' });

  const pad = (n) => n.toString().padStart(2, '0');

  const { data } = usePluginState(PLUGIN_KEYS.UTC);

  const date = new Date();
  const offset = data?.settings?.offset ? date.getTimezoneOffset() / 60 : 0;

  let utcHours = hours + offset;
  if (utcHours < 0) utcHours += 24;

  return (
    <Grid
      style={{ paddingLeft: 4 }}
      container
      direction="row"
      alignItems="center"
    >
      <span>{pad(utcHours)}</span>:<span>{pad(minutes)}</span>:
      <span>{pad(seconds)}</span>
    </Grid>
  );
};

export default Time;
