import clsx from 'clsx';

import { useStyles } from './DashboardView';

import { Grid, Paper } from '@material-ui/core';
import { RoverRotation } from '../components/navigation/RoverRotation';
import { SpeedInfo } from '../components/navigation/SpeedInfo';
import { AutonomousMode } from '../components/navigation/AutonomousMode';

const NavigationDashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper4 = clsx(classes.paper, classes.fixedHeight4);
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={8} className={fixedHeightPaper4}>
          <RoverRotation />
        </Paper>
      </Grid>
      <Grid item xs={6} lg={3}>
        <Paper elevation={8} className={fixedHeightPaper2}>
          <SpeedInfo />
        </Paper>
      </Grid>
      <Grid item xs={6} lg={3}>
        <Paper elevation={8} className={fixedHeightPaper2}>
          <AutonomousMode />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NavigationDashboard;
