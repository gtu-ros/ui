import React, { useEffect, useState } from 'react';
import roverSideView from './rover-side.png';
import roverFrontView from './rover-front.png';

import { zed2Odom } from '../../services/RosService';

import * as THREE from 'three';

import { Grid, Slider, Typography } from '@material-ui/core';
import Title from '../Title';
import { roverRotationConfig } from '../../utils/constants';

export const RoverRotation = (props) => {
  const float_precision = 2;

  const [odomListenerState, setOdomListenerState] = useState(null);
  const [orientation, setOrientation] = useState(null);

  const odomCallback = (message) => {
    if (message.header.seq % roverRotationConfig.odomPeriod === 0) {
      const quaternion = new THREE.Quaternion();
      quaternion.copy(message.pose.pose.orientation);
      setOrientation(new THREE.Euler().setFromQuaternion(quaternion));
    }
  };

  useEffect(() => {
    setOdomListenerState(zed2Odom());
  }, []);

  useEffect(() => {
    if (odomListenerState) odomListenerState.subscribe(odomCallback);
    return () => odomListenerState?.unsubscribe();
  }, [odomListenerState]);

  const orientationViews = [
    {
      title: 'Pitch',
      img: roverSideView,
      angle: (-(orientation?.y * 180) / Math.PI).toFixed(float_precision)
    },
    {
      title: 'Roll',
      img: roverFrontView,
      angle: ((orientation?.x * 180) / Math.PI).toFixed(float_precision)
    }
  ];

  return (
    <>
      <Title>Orientation</Title>
      <div style={{ padding: '20px' }}>
        <Grid container spacing={3} style={{}}>
          {orientationViews.map((view) => (
            <Grid xs={6}>
              <Typography
                component="h2"
                variant="h6"
                color="secondary"
                align="left"
                gutterBottom
              >
                {view.title}
              </Typography>

              <div
                style={{
                  transform: `rotate(${view.angle}deg)`,
                  width: '65%',
                  maxWidth: 250,
                  height: '270px',
                  position: 'relative',
                  margin: 'auto'
                }}
              >
                <img
                  src={view.img}
                  style={{
                    width: '100%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>

              <div style={{ margin: 'auto', width: ' 80%', maxWidth: '400px' }}>
                <Slider
                  value={view.angle}
                  valueLabelDisplay="on"
                  min={-180}
                  max={180}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
