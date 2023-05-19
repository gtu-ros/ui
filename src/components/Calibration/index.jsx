import { TextField, Box, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import ROSLIB from 'roslib/src/RosLib';
import { useROS } from 'react-ros';
import { fillFromClipboard } from '../../utils/utils';
import { ArrowCircleRight } from '@mui/icons-material';
import { useEffect } from 'react';

const inputProps = {
  size: 'small',
  variant: 'outlined',
  InputLabelProps: { shrink: true }
};

const Calibration = () => {
  const { data, setData } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const { register, handleSubmit, setValue } = useForm();
  const { ros } = useROS();

  useEffect(() => {
    if (data) {
      setValue('longitude', data.longitude);
      setValue('latitude', data.latitude);
    }
  }, [data?.longitude, data?.latitude]);

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude',
    head: 'head',
    headingCalibration: 'headingCalibration'
  };

  const isHeading = new ROSLIB.Param({
    ros: ros,
    name: 'datum'
  });

  const onSubmit = (submitData) => {
    const latitude = parseFloat(submitData[fields.latitude]);
    const longitude = parseFloat(submitData[fields.longitude]);
    const head = parseFloat(submitData[fields.head]);
    const headingCalibration =
      parseFloat(submitData[fields.headingCalibration]) || 0;

    if (!latitude || !longitude || !head) {
      console.log('calibration: missing parameters', {
        latitude,
        longitude,
        head
      });
      return;
    }

    setData({ latitude, longitude, head, headingCalibration });

    isHeading.set([latitude, longitude, head]);
  };

  const handleImport = async () => {
    const set = (x) => (y) => setValue(x, y);
    fillFromClipboard([set('latitude'), set('longitude')]);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'grid', m: 1 }}>
            <IconButton
              sx={{ marginRight: 'auto' }}
              color="secondary"
              onClick={handleImport}
            >
              <ArrowCircleRight />
            </IconButton>
            <Box
              sx={{
                flex: 1,
                gap: 2,
                my: 1,
                display: 'grid',
                '& .MuiTextField-root': { width: '100%' }
              }}
            >
              <TextField
                // value={data?.latitude}
                label="Initial Latitude"
                {...register(fields.latitude)}
                {...inputProps}
              />
              <TextField
                // value={data?.longitude}
                label="Initial Longitude"
                {...register(fields.longitude)}
                {...inputProps}
              />
              <TextField
                // value={data?.head}
                label="Heading"
                {...register(fields.head)}
                {...inputProps}
              />
              <TextField
                // value={data?.headingCalibration}
                label="Heading (Map)"
                {...register(fields.headingCalibration)}
                {...inputProps}
              />
            </Box>
            <Button
              size="small"
              sx={{ margin: 1 }}
              type="submit"
              variant="contained"
              startIcon={<GpsFixedIcon />}
            >
              Calibrate
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Calibration;
