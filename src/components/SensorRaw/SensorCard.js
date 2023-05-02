import { Grid, Paper, Stack, Typography } from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const SensorCard = ({ color, title, value, unit, icon, data }) => (
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

      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={data.slice(-120)} scrollable={true}>
          <XAxis dataKey="name" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          {title === 'Temperature' && <Line type="natural" dataKey="temp" stroke={color[500]} dot={false} />}
          {title === 'Relative Humidity' && <Line type="natural" dataKey="humidity" stroke={color[500]} dot={false} />}
          {title === 'Barometric Pressure' && <Line type="natural" dataKey="pressure" stroke={color[500]} dot={false} />}
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  </Paper>
);

SensorCard.defaultProps = {
  color: 'primary'
};

export default SensorCard;
