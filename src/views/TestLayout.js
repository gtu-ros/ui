import React, { useRef } from 'react';
import Frame from '../components/Frame';

import ShowcaseLayout from '../components/Grid';
import { RoverRotation } from '../components/RoverRotation';
import Stopwatch from '../components/Stopwatch';
import Time from '../components/Time';
import UrdfVisualizer from '../components/UrdfVisualizer';
import { useResizeDetector } from 'react-resize-detector';

const COMPONENTS = {
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

const TestLayout = () => {
  return (
    <ShowcaseLayout editable>
      <div key={COMPONENTS.UTC} data-grid={{ x: 0, y: 0, w: 1, h: 2 }}>
        <Frame title={COMPONENTS.UTC}>
          <Time />
        </Frame>
      </div>
      <div
        key={COMPONENTS.MISSION_ELAPSED_TIME}
        data-grid={{ x: 1, y: 0, w: 2, h: 2 }}
      >
        <Frame title={COMPONENTS.MISSION_ELAPSED_TIME}>
          <Stopwatch />
        </Frame>
      </div>
      <div
        key={COMPONENTS.BATTERY_STATUS}
        data-grid={{ x: 3, y: 0, w: 4, h: 8 }}
      >
        <Frame title={COMPONENTS.ORIENTATION}>
          <RoverRotation />
        </Frame>
      </div>
      <div
        key={COMPONENTS.ROVER_NAVCAM_1}
        data-grid={{ x: 0, y: 1, w: 3, h: 6 }}
      >
        <Frame title={COMPONENTS.ROVER_NAVCAM_1}></Frame>
      </div>
      <div
        key={COMPONENTS.ROVER_NAVCAM_2}
        data-grid={{ x: 3, y: 1, w: 3, h: 6 }}
      >
        <Frame title={COMPONENTS.ROVER_NAVCAM_2}></Frame>
      </div>
      <div
        key={COMPONENTS.BATTERY_VOLTAGE}
        data-grid={{ x: 6, y: 1, w: 3, h: 3 }}
      >
        <Frame title={COMPONENTS.BATTERY_VOLTAGE}></Frame>
      </div>
      <div key={COMPONENTS.OPERATIONS} data-grid={{ x: 0, y: 4, w: 8, h: 3 }}>
        <Frame title={COMPONENTS.OPERATIONS}></Frame>
      </div>
      <div
        key={COMPONENTS.BATTERY_CURRENT}
        data-grid={{ x: 0, y: 7, w: 3, h: 2 }}
      >
        <Frame title={COMPONENTS.BATTERY_VOLTAGE}></Frame>
      </div>
      <div
        key={COMPONENTS.BATTERY_TEMPERATURE}
        data-grid={{ x: 3, y: 7, w: 3, h: 2 }}
      >
        <Frame title={COMPONENTS.BATTERY_TEMPERATURE}></Frame>
      </div>
      <div key={COMPONENTS.URDF} data-grid={{ x: 7, y: 0, w: 5, h: 8 }}>
        <Frame title={COMPONENTS.URDF} fixed>
          <UrdfVisualizer />
        </Frame>
      </div>
      <div
        key={COMPONENTS.BATTERY_STATE_OF_CHARGE}
        data-grid={{ x: 6, y: 7, w: 3, h: 2 }}
      >
        <Frame title={COMPONENTS.BATTERY_STATE_OF_CHARGE}></Frame>
      </div>
    </ShowcaseLayout>
  );
};

export default TestLayout;
