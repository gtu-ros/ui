import usePublisher from '../../hooks/usePublisher';

import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import { useEffect, useState } from 'react';
import { Button, Grid, Slider, Stack } from '@mui/material';
import { Box } from '@mui/system';

const DriveControls = () => {
  const [speed, setSpeed] = useState(0);
  const [driveData, setDriveData] = useState();
  const [publish] = usePublisher({
    name: '/teleop/cmd_vel',
    type: 'geometry_msgs/Twist'
  });

  const move = (dv, dt) => {
    publish({
      linear: { x: dv * speed, y: 0, z: 0 },
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
    <div>
      <Box pt={3} mx={6}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <Slider
            color={speed <= 1 ? 'primary' : 'warning'}
            value={speed}
            onChange={(e, v) => setSpeed(v)}
            valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={2}
          />
          <Box>{speed}</Box>
        </Stack>
      </Box>

      <Grid
        container
        spacing={5}
        justifyContent="space-around"
        alignItems="center"
        my={1}
      >
        <Grid item>
          <ReactNipple
            className="joystick"
            style={{
              display: 'inline-block',
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
        </Grid>
        <Grid item>
          <ReactNipple
            className="joystick"
            style={{
              display: 'inline-block',
              outline: `1px dashed ${controllerProps.options.color}`,
              width: controllerProps.width,
              height: controllerProps.height
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
      <Grid container spacing={5} justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            size="large"
            color="error"
            onClick={() => move(0, 0)}
          >
            STOP
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DriveControls;
