import React, { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import SensorCard from './SensorCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import { blue, purple, red } from '@mui/material/colors';
import useMessage from '../../hooks/useMessage';

const MAX_ARRAY_SIZE = 120;


const SensorRaw = () => {
  const { message } = useMessage(PLUGIN_KEYS.SENSOR_RAW, '/sensor_raw', 500);
  const { setOnline, setOffline, data, setData } = usePluginState(PLUGIN_KEYS.SENSOR_RAW);
  const [array, setArray] = useState([]);

  useEffect(() => {

    setData({
      timestamp: message?.header?.stamp?.secs,
      temp: message?.temperature.toFixed(2),
      humidity: message?.humidity.toFixed(3),
      pressure: message?.pressure.toFixed(3),
      lux: message?.lux.toFixed(2)
    });

    setArray(prevData => {
      const newData = [...prevData, data];
      if (newData.length > MAX_ARRAY_SIZE) {
        return newData.slice(newData.length - MAX_ARRAY_SIZE);
      } else {
        return newData;
      }
    });

    message ? setOnline() : setOffline();
  }, [message]);

  return (
    <Stack spacing={1} m={1}>
      <SensorCard
        title="Temperature"
        value={data?.temp}
        unit="°C"
        icon={<DeviceThermostatIcon />}
        color={red}
        data={array}
      />
      <SensorCard
        title="Relative Humidity"
        value={data?.humidity}
        unit="%"
        icon={<OpacityIcon />}
        color={blue}
        data={array}
      />
      <SensorCard
        title="Barometric Pressure"
        value={data?.pressure}
        unit="Pa"
        icon={<AirIcon />}
        color={purple}
        data={array}
      />
    </Stack>

  );
};

export default SensorRaw;