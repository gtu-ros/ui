import Calibration from '../components/Calibration';
import NavigationMap from '../components/Map';
import DummyDataChart from '../components/MultiChannelChart/DummyDataChart';
import JointStates from '../components/JointStates';
import RosConnection from '../components/RosConnection';
import RosMessagePublisher from '../components/RosMessagePublisher';
import RostopicEcho from '../components/RostopicEcho';
import RostopicList from '../components/RostopicList';
import { RoverRotation } from '../components/RoverRotation';
import FossilTable from '../components/ScienceTables/FossilTable';
import SpeedChart from '../components/SpeedChart';
import Stopwatch from '../components/Stopwatch';
import Time from '../components/Time';
import UrdfVisualizer from '../components/UrdfVisualizer';
import withPluginData from '../containers/withPluginData';
import { PLUGIN_DATA_KEYS } from '../contexts/PluginsData';

export const PLUGIN_KEYS = {
  STOPWATCH: 'STOPWATCH',
  UTC: 'UTC',
  MISSION_ELAPSED_TIME: 'MISSION_ELAPSED_TIME',
  BATTERY_STATUS: 'BATTERY_STATUS',
  ROVER_NAVCAM_1: 'ROVER_NAVCAM_1',
  ROVER_NAVCAM_2: 'ROVER_NAVCAM_2',
  BATTERY_VOLTAGE: 'BATTERY_VOLTAGE',
  OPERATIONS: 'OPERATIONS',
  BATTERY_CURRENT: 'BATTERY_CURRENT',
  BATTERY_TEMPERATURE: 'BATTERY_TEMPERATURE',
  BATTERY_CHARGE: 'BATTERY_CHARGE',
  ORIENTATION: 'ORIENTATION',
  URDF: 'URDF',
  ROS_CONNECTION: 'ROS_CONNECTION',
  CALIBRATION: 'CALIBRATION',
  ROSTOPIC_ECHO: 'ROSTOPIC_ECHO',
  ROSTOPIC_LIST: 'ROSTOPIC_LIST',
  MAP: 'MAP',
  MESSAGE_PUBLISHER: 'MESSAGE_PUBLISHER',
  SPEED_CHART: 'SPEED_CHART',
  FOSSIL_TABLE: 'FOSSIL_TABLE',
  MULTICHANNEL_CHART: 'MULTICHANNEL_CHART',
  JOINT_STATES: 'JOINT_STATES'
};

export const PLUGINS = {
  [PLUGIN_KEYS.UTC]: { title: 'UTC', component: Time },
  [PLUGIN_KEYS.MISSION_ELAPSED_TIME]: {
    title: 'Mission Elapsed Time',
    component: withPluginData(Stopwatch, PLUGIN_DATA_KEYS.STOPWATCH)
  },
  [PLUGIN_KEYS.BATTERY_STATUS]: { title: 'Battery Status' },
  [PLUGIN_KEYS.ROVER_NAVCAM_1]: { title: 'Rover Navcam 1' },
  [PLUGIN_KEYS.ROVER_NAVCAM_2]: { title: 'Rover Navcam 2' },
  [PLUGIN_KEYS.BATTERY_VOLTAGE]: { title: 'Battery Voltage' },
  [PLUGIN_KEYS.OPERATIONS]: { title: 'Operations' },
  [PLUGIN_KEYS.BATTERY_CURRENT]: { title: 'Battery Current' },
  [PLUGIN_KEYS.BATTERY_TEMPERATURE]: { title: 'Battery Temperature' },
  [PLUGIN_KEYS.BATTERY_CHARGE]: { title: 'Battery State of Charge' },
  [PLUGIN_KEYS.ORIENTATION]: { title: 'Orientation', component: RoverRotation },
  [PLUGIN_KEYS.URDF]: { title: 'URDF', component: UrdfVisualizer, fixed: true },
  [PLUGIN_KEYS.ROS_CONNECTION]: {
    title: 'Ros Connection Status ',
    component: RosConnection
  },
  [PLUGIN_KEYS.CALIBRATION]: { title: 'Calibration', component: Calibration },
  [PLUGIN_KEYS.ROSTOPIC_ECHO]: {
    title: 'Rostopic Echo',
    component: withPluginData(RostopicEcho, PLUGIN_DATA_KEYS.ROSTOPIC_ECHO)
  },
  [PLUGIN_KEYS.ROSTOPIC_LIST]: {
    title: 'Rostopic List',
    component: RostopicList,
    fixed: true
  },
  [PLUGIN_KEYS.MAP]: { title: 'Map', component: NavigationMap, fixed: true },
  [PLUGIN_KEYS.MESSAGE_PUBLISHER]: {
    title: 'ROS Message Publisher',
    component: RosMessagePublisher
  },
  [PLUGIN_KEYS.SPEED_CHART]: {
    title: 'Speed (/wheel_odom)',
    component: SpeedChart
  },
  [PLUGIN_KEYS.FOSSIL_TABLE]: {
    title: 'Fossils',
    component: FossilTable,
    fixed: true
  },
  [PLUGIN_KEYS.MULTICHANNEL_CHART]: {
    title: 'Multi-Channel Chart',
    component: DummyDataChart
  },
  [PLUGIN_KEYS.JOINT_STATES]: {
    title: 'Joint States',
    component: JointStates
  }
};

const plugin = (key, layout) => ({
  plugin: PLUGINS[key],
  layout,
  key
});

export const MAIN_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  plugin(PLUGIN_KEYS.ORIENTATION, { x: 3, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.URDF, { x: 7, y: 0, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 4, w: 3, h: 9 }),
  plugin(PLUGIN_KEYS.CALIBRATION, { x: 0, y: 13, w: 3, h: 5 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_LIST, { x: 3, y: 9, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.MAP, { x: 7, y: 9, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.SPEED_CHART, { x: 7, y: 18, w: 5, h: 7 }),
  plugin(PLUGIN_KEYS.MESSAGE_PUBLISHER, { x: 7, y: 25, w: 2, h: 3 }),
  plugin(PLUGIN_KEYS.MULTICHANNEL_CHART, { x: 0, y: 18, w: 7, h: 13 })
];

export const ROBOTIC_ARM_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  plugin(PLUGIN_KEYS.URDF, { x: 3, y: 0, w: 7, h: 11 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 3, w: 3, h: 9 }),
  plugin(PLUGIN_KEYS.JOINT_STATES, { x: 0, y: 4, w: 9, h: 8 })
];

export const NAVIGATION_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  plugin(PLUGIN_KEYS.ORIENTATION, { x: 3, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.MAP, { x: 7, y: 0, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 3, w: 3, h: 9 }),
  plugin(PLUGIN_KEYS.MESSAGE_PUBLISHER, { x: 0, y: 6, w: 3, h: 3 }),
  plugin(PLUGIN_KEYS.SPEED_CHART, { x: 3, y: 9, w: 6, h: 7 })
];

export const SCIENCE_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  plugin(PLUGIN_KEYS.MAP, { x: 7, y: 0, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.MULTICHANNEL_CHART, { x: 0, y: 6, w: 7, h: 13 }),
  plugin(PLUGIN_KEYS.FOSSIL_TABLE, { x: 0, y: 10, w: 10, h: 13 })
];
