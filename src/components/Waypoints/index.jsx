import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Avatar,
  ListItemAvatar,
  Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants';
import { Send, ShareLocation } from '@mui/icons-material';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { ActionClient, Goal } from 'roslib';
import { useROS } from 'react-ros';
import ROSLIB from 'roslib/src/RosLib';
import { fillFromClipboard } from '../../utils/utils';
import { ArrowCircleRight } from '@mui/icons-material';

const inputProps = {
  size: 'small',
  variant: 'outlined',
  InputLabelProps: { shrink: true }
};

const Waypoints = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { data: initialCoordinates } = usePluginState(PLUGIN_KEYS.CALIBRATION);
  const { data, setData } = usePluginState(PLUGIN_KEYS.WAYPOINTS);
  const { ros } = useROS();

  const moveBaseGoal = (x, y) => {
    const actionClient = new ActionClient({
      ros: ros,
      serverName: '/move_base',
      actionName: 'move_base_msgs/MoveBaseAction'
    });

    const goal = new Goal({
      actionClient: actionClient,
      goalMessage: {
        target_pose: {
          header: {
            frame_id: 'odom'
          },
          pose: {
            position: {
              x: x,
              y: y,
              z: 0 // TODO: check
            },
            orientation: { x: 0, y: 0, z: 0, w: 1 }
          }
        }
      }
    });

    goal.send();
  };

  const fields = {
    latitude: 'latitude',
    longitude: 'longitude',
    type: 'type',
    head: 'head'
  };

  const positions = {
    a: null,
    b: null
  };

  const gpsGoalClient = new ROSLIB.Service({
    ros: ros,
    name: '/gps_goal_to_pose',
    serviceType: 'gps_goal_server/decDegreesToPose'
  });

  const onSubmit = (submitData) => {
    if (!initialCoordinates) {
      console.log('No initial coordinates');
      return;
    }

    const latitude = parseFloat(submitData[fields.latitude]);
    const longitude = parseFloat(submitData[fields.longitude]);
    const head = parseFloat(submitData[fields.head]);

    const request = new ROSLIB.ServiceRequest({
      latititude_dec_deg: latitude,
      longitude_dec_deg: longitude,
      heading_radians: head
    });

    const gpsPromise = new Promise((resolve, reject) => {
      gpsGoalClient.callService(request, function(result) {
        positions.a = result.converted_pose.pose.position.x;
        positions.b = result.converted_pose.pose.position.y;
        resolve(result);
      });
    });

    gpsPromise.then((result) => {
      const nextWaypoint = {
        x: positions.b,
        y: positions.a,
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
    });
  };

  const handleImport = async () => {
    const set = x => y => setValue(x, y)
    fillFromClipboard([ set('latitude'), set('longitude')]);
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
              label="Head"
              {...register(fields.head)}
              {...inputProps}
            />
            <TextField
              label="Name"
              {...register(fields.type)}
              {...inputProps}
            />
            {/* <FormControl size="small">
              <Select {...register(fields.type)}>
                <MenuItem value={'gate'}>Gate</MenuItem>
                <MenuItem value={'post'}>Post</MenuItem>
                <MenuItem value={'no-vision'}>No vision</MenuItem>
              </Select>
            </FormControl> */}
            <IconButton type="submit" color="primary">
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
                    <Stack spacing={2} direction="row">
                      <IconButton
                        color="error"
                        onClick={() => moveBaseGoal(x, y)}
                        edge="end"
                      >
                        <Send />
                      </IconButton>
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
                    </Stack>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <ShareLocation />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`(${latitude}, ${longitude}) : (${x.toFixed(
                      2
                    )}, ${y.toFixed(2)})`}
                    secondary={type}
                  />
                </ListItem>
              </>
            )
          )}
          <Divider />
        </List>
      </Box>
      {/* <Button
        size="small"
        color="error"
        sx={{ margin: 1, float: 'right' }}
        type="submit"
        variant="contained"
      >
        Publish
      </Button> */}
    </div>
  );
};

export default Waypoints;
