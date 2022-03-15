import usePublisher from '../../hooks/usePublisher';

import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import { useState } from 'react';

const DriveControls = () => {
  const [driveData, setDriveData] = useState();
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
      <ReactNipple
        className="joystick"
        style={{
          outline: `1px dashed ${controllerProps.options.color}`,
          width: controllerProps.width,
          height: controllerProps.height
        }}
        options={controllerProps.options}
        onEnd={(evt, data) => {
          move(0, driveData?.angular || 0);
          setDriveData({ ...driveData, linear: 0 });
        }}
        onMove={(evt, data) => {
          if (data && data.direction && data.distance && data.angle) {
            const theta = data.angle.radian - 1.57;
            const dx = (Math.cos(theta) * data.distance) / 100;
            move(dx, driveData?.angular || 0);
            setDriveData({ ...driveData, linear: dx });
          }
        }}
      />
      <ReactNipple
        className="joystick"
        style={{
          outline: `1px dashed ${controllerProps.options.color}`,
          width: controllerProps.width,
          height: controllerProps.height
        }}
        options={controllerProps.options}
        onEnd={(evt, data) => {
          move(driveData?.linear || 0, 0);
          setDriveData({ ...driveData, angular: 0 });
        }}
        onMove={(evt, data) => {
          if (data && data.direction && data.distance && data.angle) {
            const theta = data.angle.radian - 1.57;
            const dx = (Math.sin(theta) * data.distance) / 100;
            move(driveData?.linear || 0, dx);
            setDriveData({ ...driveData, angular: dx });
          }
        }}
      />
    </>
  );
};

export default DriveControls;
