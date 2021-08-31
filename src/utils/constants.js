const simulation = {
  constants: {
    JOINT_STATES_TOPIC: '/joint_states',
    PANDA_EE_PARENT_LINK: 'polar_link6',
    WORLD_LINK: 'world',
    ROBOT_BASE_LINK: 'polar_link0'
  },
  config: {
    tfRate: 25,
    width: 900,
    height: 680,
    cameraPosition: { x: 3, y: 3, z: 3 }
  }
};

const jointConfig = {
  hide: ['polar_finger_joint1', 'polar_finger_joint2', 'polar_hand_joint2'],
  movementStep: 0.01,
  joints: {
    polar_joint1: {
      increase: 'q',
      decrease: 'w'
    },
    polar_joint2: {
      increase: 'e',
      decrease: 'r'
    }
  }
};

const eventLoop = {
  timeout: 100
};

module.exports = {
  simulation,
  eventLoop,
  jointConfig
};
