import { Grid, Paper } from '@material-ui/core';

const Frame = ({ children, ...rest }) => {
  const { xs = 1 } = rest;

  return (
    <Grid item xs={xs} {...rest}>
      <Paper style={{ height: '100%' }} elevation={8}>
        {children}
      </Paper>
    </Grid>
  );
};

export default Frame;
