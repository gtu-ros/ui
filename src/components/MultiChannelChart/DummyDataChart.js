import MultiChannelChart from './index';
import { styler } from 'react-timeseries-charts';

const data = require('./sensor.json');

const DummyDataChart = () => {
  const style = styler([
    { key: 'temp', color: '#d32f2f' },
    { key: 'atmospheric_pressure', color: '#1976d2' },
    { key: 'altitude', color: '#e2e2e2' },
    { key: 'co', color: '#9c27b0', width: 1, opacity: 0.5 },
    { key: 'ch4', color: '#ed6c02' },
    { key: 'o2', color: '#0288d1', width: 1, opacity: 0.5 },
    { key: 'humidity', color: '#2e7d32' },
    { key: 'co2', color: 'steelblue', width: 1, opacity: 0.5 }
  ]);

  const baselineStyles = {
    temp: {
      stroke: 'steelblue',
      opacity: 0.5,
      width: 0.25
    },
    altitude: {
      stroke: 'green',
      opacity: 0.5,
      width: 0.25
    }
  };

  const channels = {
    temp: {
      units: 'Celsius Degrees',
      label: 'Temperature',
      format: ',.1f',
      series: null,
      show: true
    },
    atmospheric_pressure: {
      units: 'pa',
      label: 'Pressure',
      format: ',.1f',
      series: null,
      show: true
    },
    altitude: {
      units: 'meters',
      label: 'Altitude',
      format: 'd',
      series: null,
      show: true
    },
    co: {
      units: 'ppm',
      label: 'CO',
      format: ',.1f',
      series: null,
      show: true
    },
    ch4: {
      units: 'ppm',
      label: 'CH4',
      format: 'd',
      series: null,
      show: true
    },
    o2: {
      units: 'ppm',
      label: 'O2',
      format: ',.1f',
      series: null,
      show: true
    },
    humidity: {
      units: 'g/m3',
      label: 'Humidity',
      format: ',.1f',
      series: null,
      show: true
    },
    co2: {
      units: 'ppm',
      label: 'CO2',
      format: ',.1f',
      series: null,
      show: true
    }
  };

  const channelNames = [
    'temp',
    'atmospheric_pressure',
    'altitude',
    'co',
    'ch4',
    'o2',
    'humidity',
    'humidity',
    'co2'
  ];

  const getPoints = () => {
    const points = {};
    channelNames.forEach((channel) => {
      points[channel] = [];
    });

    for (let i = 0; i < data.time.length; i += 1) {
      if (i > 0) {
        const time = data.time[i] * 1000;

        points['temp'].push([time, data.temp[i]]);
        points['atmospheric_pressure'].push([
          time,
          data.atmospheric_pressure[i]
        ]);
        points['altitude'].push([time, data.altitude[i]]);
        points['co'].push([time, data.co[i]]);
        points['ch4'].push([time, data.ch4[i]]);
        points['o2'].push([time, data.o2[i]]);
        points['humidity'].push([time, data.humidity[i]]);
        points['co2'].push([time, data.co2[i]]);
      }
    }

    return points;
  };

  return (
    <MultiChannelChart
      data={getPoints()}
      style={style}
      baselineStyles={baselineStyles}
      channels={channels}
      channelNames={channelNames}
      displayChannels={[
        'temp',
        'atmospheric_pressure',
        'co',
        'co2',
        'ch4',
        'o2',
        'humidity',
        'co2'
      ]}
      rollupLevels={['0.1s', '5s', '15s', '25s']}
      baseChannel={'altitude'}
    />
  );
};

export default DummyDataChart;
