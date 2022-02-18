import Chart from '../Chart';
import React, { useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import useInterval from '../../hooks/useInterval';

const SpeedChart = () => {
  const [data, setData] = useState([]);
  const { message } = useSubscribeTopic('/wheel_odom');
  const interval = 500;

  useInterval(() => {
    if (message) {
      let updatedSpeed = message.twist.linear.x;
      if (updatedSpeed < 0) updatedSpeed = 0;
      setData([...data, [Date.now(), updatedSpeed]]);
    }
  }, interval);

  return <Chart label={'Speed (m/s)'} data={data.slice(-50)} />;
};

export default SpeedChart;
