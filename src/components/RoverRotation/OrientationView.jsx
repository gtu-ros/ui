import { Grid, Slider, Typography } from '@mui/material';

const OrientationView = ({ title, img, angle }) => {
  return (
    <Grid xs={6}>
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
        <img
          src={img}
          style={{
            width: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <div style={{ margin: 'auto', width: ' 80%', maxWidth: '400px' }}>
        <Slider
          value={angle}
          valueLabelDisplay="on"
          min={-180}
          max={180}
        />
      </div>
    </Grid>
  );
};

export default OrientationView;