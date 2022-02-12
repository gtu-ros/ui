import clsx from 'clsx';

import { Grid, Paper } from '@mui/material';
import { RoverRotation } from '../components/RoverRotation';
import { SpeedInfo } from '../components/navigation/SpeedInfo';
import { AutonomousMode } from '../components/navigation/AutonomousMode';

const NavigationDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={8} >
          <RoverRotation />
        </Paper>
      </Grid>
      <Grid item xs={6} lg={3}>
        <Paper elevation={8} >
          <SpeedInfo />
        </Paper>
      </Grid>
      <Grid item xs={6} lg={3}>
        <Paper elevation={8} >
          <AutonomousMode />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NavigationDashboard;
