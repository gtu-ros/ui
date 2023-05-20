import React, { useEffect, useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { format } from 'd3-format';

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
      const velocity = message?.twist?.twist?.linear?.x;
      setData([...data.slice(-50), { velocity }]);
    } else {
      setOffline();
      status !== 'offline' && setOffline();
      setData([...data, [Date.now(), NaN]]);
    }
  }, [isConnected, message]);

  const valueFormat = format('.2f');
  const currentValue = data.slice(-1)[0]?.velocity;

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            right: 80
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={'acceleration'}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <h2 style={{ paddingRight: 20, float: 'right', marginTop: -80 }}>
        {valueFormat(currentValue)}
      </h2>
    </>
  );
};

export default GpsVelocityChart;
