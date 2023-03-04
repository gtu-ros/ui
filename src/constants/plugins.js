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
import ImuAccelerationChart from '../components/Chart/ImuAccelerationChart';
import GpsVelocityChart from '../components/Chart/GpsVelocityChart';
import Stopwatch from '../components/Stopwatch';
import Time from '../components/Time';
import UrdfVisualizer from '../components/UrdfVisualizer';
import withPluginData from '../containers/withPluginData';
import { PLUGIN_DATA_KEYS } from '../contexts/PluginsData';
import RocksTable from '../components/ScienceTables/RocksTable';
import MeteroitsTable from '../components/ScienceTables/MeteroitsTable';
import Rosout from '../components/Rosout';
import Waypoints from '../components/Waypoints';
import Markers from '../components/Markers';
import {
  ZedImage,
  Navcam1,
  Navcam2
} from '../components/VideoStream/RosCameras';
import DriveControls from '../components/DriveControls';
import BluetoothInquiry from '../components/BluetoothInquiry';
import { PLUGIN_KEYS, PLUGIN_TYPES } from '.';
import SensorRaw from '../components/SensorRaw';
import StartStop from '../components/StartStop';
import GraphChart from '../components/GraphChart';
import FtırGraph from '../components/FtırGraph';

export const PLUGINS = {
  [PLUGIN_KEYS.UTC]: { title: 'UTC', component: Time },
  [PLUGIN_KEYS.START_STOP]: { title: 'Start Stop', component: StartStop },
  [PLUGIN_KEYS.MISSION_ELAPSED_TIME]: {
    title: 'Mission Elapsed Time',
    component: withPluginData(Stopwatch, PLUGIN_DATA_KEYS.STOPWATCH)
  },
  [PLUGIN_KEYS.BATTERY_STATUS]: { title: 'Battery Status' },
  [PLUGIN_KEYS.BATTERY_VOLTAGE]: { title: 'Battery Voltage' },
  [PLUGIN_KEYS.OPERATIONS]: { title: 'Operations' },
  [PLUGIN_KEYS.BATTERY_CURRENT]: { title: 'Battery Current' },
  [PLUGIN_KEYS.BATTERY_TEMPERATURE]: { title: 'Battery Temperature' },
  [PLUGIN_KEYS.BATTERY_CHARGE]: { title: 'Battery State of Charge' },
  [PLUGIN_KEYS.ORIENTATION]: {
    title: 'Orientation',
    component: RoverRotation,
    type: PLUGIN_TYPES.ROS
  },
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
    title: 'Move Base Goal',
    component: RosMessagePublisher
  },
  [PLUGIN_KEYS.SPEED_CHART]: {
    title: 'Linear Speed',
    component: GpsVelocityChart
  },
  [PLUGIN_KEYS.ACCELERATION_CHART]: {
    title: 'Linear Acceleration',
    component: ImuAccelerationChart
  },
  [PLUGIN_KEYS.FOSSIL_TABLE]: {
    title: 'Fossils',
    component: FossilTable,
    fixed: true
  },
  [PLUGIN_KEYS.ROCKS_TABLE]: {
    title: 'Rocks',
    component: RocksTable,
    fixed: true
  },
  [PLUGIN_KEYS.METEROITS_TABLE]: {
    title: 'Meteroits',
    component: MeteroitsTable,
    fixed: true
  },
  [PLUGIN_KEYS.MULTICHANNEL_CHART]: {
    title: 'Sensors',
    component: DummyDataChart
  },
  [PLUGIN_KEYS.JOINT_STATES]: {
    title: 'Joint States',
    component: JointStates
  },
  [PLUGIN_KEYS.ROSOUT]: {
    title: 'Rosout',
    component: Rosout
  },
  [PLUGIN_KEYS.ZED_IMAGE]: {
    title: 'Zed Image',
    component: ZedImage
  },
  [PLUGIN_KEYS.NAVCAM_1]: {
    title: 'Cam 1',
    component: Navcam1
  },
  [PLUGIN_KEYS.NAVCAM_2]: {
    title: 'Navcam 2',
    component: Navcam2
  },
  [PLUGIN_KEYS.WAYPOINTS]: {
    title: 'Waypoints',
    component: Waypoints
  },
  [PLUGIN_KEYS.MARKERS]: {
    title: 'Markers',
    component: Markers
  },
  [PLUGIN_KEYS.DRIVE_CONTROLS]: {
    title: 'Drive Controls',
    component: DriveControls
  },
  [PLUGIN_KEYS.BLUETOOTH_INQUIRY]: {
    title: 'Bluetooth Inquiry',
    component: BluetoothInquiry
  },
  [PLUGIN_KEYS.SENSOR_RAW]: {
    title: 'Sensor Raw',
    component: SensorRaw
  },
  [PLUGIN_KEYS.GRAPH_CHART]: {
    title: 'Graph Chart',
    component: GraphChart
  },
  [PLUGIN_KEYS.FTIR_GRAPH]: {
    title: 'Ftır Graph',
    component: FtırGraph
  }
};

export const getPluginType = (pluginKey) => {
  return Object.values(PLUGINS).filter((plugin) => pluginKey == plugin.type);
};

const plugin = (key, layout) => ({
  plugin: PLUGINS[key],
  layout,
  key
});

// export const MAIN_LAYOUT = [
//   plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
//   plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
//   // plugin(PLUGIN_KEYS.URDF, { x: 7, y: 0, w: 5, h: 13 }),
//   plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
//   plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 4, w: 3, h: 9 }),
//   plugin(PLUGIN_KEYS.ROSTOPIC_LIST, { x: 3, y: 9, w: 4, h: 13 }),
//   plugin(PLUGIN_KEYS.ROSOUT, { x: 0, y: 18, w: 6, h: 9 }),
//   plugin(PLUGIN_KEYS.ZED_IMAGE, { x: 6, y: 9, w: 6, h: 11 })
// ];

export const MAIN_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.START_STOP, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  // plugin(PLUGIN_KEYS.URDF, { x: 7, y: 0, w: 5, h: 13 }),
  plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_LIST, { x: 0, y: 9, w: 3, h: 5 }),
  plugin(PLUGIN_KEYS.ROSOUT, { x: 0, y: 18, w: 6, h: 9 }),
  plugin(PLUGIN_KEYS.BLUETOOTH_INQUIRY, { x: 0, y: 18, w: 4, h: 7 }),
  plugin(PLUGIN_KEYS.ZED_IMAGE, { x: 7, y: 0, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.NAVCAM_1, { x: 8, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.SPEED_CHART, { x: 7, y: 9, w: 6, h: 9 }),
  plugin(PLUGIN_KEYS.ORIENTATION, { x: 3, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.NAVCAM_2, { x: 8, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.SENSOR_RAW, { x: 8, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.GRAPH_CHART, { x: 8, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 20, w: 3, h: 9 })
];

export const ROBOTIC_ARM_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  plugin(PLUGIN_KEYS.URDF, { x: 3, y: 0, w: 7, h: 11 }),
  // plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 3, w: 3, h: 9 }),
  plugin(PLUGIN_KEYS.JOINT_STATES, { x: 0, y: 4, w: 9, h: 8 }),
  plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
  plugin(PLUGIN_KEYS.NAVCAM_1, { x: 8, y: 0, w: 4, h: 9 }),
  // plugin(PLUGIN_KEYS.NAVCAM_2, { x: 8, y: 0, w: 4, h: 9 }),
  // plugin(PLUGIN_KEYS.ZED_IMAGE, { x: 8, y: 0, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.ROSOUT, { x: 0, y: 18, w: 6, h: 9 })
];

export const NAVIGATION_LAYOUT = [
  plugin(PLUGIN_KEYS.UTC, { x: 0, y: 0, w: 1, h: 2 }),
  plugin(PLUGIN_KEYS.MISSION_ELAPSED_TIME, { x: 1, y: 0, w: 2, h: 2 }),
  plugin(PLUGIN_KEYS.ORIENTATION, { x: 0, y: 6, w: 3, h: 9 }),
  plugin(PLUGIN_KEYS.MAP, { x: 3, y: 0, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
  plugin(PLUGIN_KEYS.ROSTOPIC_ECHO, { x: 0, y: 11, w: 3, h: 5 }),
  plugin(PLUGIN_KEYS.CALIBRATION, { x: 0, y: 5, w: 3, h: 4 }),
  plugin(PLUGIN_KEYS.MARKERS, { x: 3, y: 5, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.WAYPOINTS, { x: 3, y: 5, w: 5, h: 9 }),
  plugin(PLUGIN_KEYS.MESSAGE_PUBLISHER, { x: 8, y: 6, w: 4, h: 7 }),
  // plugin(PLUGIN_KEYS.SPEED_CHART, { x: 3, y: 9, w: 5, h: 7 }),
  plugin(PLUGIN_KEYS.ACCELERATION_CHART, { x: 3, y: 9, w: 5, h: 7 }),
  plugin(PLUGIN_KEYS.ZED_IMAGE, { x: 8, y: 0, w: 4, h: 9 }),
  // plugin(PLUGIN_KEYS.NAVCAM_2, { x: 8, y: 1, w: 4, h: 9 })
  plugin(PLUGIN_KEYS.SPEED_CHART, { x: 8, y: 1, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.ROSOUT, { x: 0, y: 18, w: 6, h: 9 }),
  // plugin(PLUGIN_KEYS.ZED_IMAGE, { x: 8, y: 1, w: 4, h: 9 })
];

export const SCIENCE_LAYOUT = [
  plugin(PLUGIN_KEYS.MULTICHANNEL_CHART, { x: 0, y: 6, w: 12, h: 13 }),
  plugin(PLUGIN_KEYS.NAVCAM_2, { x: 8, y: 1, w: 4, h: 9 }),
  plugin(PLUGIN_KEYS.FOSSIL_TABLE, { x: 0, y: 10, w: 12, h: 13 }),
  plugin(PLUGIN_KEYS.ROCKS_TABLE, { x: 0, y: 10, w: 12, h: 13 }),
  plugin(PLUGIN_KEYS.METEROITS_TABLE, { x: 0, y: 10, w: 12, h: 7 }),
  plugin(PLUGIN_KEYS.ROS_CONNECTION, { x: 0, y: 2, w: 3, h: 2 }),
  plugin(PLUGIN_KEYS.FTIR_GRAPH, { x: 8, y: 0, w: 4, h: 9 }),
];
