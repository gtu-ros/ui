export const UI = {
  DRAWER_WIDTH: 240
};

export const simulation = {
  constants: {
    JOINT_STATES_TOPIC: '/joint_states',
    PANDA_EE_PARENT_LINK: 'polar_link6',
    WORLD_LINK: 'world',
    ROBOT_BASE_LINK: 'polar_link0'
  },
  config: {
    cameraPosition: { x: 3, y: 3, z: 3 }
  }
};

export const jointConfig = {
  hide: ['polar_finger_joint1', 'polar_finger_joint2', 'polar_hand_joint2'],
  movementStep: 0.0001,
  speed: {
    initialSpeed: 25,
    step: 5,
    min: 10,
    max: 125
  },
  period: 10,
  angles: {
    min: -180,
    max: 180
  },
  joints: {
    polar_joint1: {
      decrease: 'q',
      increase: 'w'
    },
    polar_joint2: {
      decrease: 'a',
      increase: 's'
    },
    polar_joint3: {
      decrease: 'z',
      increase: 'x'
    },
    polar_joint4: {
      decrease: 'e',
      increase: 'r'
    },
    polar_joint5: {
      decrease: 'd',
      increase: 'f'
    },
    polar_joint6: {
      decrease: 'c',
      increase: 'v'
    }
  }
};

export const cameraConfig = {
  ip: 'localhost',
  port: 8083,
  path: '/stream/player/',
  streams: ['cam1', 'cam2', 'cam3']
};

export const eventLoop = {
  timeout: 100
};
