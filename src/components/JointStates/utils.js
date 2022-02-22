import { Message } from 'roslib';

export const jogMessage = (jointName, delta) => {
  const idx = parseInt(jointName.slice(-1)) - 1;
  const deltas = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
  deltas[idx] = delta;

  return new Message({
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
