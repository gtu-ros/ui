import Chart from '../Chart';
import React, { useEffect, useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants/plugins';
import usePluginState from '../../hooks/usePluginState';

const SpeedChart = () => {
  const { status, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.SPEED_CHART
  );
  const [data, setData] = useState([]);
  const { isConnected, message } = useSubscribeTopic('/wheel_odom', 500);

  useEffect(() => {
    if (isConnected && message) {
      setOnline();
      let speed = message.twist.linear.x;
      if (speed < 0) speed = 0;
      setData([...data, [Date.now(), speed]]);
    } else {
      setOffline();
      status !== 'offline' && setOffline();
      setData([...data, [Date.now(), NaN]]);
    }
  }, [isConnected, message]);

  return <Chart label={'Speed (m/s)'} data={data.slice(-50)} />;
};

export default SpeedChart;
