import clsx from 'clsx';

import { JointStates } from '../components/roboticArm/JointStates';
import { TransformClient } from '../components/roboticArm/TransformClient';
import { simulation } from '../utils/constants';
import { Grid, Paper } from '@mui/material';

const RoboticArmDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={8}>
          <JointStates topic={simulation.constants.JOINT_STATES_TOPIC} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={8}>
          <TransformClient
            targetFrame={simulation.constants.WORLD_LINK}
            sourceFrame={simulation.constants.PANDA_EE_PARENT_LINK}
            tfRate={10}
          />
        </Paper>
      </Grid>
      {/* <Grid item xs={4}>
        <Paper elevation={8} className={fixedHeightPaper}>
        </Paper>
      </Grid> */}
    </Grid>
  );
};

export default RoboticArmDashboard;
