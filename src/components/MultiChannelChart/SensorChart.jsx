import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  Brush
} from 'recharts';
import { db } from '../../db';
import { PLUGIN_KEYS } from '../../constants';
import { useEffect, useState } from 'react';
import { secsToDate } from '../../utils/utils';

export default () => {
  const [data, setData] = useState();
  const { isMissionLogOpen } = useSelector((state) => state.ui);

  useEffect(() => {
    db[PLUGIN_KEYS.SENSOR_RAW].toArray().then((x) => {
      setData(x.slice(0, 1000)); // TODO: remove slice 
    });
  }, []);

  if (!isMissionLogOpen) {
    return 'Open mission log to view sensor data.';
  }

  const keys = [
    { key: 'altitude', color: '#3772FF' },
    { key: 'humidity', color: '#2EB872' },
    { key: 'pressure', color: '#9C27B0' },
    { key: 'temperature', color: '#FF6D00' },
    { key: 'ir_SI', color: '#FF4081' },
    { key: 'ir_TSL', color: '#FFEB3B' },
    { key: 'lux', color: '#FFC107' },
    { key: 'met_gas_val', color: '#4CAF50' },
    { key: 'o2_concentration', color: '#03A9F4' },
    { key: 'uv_SI', color: '#E91E63' },
    { key: 'visible_SI', color: '#FF5722' },
    { key: 'visible_TSL', color: '#795548' },
    { key: 'CO_gas_val', color: '#FF9800' },
    { key: 'co2_concentration', color: '#607D8B' }
  ];

  return (
    <div>
      {keys.map(({ key, color }) => (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            syncId="commonSensors"
            margin={{
              right: 80
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="secs"
              tickFormatter={(sec) => secsToDate(sec).toLocaleTimeString()}
            />
            <YAxis
              domain={['dataMin', 'dataMax']}
              tickFormatter={(x) => x.toFixed(1)}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={key}
              dot={false}
              stroke={color}
              fill={color}
            />
            <Brush />
          </AreaChart>
        </ResponsiveContainer>
      ))}
    </div>
  );
};
