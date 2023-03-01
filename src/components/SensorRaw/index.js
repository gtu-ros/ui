import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import SensorCard from './SensorCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import { blue, purple, red } from '@mui/material/colors';
import useMessage from '../../hooks/useMessage';

const SensorRaw = ({ }) => {
  const { message } = useMessage(PLUGIN_KEYS.SENSOR_RAW, '/sensor_raw', 500);
  const { setOnline, setOffline, setData } = usePluginState(
    PLUGIN_KEYS.SENSOR_RAW
  );

  useEffect(() => {
    setData({ timestamp: message?.header?.stamp?.secs });
    message ? setOnline() : setOffline();
  }, [message]);

  return (
    <Stack spacing={1} m={1}>
      <SensorCard
        title="Temperature"
        value={message?.temperature.toFixed(2)}
        unit="°C"
        icon={<DeviceThermostatIcon />}
        color={red}
      />
      <SensorCard
        title="Relative Humidity"
        value={message?.humidity.toFixed(3)}
        unit="%"
        icon={<OpacityIcon />}
        color={blue}
      />
      <SensorCard
        title="Barometric Pressure"
        value={message?.pressure.toFixed(3)}
        unit="Pa"
        icon={<AirIcon />}
        color={purple}
      />
    </Stack>
  );
};

export default SensorRaw;
