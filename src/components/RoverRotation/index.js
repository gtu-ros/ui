import React, { useEffect, useState } from 'react';
import roverSideView from './rover-side.jpeg';
import roverBackView from './rover-back.jpeg';
import * as THREE from 'three';
import { Grid, Slider, Typography } from '@mui/material';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import OrientationView from './OrientationView';

export const RoverRotation = (props) => {
  const float_precision = 1;
  const { status, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.ORIENTATION
  );
  const { message } = useSubscribeTopic('/zed2/zed_node/imu/data', 500);

  let orientation = null;
  if (message) {
    setOnline();
    const quaternion = new THREE.Quaternion();
    quaternion.copy(message.orientation);
    orientation = new THREE.Euler().setFromQuaternion(quaternion);
  } else {
    setOffline();
  }

  const orientationViews = [
    {
      title: 'Pitch',
      img: roverSideView,
      angle: (-(orientation?.y * 180) / Math.PI).toFixed(float_precision)
    },
    {
      title: 'Roll',
      img: roverBackView,
      angle: ((orientation?.x * 180) / Math.PI).toFixed(float_precision)
    }
  ];

  return (
    <>
      <div style={{ padding: 4 }}>
        <Grid container>
          {orientationViews.map((view) => (
            <OrientationView {...view} />
          ))}
        </Grid>
      </div>
    </>
  );
};
