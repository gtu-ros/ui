import usePublisher from '../../hooks/usePublisher';

import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import { useEffect, useState } from 'react';
import { Button, Grid, Slider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { RotateLeft, Speed } from '@mui/icons-material';

const DriveControls = () => {
  const [linearSpeed, setLinearSpeed] = useState(0);
  const [angularSpeed, setAngularSpeed] = useState(0);
  const [driveData, setDriveData] = useState();
  const [publish] = usePublisher({
    name: '/teleop/cmd_vel',
    type: 'geometry_msgs/Twist'
  });

  const move = (dv, dt) => {
    publish({
      linear: { x: dv * linearSpeed, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: dt * angularSpeed }
    });
  };

  const controllerProps = {
    options: {
      mode: 'static',
      color: 'blue',
      position: { top: '50%', left: '50%' }
    },
    style: { margin: 'auto', width: 150, height: 150 }
  };

  const colorBySpeed = (speed) => {
    if (speed <= 1.5) return 'primary';
    if (speed <= 2.5) return 'warning';
    return 'error';
  };

  return (
    <div>
      <Box pt={3} mx={6}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Speed />
          <Slider
            color={colorBySpeed(linearSpeed)}
            value={linearSpeed}
            onChange={(e, v) => setLinearSpeed(v)}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={4}
          />
          <Box>{linearSpeed}</Box>
        </Stack>
      </Box>

      <Box mx={6}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <RotateLeft />
          <Slider
            color={colorBySpeed(angularSpeed)}
            value={angularSpeed}
            onChange={(e, v) => setAngularSpeed(v)}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={4}
          />
          <Box>{angularSpeed}</Box>
        </Stack>
      </Box>

      <Grid
        container
        spacing={5}
        justifyContent="space-around"
        alignItems="center"
      >
        <Grid item xs={5}>
          <ReactNipple
            className="joystick"
            style={{
              ...controllerProps.style,
              outline: `1px dashed ${controllerProps.options.color}`
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
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => move(0, 0)}
          >
            STOP
          </Button>
        </Grid>
        <Grid item xs={5}>
          <ReactNipple
            className="joystick"
            style={{
              ...controllerProps.style,
              outline: `1px dashed ${controllerProps.options.color}`
            }}
            options={controllerProps.options}
            onEnd={(evt, data) => {
              console.log('end', driveData?.linear || 0, 0);
              move(driveData?.linear || 0, 0);
              setDriveData({ ...driveData, angular: 0 });
            }}
            onMove={(evt, data) => {
              if (data && data.direction && data.distance && data.angle) {
                const theta = data.angle.radian - 1.57;
                const dx = (Math.sin(theta) * data.distance) / 100;
                move(driveData?.linear || 0, dx);
                console.log('move', driveData?.linear || 0, dx);
                setDriveData({ ...driveData, angular: dx });
              }
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DriveControls;
