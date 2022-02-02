import clsx from 'clsx';
import { Box, Grid, Paper } from '@material-ui/core';
import { useStyles } from '../../views/DashboardView';

const Row = ({ children, height = 2 }) => {
  const classes = useStyles();
  return (
    <Grid
      className={classes[`fixedHeight${height}`]}
      container
      item
      spacing={1}
    >
      {children}
    </Grid>
  );
};

export default Row;
