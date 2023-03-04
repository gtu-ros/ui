import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Stack } from '@mui/material';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import SensorCard from './SensorCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import { blue, purple, red } from '@mui/material/colors';
import useMessage from '../../hooks/useMessage';


const GraphChart = () => {
    const { message } = useMessage(PLUGIN_KEYS.SENSOR_RAW, '/sensor_raw', 500);
    const { setOnline, setOffline } = usePluginState(PLUGIN_KEYS.SENSOR_RAW);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (message) {
            setData(prevData => [...prevData, { temp: message?.temperature.toFixed(2), humidity: message?.humidity.toFixed(3), pressure: message?.pressure.toFixed(3) }]);

            setOnline();
        } else {
            setOffline();
        }
    }, [message]);

    return (
        <Stack spacing={1} m={1}>
            <SensorCard
                title="Temperature"
                value={message?.temperature.toFixed(2)}
                unit="°C"
                icon={<DeviceThermostatIcon />}
                color={red}
                data={data}
            />
            <SensorCard
                title="Relative Humidity"
                value={message?.humidity.toFixed(3)}
                unit="%"
                icon={<OpacityIcon />}
                color={blue}
                data={data}
            />
            <SensorCard
                title="Barometric Pressure"
                value={message?.pressure.toFixed(3)}
                unit="Pa"
                icon={<AirIcon />}
                color={purple}
                data={data}
            />
        </Stack>

    );
};

export default GraphChart;
