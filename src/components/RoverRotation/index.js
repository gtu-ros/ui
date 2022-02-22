import React, { useEffect, useState } from 'react';
import roverSideView from './rover-side.png';
import roverFrontView from './rover-front.png';
import * as THREE from 'three';
import { Grid, Slider, Typography } from '@mui/material';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';

export const RoverRotation = (props) => {
  const float_precision = 2;
  const { message } = useSubscribeTopic('/zed2/odom', 1000);

  let orientation = null;

  if (message) {
    const quaternion = new THREE.Quaternion();
    quaternion.copy(message.pose.pose.orientation);
    orientation = new THREE.Euler().setFromQuaternion(quaternion);
  }

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
      <div style={{ padding: 4 }}>
        <Grid container>
          {orientationViews.map((view) => (
            <Grid xs={6}>
              <Typography
                component="h2"
                variant="subtitle2"
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
