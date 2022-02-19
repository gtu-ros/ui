import Chart from '../Chart';
import React, { useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import useInterval from '../../hooks/useInterval';

const SpeedChart = () => {
  const [data, setData] = useState([]);
  const { isConnected, message } = useSubscribeTopic('/wheel_odom');
  const interval = 500;

  useInterval(() => {
    if (isConnected && message) {
      let speed = message.twist.linear.x;
      console.log({ speed });
      if (speed < 0) speed = 0;
      setData([...data, [Date.now(), speed]]);
    } else {
      setData([...data, [Date.now(), NaN]]);
    }
  }, interval);

  return <Chart label={'Speed (m/s)'} data={data.slice(-50)} />;
};

export default SpeedChart;
