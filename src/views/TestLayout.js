import React, { useRef } from 'react';
import Frame from '../components/Frame';

import ShowcaseLayout from '../components/Grid';
import { RoverRotation } from '../components/RoverRotation';
import Stopwatch from '../components/Stopwatch';
import Time from '../components/Time';
import UrdfVisualizer from '../components/UrdfVisualizer';
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import withPluginData from '../containers/withPluginData';
import { usePluginData } from '../contexts/PluginsData';

const PLUGINS = {
  UTC: 'UTC',
  MISSION_ELAPSED_TIME: 'Mission Elapsed Time',
  BATTERY_STATUS: 'Battery Status',
  ROVER_NAVCAM_1: 'Rover Navcam 1',
  ROVER_NAVCAM_2: 'Rover Navcam 2',
  BATTERY_VOLTAGE: 'Battery Voltage',
  OPERATIONS: 'Operations',
  BATTERY_CURRENT: 'Battery Current',
  BATTERY_TEMPERATURE: 'Battery Temperature',
  BATTERY_STATE_OF_CHARGE: 'Battery State of Charge',
  ORIENTATION: 'Orientation',
  URDF: 'URDF'
};

// TODO: delete
const todo = (arr) => (
  <div style={{ marginLeft: 10 }}>
    {arr.map((e) => (
      <div>
        <FormControlLabel control={<Checkbox />} label={e} />
      </div>
    ))}
  </div>
);
const TestLayout = () => {
  const StopwatchPlugin = withPluginData(Stopwatch, 'stopwatch');

  return (
    <ShowcaseLayout editable>
      <div key={PLUGINS.UTC} data-grid={{ x: 0, y: 0, w: 1, h: 2 }}>
        <Frame title={PLUGINS.UTC}>
          <Time />
        </Frame>
      </div>
      <div
        key={PLUGINS.MISSION_ELAPSED_TIME}
        data-grid={{ x: 1, y: 0, w: 2, h: 2 }}
      >
        <Frame title={PLUGINS.MISSION_ELAPSED_TIME}>
          <StopwatchPlugin />
        </Frame>
      </div>
      <div key={PLUGINS.BATTERY_STATUS} data-grid={{ x: 3, y: 0, w: 4, h: 9 }}>
        <Frame title={PLUGINS.ORIENTATION}>
          <RoverRotation />
        </Frame>
      </div>
      <div key={PLUGINS.ROVER_NAVCAM_1} data-grid={{ x: 0, y: 1, w: 3, h: 6 }}>
        <Frame title={PLUGINS.ROVER_NAVCAM_1}></Frame>
      </div>
      <div key={PLUGINS.ROVER_NAVCAM_2} data-grid={{ x: 3, y: 3, w: 3, h: 6 }}>
        <Frame title={PLUGINS.ROVER_NAVCAM_2}></Frame>
      </div>
      <div key={PLUGINS.BATTERY_VOLTAGE} data-grid={{ x: 6, y: 1, w: 3, h: 3 }}>
        <Frame title={PLUGINS.BATTERY_VOLTAGE}></Frame>
      </div>
      <div key={PLUGINS.OPERATIONS} data-grid={{ x: 0, y: 4, w: 8, h: 3 }}>
        <Frame title={PLUGINS.OPERATIONS}></Frame>
      </div>
      <div key={PLUGINS.BATTERY_CURRENT} data-grid={{ x: 0, y: 7, w: 3, h: 2 }}>
        <Frame title={PLUGINS.BATTERY_VOLTAGE}></Frame>
      </div>
      <div
        key={PLUGINS.BATTERY_TEMPERATURE}
        data-grid={{ x: 3, y: 7, w: 3, h: 2 }}
      >
        <Frame title={PLUGINS.BATTERY_TEMPERATURE}></Frame>
      </div>
      <div key={PLUGINS.URDF} data-grid={{ x: 7, y: 0, w: 5, h: 9 }}>
        <Frame title={PLUGINS.URDF} fixed>
          <UrdfVisualizer />
        </Frame>
      </div>
      <div
        key={PLUGINS.BATTERY_STATE_OF_CHARGE}
        data-grid={{ x: 6, y: 7, w: 3, h: 2 }}
      >
        <Frame title={PLUGINS.BATTERY_STATE_OF_CHARGE}></Frame>
      </div>
      <div key="todo" data-grid={{ x: 0, y: 3, w: 3, h: 8 }}>
        <Frame title="TODO">
          {todo([
            'Timer redux store',
            'Consider new window components',
            'Consider dnd to toolbox/sidebar',
            'react-grid: local storage',
            'urdf zoom out fix'
          ])}
        </Frame>
      </div>
      <div key="todo2" data-grid={{ x: 3, y: 2, w: 3, h: 8 }}>
        <Frame title="TODO - postponed">
          {todo([
            'Rostopic list',
            'turn on/off fetch ros data',
            'hoc: withRos (data provider)',
            'ros components: online/offline status'
          ])}
        </Frame>
      </div>
    </ShowcaseLayout>
  );
};

export default TestLayout;
