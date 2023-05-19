import { Box, Slider, Typography } from '@mui/material';

const OrientationView = ({ children, title, angle }) => {
  return (
    <Box sx={{ width: '100%'}}>
      <Typography
        component="h2"
        variant="subtitle2"
        color="secondary"
        align="left"
        gutterBottom
      >
        {title}
      </Typography>

      <div
        style={{
          transform: `rotate(${angle}deg)`,
          width: '65%',
          maxWidth: 250,
          height: '270px',
          position: 'relative',
          margin: 'auto'
        }}
      >
        {children}
      </div>

      <div style={{ margin: 'auto', width: ' 80%', maxWidth: '400px' }}>
        <Slider
          value={angle}
          valueLabelDisplay="on"
          min={-180}
          max={180}
        />
      </div>
    </Box>
  );
};

export default OrientationView;