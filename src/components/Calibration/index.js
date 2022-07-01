import { TextField, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';

const Calibration = () => {
  const { register, handleSubmit } = useForm();
  const { setData } = usePluginState(PLUGIN_KEYS.CALIBRATION);

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude'
  };

  const onSubmit = (submitData) => {
    setData({
      latitude: submitData[fields.latitude],
      longitude: submitData[fields.longitude]
    });
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
