import React, { useEffect, useState } from 'react';
import { autonomousModes as AUTONOMOUS_MODES } from '../../utils/constants';

import { zed2Odom } from '../../services/RosService';

import * as THREE from 'three';

import { Grid, Typography } from '@mui/material';
import Title from '../Title';

export const AutonomousMode = (props) => {
  const [odomListenerState, setOdomListenerState] = useState(null);
  const [mode, setMode] = useState(AUTONOMOUS_MODES.idle);

  return (
    <>
      <Title>Status</Title>
      <div style={{ height: '100%', position: 'relative' }}>
        <Grid container spacing={3}>
          <Typography
            style={{
              position: 'absolute',
              width: '100%',
              top: '50%',
              textAlign: 'center',
              transform: 'translateY(-50%)'
            }}
            variant="h4"
            // color="primary"
            align="left"
            gutterBottom
          >
            {`${mode.text}`}
          </Typography>
        </Grid>
      </div>
    </>
  );
};
