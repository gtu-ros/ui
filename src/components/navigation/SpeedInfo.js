import React, { useEffect, useState } from 'react';
import roverSideView from './rover-side.png';
import roverFrontView from './rover-front.png';

import { zed2Odom } from '../../services/RosService';

import * as THREE from 'three';

import { Grid, Slider, Typography } from '@material-ui/core';
import Title from '../Title';

import GaugeChart from 'react-gauge-chart';

export const SpeedInfo = (props) => {
  const [odomListenerState, setOdomListenerState] = useState(null);
  const [speed, setSpeed] = useState(0.5);

  //   const odomCallback = (message) => {
  //     if (message.header.seq % 3 === 0) {
  //       const quaternion = new THREE.Quaternion();
  //       quaternion.copy(message.pose.pose.orientation);
  //     //   setOrientation(new THREE.Euler().setFromQuaternion(quaternion));
  //     }
  //   };

  //   useEffect(() => {
  //     setOdomListenerState(zed2Odom());
  //   }, []);

  //   useEffect(() => {
  //     if (odomListenerState) odomListenerState.subscribe(odomCallback);
  //     return () => odomListenerState?.unsubscribe();
  //   }, [odomListenerState]);

  return (
    <>
      <Title>Speed</Title>
      <div style={{ height: '80%' }}>
        <Grid container spacing={3}>
          <GaugeChart
            id="gauge-chart4"
            nrOfLevels={10}
            textColor="#333"
            formatTextValue={() => `${speed} m/s`}
            percent={speed - 0.05}
          />

          {/* <Typography
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
            {`${speed} m/s`}
          </Typography> */}
        </Grid>
      </div>
    </>
  );
};
