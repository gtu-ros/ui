import { Grid, Paper, Stack, Typography } from '@mui/material';

const SensorCard = ({ color, title, value, unit, icon }) => (
  <Paper variant="outlined" sx={{ backgroundColor: color[50] }}>
    <Stack spacing={0.5} m={2}>
      <Grid container alignItems="center" justifyContent={'space-between'}>
        <Grid item>
          <Typography fontWeight={600} variant="p" color="textSecondary">
            {title}
          </Typography>
        </Grid>
        <Grid color={color[200]} item>
          {icon}
        </Grid>
      </Grid>

      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {value}
          </Typography>
        </Grid>
        <Grid item>
          <Typography ml={1} variant="h6" color="textSecondary">
            {unit}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  </Paper>
);

SensorCard.defaultProps = {
  color: 'primary'
};

export default SensorCard;
