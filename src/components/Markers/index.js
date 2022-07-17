import {
  TextField,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
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

const Markers = () => {
  const { register, handleSubmit } = useForm();
  const { data: initialCoordinates } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const { data, setData } = usePluginState(PLUGIN_KEYS.MARKERS);

  console.log({data});

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude',
    name: 'name'
  };

  const onSubmit = (submitData) => {
    // if (!initialCoordinates) {
    //   console.log('No initial coordinates');
    //   return;
    // }

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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            '& .MuiFormControl-root': { margin: 1, width: '100%' }
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              size="small"
              variant="outlined"
              label="Latitude"
              {...register(fields.latitude)}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Longitude"
              {...register(fields.longitude)}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Name"
              {...register(fields.name)}
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
                  <ListItemAvatar>
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
