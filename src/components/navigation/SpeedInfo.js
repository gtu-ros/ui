import React, { useEffect, useState } from 'react';

import { wheelOdom } from '../../services/RosService';

import Title from '../Title';

import GaugeChart from 'react-gauge-chart';
import { speedInfoConfig } from '../../utils/constants';

export const SpeedInfo = (props) => {
  const [odomListenerState, setOdomListenerState] = useState(null);
  const [speed, setSpeed] = useState(0);

  const float_precision = 2;

  const odomCallback = (message) => {
    if (message.header.seq % speedInfoConfig.odomPeriod === 0) {
      if (message) {
        const updatedSpeed = message.twist.linear.x.toFixed(float_precision);
        setSpeed(updatedSpeed <= 0 ? 0 : updatedSpeed);
      }
      // const quaternion = new THREE.Quaternion();
      // quaternion.copy(message.pose.pose.orientation);
      //   setOrientation(new THREE.Euler().setFromQuaternion(quaternion));
    }
  };

  useEffect(() => {
    setOdomListenerState(wheelOdom());
  }, []);

  useEffect(() => {
    if (odomListenerState) odomListenerState.subscribe(odomCallback);
    return () => odomListenerState?.unsubscribe();
  }, [odomListenerState]);

  return (
    <>
      <Title>Speed</Title>
      <GaugeChart
        id="gauge-chart4"
        style={{ height: '150px' }}
        animate={false}
        nrOfLevels={speedInfoConfig.nrOfLevels}
        textColor="000"
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
    </>
  );
};
