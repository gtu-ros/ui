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
import { PLUGIN_KEYS } from '../../constants/plugins';
import { gpsToOdom } from './utils';
import { ShareLocation } from '@mui/icons-material';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';

const Waypoints = () => {
  const { register, handleSubmit } = useForm();
  const { data: initialCoordinates } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const { data, setData } = usePluginState(PLUGIN_KEYS.WAYPOINTS);

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude',
    type: 'type'
  };

  const onSubmit = (submitData) => {
    if (!initialCoordinates) {
      console.log('No initial coordinates');
      return;
    }

    const { x, y } = gpsToOdom(
      {
        latitude: submitData[fields.latitude],
        longitude: submitData[fields.longitude]
      },
      initialCoordinates
    );

    const nextWaypoint = {
      x,
      y,
      type: submitData[fields.type],
      latitude: submitData[fields.latitude],
      longitude: submitData[fields.longitude]
    };
    console.log({ nextWaypoint });

    if (data?.waypointList) {
      setData({ waypointList: [...data.waypointList, nextWaypoint] });
    } else {
      setData({ waypointList: [nextWaypoint] });
    }

    console.log(x, y);
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
            <FormControl size="small">
              <Select {...register(fields.type)}>
                <MenuItem value={'gate'}>Gate</MenuItem>
                <MenuItem value={'post'}>Post</MenuItem>
                <MenuItem value={'no-vision'}>No vision</MenuItem>
              </Select>
            </FormControl>
            <IconButton sx={{ m: 1 }} type="submit" color="primary">
              <AddCircle />
            </IconButton>
          </Box>
        </Box>
      </form>

      <Box sx={{ display: 'flex' }}>
        <List sx={{ width: '100%' }}>
          {data?.waypointList.map(
            ({ latitude, longitude, x, y, type }, index) => (
              <>
                <Divider />
                <ListItem
                  secondaryAction={
                    <IconButton
                      onClick={() =>
                        setData({
                          waypointList: [...data.waypointList].filter(
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
                    primary={`(${latitude}, ${longitude}) : (${x.toFixed(2)}, ${y.toFixed(2)})`}
                    secondary={type}
                  />
                </ListItem>
              </>
            )
          )}
          <Divider />
        </List>
      </Box>
      <Button
        size="small"
        color="error"
        sx={{ margin: 1, float: 'right' }}
        type="submit"
        variant="contained"
      >
        Publish
      </Button>
    </div>
  );
};

export default Waypoints;
