import usePublisher from '../../hooks/usePublisher';
import NippleController from './NippleController';

const DriveControls = () => {
  const [publish] = usePublisher({
    name: '/cmd_vel',
    type: 'geometry_msgs/Twist'
  });

  const move = (dv, dt) => {
    publish({
      linear: { x: dv, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: dt }
    });
  };

  const controllerProps = {
    width: 150,
    height: 150,
    options: {
      mode: 'static',
      color: 'blue',
      position: { top: '50%', left: '50%' }
    },
    style: { display: 'inline' }
  };

  return (
    <>
      <NippleController cmd_vel={move} {...controllerProps} />
      <NippleController cmd_vel={move} {...controllerProps} />
    </>
  );
};

export default DriveControls;
