import { TextField, Box, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import ROSLIB from 'roslib/src/RosLib';
import { useROS } from 'react-ros';
import { fillFromClipboard } from '../../utils/utils';
import { ArrowCircleRight } from '@mui/icons-material';

const inputProps = {
  size: 'small',
  variant: 'outlined',
  InputLabelProps: { shrink: true }
};


const Calibration = () => {
  const { register, handleSubmit, setValue } = useForm();
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

  const handleImport = async () => {
    const set = (x) => (y) => setValue(x, y);
    fillFromClipboard([set('latitude'), set('longitude')]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '100%' } }}>
          <Box sx={{ display: 'flex' }}>
          <IconButton color="secondary" onClick={handleImport}>
            <ArrowCircleRight />
          </IconButton>
            <TextField
              value={data?.latitude}
              label="Initial Latitude"
              {...register(fields.latitude)}
              {...inputProps}
            />
            <TextField
              value={data?.longitude}
              label="Initial Longitude"
              {...register(fields.longitude)}
              {...inputProps}
            />
            <TextField
              value={data?.head}
              label="Heading"
              {...register(fields.head)}
              {...inputProps}
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
