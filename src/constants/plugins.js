import NavigationMap from '../components/Map';
import RosConnection from '../components/RosConnection';
import RostopicEcho from '../components/RostopicEcho';
import RostopicList from '../components/RostopicList';
import { RoverRotation } from '../components/RoverRotation';
import Stopwatch from '../components/Stopwatch';
import Time from '../components/Time';
import UrdfVisualizer from '../components/UrdfVisualizer';

import withPluginData from '../containers/withPluginData';

// title is used for key as well, make sure it is uniqe.

export const PLUGINS = {
  UTC: { title: 'UTC', component: Time },
  MISSION_ELAPSED_TIME: {
    title: 'Mission Elapsed Time',
    component: withPluginData(Stopwatch, 'stopwatch')
  },
  BATTERY_STATUS: { title: 'Battery Status' },
  ROVER_NAVCAM_1: { title: 'Rover Navcam 1' },
  ROVER_NAVCAM_2: { title: 'Rover Navcam 2' },
  BATTERY_VOLTAGE: { title: 'Battery Voltage' },
  OPERATIONS: { title: 'Operations' },
  BATTERY_CURRENT: { title: 'Battery Current' },
  BATTERY_TEMPERATURE: { title: 'Battery Temperature' },
  BATTERY_CHARGE: { title: 'Battery State of Charge' },
  ORIENTATION: { title: 'Orientation', component: RoverRotation },
  URDF: { title: 'URDF', component: UrdfVisualizer, fixed: true },
  ROS_CONNECTION: { title: 'Ros Connection Status ', component: RosConnection },
  ROSTOPIC_ECHO: { title: 'Rostopic Echo', component: RostopicEcho },
  ROSTOPIC_LIST: { title: 'Rostopic List', component: RostopicList, fixed: true },
  MAP: { title: 'Map', component: NavigationMap, fixed: true }
};

export const MAIN_LAYOUT = [
  { plugin: PLUGINS.UTC, layout: { x: 0, y: 0, w: 1, h: 2 } },
  { plugin: PLUGINS.MISSION_ELAPSED_TIME, layout: { x: 1, y: 0, w: 2, h: 2 } },
  { plugin: PLUGINS.ORIENTATION, layout: { x: 3, y: 0, w: 4, h: 9 } },
//   { plugin: PLUGINS.ROVER_NAVCAM_2, layout: { x: 0, y: 1, w: 3, h: 6 } },
//   { plugin: PLUGINS.BATTERY_VOLTAGE, layout: { x: 3, y: 3, w: 3, h: 6 } },
//   { plugin: PLUGINS.OPERATIONS, layout: { x: 0, y: 4, w: 8, h: 3 } },
//   { plugin: PLUGINS.BATTERY_CURRENT, layout: { x: 6, y: 1, w: 3, h: 3 } },
//   { plugin: PLUGINS.BATTERY_TEMPERATURE, layout: { x: 0, y: 7, w: 3, h: 2 } },
//   { plugin: PLUGINS.BATTERY_CHARGE, layout: { x: 6, y: 7, w: 3, h: 2 } },
  { plugin: PLUGINS.URDF, layout: { x: 7, y: 0, w: 5, h: 9 } },
  { plugin: PLUGINS.ROS_CONNECTION, layout: { x: 0, y: 2, w: 3, h: 2 } },
  { plugin: PLUGINS.ROSTOPIC_ECHO, layout: { x: 0, y: 3, w: 3, h: 9 } },
  { plugin: PLUGINS.ROSTOPIC_LIST, layout: { x: 3, y: 0, w: 4, h: 9 } },
  { plugin: PLUGINS.MAP, layout: { x: 7, y: 0, w: 5, h: 9 } }
];
