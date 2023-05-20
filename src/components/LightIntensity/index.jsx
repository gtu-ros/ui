import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Stack, Typography } from '@mui/material';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import useMessage from '../../hooks/useMessage';
import SensorCard from './SensorCard';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import { blue, purple, red } from '@mui/material/colors';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
const MAX_ARRAY_SIZE = 120;
const LightIntensity = () => {
    const { setOnline, setOffline, data } = usePluginState(PLUGIN_KEYS.SENSOR_RAW);

    const [isAlive, setIsAlive] = useState(false);
    const [array, setArray] = useState([]);

    useEffect(() => {

        setArray(prevData => {
            const newData = [...prevData, data];
            if (newData.length > MAX_ARRAY_SIZE) {
                return newData.slice(newData.length - MAX_ARRAY_SIZE);
            } else {
                return newData;
            }
        });


        if (data) {

            setOnline();
            setIsAlive(data.lux > 0);
        } else {
            setOffline();
            setIsAlive(false);
        }
    }, [data]);

    return (
        <Stack spacing={1} m={1}>
            <Stack spacing={1}>
                <SensorCard
                    title="Light Intensity"
                    dKey="lux"
                    value={data?.lux}
                    unit="Lux"
                    icon={<WbIncandescentIcon />}
                    color={red}
                    data={array}
                />
                <Stack
                    sx={{
                        padding: 1,
                        border: '1px solid',
                        borderRadius: 1,
                        borderColor: 'divider',
                        backgroundColor: isAlive ? 'success.light' : 'error.light',
                    }}
                    direction="row"
                    alignItems="center"
                >
                    {isAlive ? (
                        <AddCircleIcon sx={{ color: 'common.white' }} />
                    ) : (
                        <RemoveCircleIcon sx={{ color: 'common.white' }} />
                    )}
                    <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
                        {isAlive ? ' Life Detection: Positive' : ' Life Detection: Negative'}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default LightIntensity;
