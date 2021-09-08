import clsx from 'clsx';

import { JointStates } from '../components/roboticArm/JointStates';
import { TransformClient } from '../components/roboticArm/TransformClient';
import { simulation } from '../utils/constants';

import { useStyles } from './DashboardView';

import { Grid, Paper } from '@material-ui/core';

const RoboticArmDashboard = () => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight4);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={8} className={fixedHeightPaper}>
          <JointStates topic={simulation.constants.JOINT_STATES_TOPIC} />
        </Paper>
        <br />
        <Paper elevation={8} className={fixedHeightPaper}>
          <TransformClient
            targetFrame={simulation.constants.WORLD_LINK}
            sourceFrame={simulation.constants.PANDA_EE_PARENT_LINK}
            tfRate={10}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RoboticArmDashboard;
