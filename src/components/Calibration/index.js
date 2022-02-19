import { TextField, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const Calibration = () => {
  const { register, handleSubmit } = useForm();

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude'
  };

  const onSubmit = (data) => {
    const log = (field) => {
      console.log(data[field]);
    };
    log(fields.latitude);
    log(fields.longitude);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '100%' } }}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              size="small"
              variant="outlined"
              label="Initial Latitude"
              {...register(fields.latitude)}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Initial Longitude"
              {...register(fields.longitude)}
            />
          </Box>
          <Button
            size="small"
            sx={{ margin: 1, float: 'right' }}
            type="submit"
            variant="contained"
            startIcon={<GpsFixedIcon />}
          >
            Calibrate
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Calibration;
