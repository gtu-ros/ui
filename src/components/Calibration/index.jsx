import { TextField, Box, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import ROSLIB from 'roslib/src/RosLib';
import { useROS } from 'react-ros';

const Calibration = () => {
  const { register, handleSubmit } = useForm();
  const { data, setData } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const { ros } = useROS();

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude',
    head: 'head'
  };

  const isHeading = new ROSLIB.Param({
    ros: ros,
    name: 'datum'
  });

  const onSubmit = (submitData) => {
    const latitude = parseFloat(submitData[fields.latitude]);
    const longitude = parseFloat(submitData[fields.longitude]);
    const head = parseFloat(submitData[fields.head]);

    if (!latitude || !longitude || !head) {
      console.log('calibration: missing parameters', { latitude, longitude, head });
      return;
    }

    setData({ latitude, longitude, head });

    isHeading.set([latitude, longitude, head]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '100%' } }}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              value={data?.latitude}
              size="small"
              variant="outlined"
              label="Initial Latitude"
              {...register(fields.latitude)}
            />
            <TextField
              value={data?.longitude}
              size="small"
              variant="outlined"
              label="Initial Longitude"
              {...register(fields.longitude)}
            />
            <TextField
              value={data?.head}
              size="small"
              variant="outlined"
              label="Heading"
              {...register(fields.head)}
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
