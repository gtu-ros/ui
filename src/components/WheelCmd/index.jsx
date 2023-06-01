import { Box, Grid, Typography } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

export default () => {
  const data = [
    {
      name: 'CMD1',
      rpm: 1
    },
    {
      name: 'CMD2',
      rpm: 3
    },
    {
      name: 'CMD3',
      rpm: 9
    },
    {
      name: 'CMD4',
      rpm: 7
    }
  ];

  return (
    <Grid container spacing={2}>
      {data.map((x) => (
        <Grid item xs={6}>
          <RpmBar data={[x]} />
        </Grid>
      ))}
    </Grid>
  );
};

const RpmBar = ({ data }) => {
  const domain = [0, 12]; // min - max
  const { rpm } = data[0];

  const getColor = (x) => {
    if (x < 2) return '#0a2e50';
    if (x < 4) return '#02854f';
    if (x < 6) return '#b71103';
    if (x < 8) return '#5fbf05';
    return '#e95302';
  };

  return (
    <Box sx={{ height: 120, my: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={domain} />
          <Bar dataKey="rpm" fill={getColor(rpm)} />
        </BarChart>
      </ResponsiveContainer>
      {[`${rpm} RPM`, `${(rpm * 0.10472).toFixed(2)} m/s`].map((label) => (
        <div style={{ textAlign: 'center' }}>
          <Typography ml={6} fontWeight={600} variant="p" color="inherit">
            {label}
          </Typography>
        </div>
      ))}
    </Box>
  );
};
