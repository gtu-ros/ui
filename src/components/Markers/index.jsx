import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  ListItemAvatar
} from '@mui/material';
import { useForm } from 'react-hook-form';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants';
import { gpsToOdom } from '../Waypoints/utils';
import { ShareLocation } from '@mui/icons-material';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { ArrowCircleRight } from '@mui/icons-material';
import { fillFromClipboard } from '../../utils/utils';

const inputProps = {
  size: 'small',
  variant: 'outlined',
  InputLabelProps: { shrink: true }
};

const Markers = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { data: initialCoordinates } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const { data, setData } = usePluginState(PLUGIN_KEYS.MARKERS);

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude',
    name: 'name'
  };

  const onSubmit = (submitData) => {
    const { x, y } = initialCoordinates
      ? gpsToOdom(
          {
            latitude: submitData[fields.latitude],
            longitude: submitData[fields.longitude]
          },
          initialCoordinates
        )
      : { x: null, y: null };

    const nextMarker = {
      x,
      y,
      name: submitData[fields.name],
      latitude: submitData[fields.latitude],
      longitude: submitData[fields.longitude]
    };
    console.log({ nextMarker });

    if (data?.markerList) {
      setData({ markerList: [...data.markerList, nextMarker] });
    } else {
      setData({ markerList: [nextMarker] });
    }

    console.log(x, y);
  };

  const getMarkerLabel = ({ latitude, longitude, x, y }) => {
    if (x && y)
      return `(${latitude}, ${longitude}) : (${x.toFixed(2)}, ${y.toFixed(2)})`;
    return `(${latitude}, ${longitude})`;
  };

  const handleImport = async () => {
    const set = (x) => (y) => setValue(x, y);
    fillFromClipboard([set('latitude'), set('longitude')]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            '& .MuiFormControl-root': { margin: 1, width: '100%' }
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <IconButton color="secondary" onClick={handleImport}>
              <ArrowCircleRight />
            </IconButton>
            <TextField
              label="Latitude"
              {...register(fields.latitude)}
              {...inputProps}
            />
            <TextField
              label="Longitude"
              {...register(fields.longitude)}
              {...inputProps}
            />
            <TextField
              label="Name"
              {...register(fields.name)}
              {...inputProps}
            />
            <IconButton sx={{ m: 1 }} type="submit" color="primary">
              <AddCircle />
            </IconButton>
          </Box>
        </Box>
      </form>

      <Box sx={{ display: 'flex' }}>
        <List sx={{ width: '100%' }}>
          {data?.markerList?.map(
            ({ latitude, longitude, x, y, name }, index) => (
              <>
                <Divider />
                <ListItem
                  secondaryAction={
                    <IconButton
                      onClick={() =>
                        setData({
                          markerList: [...data.markerList].filter(
                            (_, idx) => idx !== index
                          )
                        })
                      }
                      edge="end"
                    >
                      <RemoveCircle />
                    </IconButton>
                  }
                >
                  <ListItemAvatar
                    onClick={() =>
                      setData({ ...data, focused: { latitude, longitude } })
                    }
                  >
                    <Avatar>
                      <ShareLocation />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={getMarkerLabel({ latitude, longitude, x, y })}
                    secondary={name}
                  />
                </ListItem>
              </>
            )
          )}
          <Divider />
        </List>
      </Box>
    </div>
  );
};

export default Markers;
