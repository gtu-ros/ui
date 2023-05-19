import React, { useEffect, useState } from 'react';
import roverSideView from './rover-side.jpeg';
import roverBackView from './rover-back.jpeg';
import NavigationIcon from '@mui/icons-material/Navigation';
import * as THREE from 'three';
import { Box, Grid, Slider, Typography } from '@mui/material';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import OrientationView from './OrientationView';
import useMessage from '../../hooks/useMessage';
import RoverImage from './RoverImage';

export const RoverRotation = (props) => {
  const float_precision = 1;
  const { setOnline, setOffline, setData } = usePluginState(
    PLUGIN_KEYS.ORIENTATION
  );
  const { message } = useMessage(
    PLUGIN_KEYS.ORIENTATION,
    '/zed2/zed_node/imu/data',
    1000
  );

  const getOrientation = (message) => {
    const quaternion = new THREE.Quaternion();
    quaternion.copy(message.orientation);
    return new THREE.Euler().setFromQuaternion(quaternion);
  };

  useEffect(() => {
    message ? setOnline() : setOffline();
    if (message) {
      setData({
        timestamp: message?.header?.stamp?.secs,
        orientation: getOrientation(message)
      });
    }
  }, [message]);

  const orientation = message ? getOrientation(message) : {};

  return (
    <>
      <div style={{ width: '100%', padding: 4 }}>
        <Box sx={{ display: 'flex' }}>
          <OrientationView
            title={'Pitch'}
            angle={(-(orientation?.y * 180) / Math.PI).toFixed(float_precision)}
          >
            <RoverImage src={roverSideView} />
          </OrientationView>
          <OrientationView
            title={'Roll'}
            angle={((orientation?.x * 180) / Math.PI).toFixed(float_precision)}
          >
            <RoverImage src={roverBackView} />
          </OrientationView>
          <OrientationView
            title={'Yaw'}
            angle={-((orientation?.z * 180) / Math.PI).toFixed(float_precision)}
          >
            <NavigationIcon
              sx={{
                width: '100%',
                height: '100%'
              }}
            />
          </OrientationView>
        </Box>
      </div>
    </>
  );
};
