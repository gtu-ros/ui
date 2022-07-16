import Chart from '.';
import React, { useEffect, useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';

const GpsVelocityChart = () => {
  const { status, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.SPEED_CHART
  );
  const [data, setData] = useState([]);
  const { isConnected, message } = useSubscribeTopic(
    '/ublox/fix_velocity',
    500
  );

  useEffect(() => {
    if (isConnected && message) {
      setOnline();
      console.log({message})
      const velocity = message?.twist?.twist?.linear?.x;
      setData([...data.slice(-50), [Date.now(), velocity]]);
    } else {
      setOffline();
      status !== 'offline' && setOffline();
      setData([...data, [Date.now(), NaN]]);
    }
  }, [isConnected, message]);

  return <Chart label={'Velocity'} min={-5} max={5} data={data} />;
};

export default GpsVelocityChart;
