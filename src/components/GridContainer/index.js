import { Box, Grid } from '@material-ui/core';

const GridContainer = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {children}
      </Grid>
    </Box>
  );
};

export default GridContainer;
