import MultiChannelChart from './index';
import { styler } from 'react-timeseries-charts';
import { TimeSeries, TimeRange, avg, percentile, median } from 'pondjs';

const data = require('./bike.json');

const DummyDataChart = () => {
  const style = styler([
    { key: 'distance', color: '#ff47ff' },
    { key: 'altitude', color: '#e2e2e2' },
    { key: 'cadence', color: '#ff47ff' },
    { key: 'power', color: 'green', width: 1, opacity: 0.5 },
    { key: 'temperature', color: 'red' },
    { key: 'speed', color: 'steelblue', width: 1, opacity: 0.5 }
  ]);

  const baselineStyles = {
    speed: {
      stroke: 'steelblue',
      opacity: 0.5,
      width: 0.25
    },
    power: {
      stroke: 'green',
      opacity: 0.5,
      width: 0.25
    }
  };
  // Storage for all the data channels
  const channels = {
    distance: {
      units: 'miles',
      label: 'Distance',
      format: ',.1f',
      series: null,
      show: false
    },
    altitude: {
      units: 'meters',
      label: 'Altitude',
      format: 'd',
      series: null,
      show: false
    },
    cadence: {
      units: 'rpm',
      label: 'Cadence',
      format: 'd',
      series: null,
      show: true
    },
    power: {
      units: 'watts',
      label: 'Power',
      format: ',.1f',
      series: null,
      show: true
    },
    temperature: {
      units: 'deg C',
      label: 'Temperature',
      format: 'd',
      series: null,
      show: false
    },
    speed: {
      units: 'm/s',
      label: 'Speed',
      format: ',.1f',
      series: null,
      show: true
    }
  };

  // Channel names list, in order we want them shown
  const channelNames = [
    'speed',
    'power',
    'cadence',
    'temperature',
    'distance',
    'altitude'
  ];

  const getPoints = () => {
    const points = {};
    channelNames.forEach((channel) => {
      points[channel] = [];
    });

    for (let i = 0; i < data.time.length; i += 1) {
      if (i > 0) {
        const deltaTime = data.time[i] - data.time[i - 1];
        const time = data.time[i] * 1000;

        points['distance'].push([time, data.distance[i]]);
        points['altitude'].push([time, data.altitude[i]]);
        points['cadence'].push([time, data.cadence[i]]);
        points['power'].push([time, data.watts[i]]);
        points['temperature'].push([time, data.temp[i]]);

        // insert a null into the speed data to put breaks in the data where
        // the rider was stationary
        if (deltaTime > 10) {
          points['speed'].push([time - 1000, null]);
        }

        const speed =
          (data.distance[i] - data.distance[i - 1]) /
          (data.time[i] - data.time[i - 1]); // meters/sec
        points['speed'].push([time, speed]); // convert m/s to miles/hr
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
      displayChannels={['speed', 'power', 'temperature', 'distance']}
      rollupLevels={['1s', '5s', '15s', '25s']}
      baseChannel={'altitude'}
    ></MultiChannelChart>
  );
};

export default DummyDataChart;
