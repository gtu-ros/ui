var ROSLIB = require('roslib');
var ROS3D = require('ros3d');

var ros = new ROSLIB.Ros({
  url:
    'ws://' +
    process.env.REACT_APP_ROS_BRIDGE_URL +
    ':' +
    process.env.REACT_APP_ROS_BRIDGE_PORT
});

ros.on('connection', function () {
  console.log('Connected to websocket server.');
});

ros.on('error', function (error) {
  console.log('Error connecting to websocket server: ', error);
});

ros.on('close', function () {
  console.log('Connection to websocket server closed.');
});

var JointStatesListener = (topic) => {
  return new ROSLIB.Topic({
    ros: ros,
    name: topic,
    messageType: 'sensor_msgs/JointState'
  });
};

var tfClientToFrame = (fixedFrame, rate) => {
  return new ROSLIB.TFClient({
    ros: ros,
    fixedFrame: fixedFrame,
    angularThres: 0.001,
    transThres: 0.001,
    rate: rate
  });
};

var viewer3d = (divId, width, height, cameraPosition) => {
  return new ROS3D.Viewer({
    divID: divId,
    width: width,
    height: height,
    antialias: true,
    cameraPose: cameraPosition
  });
};

var markerClient = (tfClient, markerTopic, viewer3d) => {
  return new ROS3D.MarkerClient({
    ros: ros,
    tfClient: tfClient,
    topic: markerTopic,
    rootObject: viewer3d.scene
  });
};

var markerArrayClient = (tfClient, markerTopic, viewer3d) => {
  return new ROS3D.MarkerArrayClient({
    ros: ros,
    tfClient: tfClient,
    topic: markerTopic,
    rootObject: viewer3d.scene
  });
};

var urdfClient = (tfClient, viewer3d, path) => {
  return new ROS3D.UrdfClient({
    ros: ros,
    tfClient: tfClient,
    path: path,
    rootObject: viewer3d.scene
  });
};

var jogJoint = new ROSLIB.Topic({
  ros: ros,
  name: '/jog_joint',
  messageType: 'jog_msgs/JogJoint'
  //   messageType: 'jog_msgs.JogJoint'
});

var jogMessage = (jointName, delta) => {
  const idx = parseInt(jointName.slice(-1)) - 1;
  const deltas = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  deltas[idx] = delta;

  return new ROSLIB.Message({
    header: {
      frame_id: ''
    },
    joint_names: [
      'polar_joint1',
      'polar_joint2',
      'polar_joint3',
      'polar_joint4',
      'polar_joint5',
      'polar_joint6'
    ],
    deltas: deltas
  });
};

module.exports = {
  JointStatesListener,
  tfClientToFrame,
  viewer3d,
  markerClient,
  markerArrayClient,
  urdfClient,
  jogJoint,
  jogMessage
};
