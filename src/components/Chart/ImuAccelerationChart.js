import Chart from '.';
import React, { useEffect, useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';

const ImuAccelerationChart = () => {
  const { status, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.SPEED_CHART
  );
  const [data, setData] = useState([]);
  const { isConnected, message } = useSubscribeTopic(
    '/zed2/zed_node/imu/data',
    500
  );

  useEffect(() => {
    if (isConnected && message) {
      setOnline();
      const accelerationX = message.linear_acceleration.x;
      setData([...data.slice(-50), [Date.now(), accelerationX]]);
    } else {
      setOffline();
      status !== 'offline' && setOffline();
      setData([...data, [Date.now(), NaN]]);
    }
  }, [isConnected, message]);

  return <Chart label={'Acceleration'} min={-10} max={10} data={data} />;
};

export default ImuAccelerationChart;
