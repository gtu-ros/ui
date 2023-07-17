import React, { useState, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import SensorCard from './SensorCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import ColorLensIcon from '@mui/icons-material/ColorLens';
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
      altitude: message?.altitude.toFixed(3),
      // co: message?.CO_gas_val,
      metan: message?.met_gas_val,
      // O2: message?.o2_concentration,
      // colorTemp: message?.color_temp,
      // lux: message?.lux.toFixed(2)
      weight: message?.weight_average.toFixed(2),
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
    <Stack spacing={0} m={1}>
      <Grid style={{ marginBottom: '5px' }} container spacing={2}>
        <Grid item xs={6}>
          <SensorCard
            title="Temperature"
            dKey="temp"
            value={data?.temp}
            unit="°C"
            icon={<DeviceThermostatIcon />}
            color={red}
            data={array}
          />
        </Grid>
        <Grid item xs={6}>
          <SensorCard
            title="Relative Humidity"
            dKey="humidity"
            value={data?.humidity}
            unit="%"
            icon={<OpacityIcon />}
            color={blue}
            data={array}
          />
        </Grid>
      </Grid>

      <Grid style={{ marginBottom: '5px' }} container spacing={2}>
        <Grid item xs={6}>
          <SensorCard
            title="Barometric Pressure"
            dKey="pressure"
            value={data?.pressure}
            unit="Pa"
            icon={<AirIcon />}
            color={red}
            data={array}
          />
        </Grid>
        <Grid item xs={6}>
          <SensorCard
            title="Altitude"
            dKey="altitude"
            value={data?.altitude}
            unit="Meter"
            icon={<HeightIcon />}
            color={blue}
            data={array}
          />
        </Grid>
      </Grid>

      <Grid style={{ marginBottom: '5px' }} container spacing={2}>
        <Grid item xs={6}>
          <SensorCard
            title="Metan"
            dKey="metan"
            value={data?.metan}
            unit="%"
            icon={<AirIcon />}
            color={red}
            data={array}
          />
        </Grid>
        <Grid item xs={6}>
          <SensorCard
            title="Weight"
            dKey="weight"
            value={data?.weight}
            unit="gr"
            icon={<ScaleIcon />}
            color={blue}
            data={array}
          />
        </Grid>
      </Grid>

      {/* <Grid style={{ marginBottom: '5px' }} container spacing={2}>
        <Grid item xs={6}>
          <SensorCard
            title="O2"
            dKey="O2"
            value={data?.O2}
            unit="%"
            icon={<AirIcon />}
            color={red}
            data={array}
          />
        </Grid>
        <Grid item xs={6}>
          <SensorCard
            title="Color Temp"
            dKey="colorTemp"
            value={data?.colorTemp}
            unit="%"
            icon={<ColorLensIcon />}
            color={blue}
            data={array}
          />
        </Grid>
      </Grid> */}
    </Stack >

  );
};

export default SensorRaw;