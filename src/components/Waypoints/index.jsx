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
  ListItemAvatar,
  Stack
} from '@mui/material';
import { useForm } from 'react-hook-form';
import usePluginState from '../../hooks/usePluginState';
import { PLUGIN_KEYS } from '../../constants';
import { gpsToOdom } from './utils';
import { Send, ShareLocation } from '@mui/icons-material';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { ActionClient, Goal } from 'roslib';
import { useROS } from 'react-ros';
import ROSLIB from 'roslib/src/RosLib';

const Waypoints = () => {
  const { register, handleSubmit } = useForm();
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
    b: null,
  }

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
      heading_radians: head,
    });

    const gpsPromise = new Promise((resolve, reject) => {
      gpsGoalClient.callService(request, function (result) {
        positions.a = result.converted_pose.pose.position.x;
        positions.b = result.converted_pose.pose.position.y;
        resolve(result);
      });
    });


    // const { x, y } = gpsToOdom(
    //   {
    //     latitude: submitData[fields.latitude],
    //     longitude: submitData[fields.longitude]
    //   },
    //   initialCoordinates
    // );

    gpsPromise.then((result) => {
      const nextWaypoint = {
        x: positions.b,
        y: positions.a,
        type: submitData[fields.type],
        latitude: submitData[fields.latitude],
        longitude: submitData[fields.longitude],
      };
      console.log({ nextWaypoint });

      if (data?.waypointList) {
        setData({ waypointList: [...data.waypointList, nextWaypoint] });
      } else {
        setData({ waypointList: [nextWaypoint] });
      }

      // console.log("finish");
    });
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
              label="Head"
              {...register(fields.head)}
            />
            <TextField
              size="small"
              variant="outlined"
              label="Name"
              {...register(fields.type)}
            />
            {/* <FormControl size="small">
              <Select {...register(fields.type)}>
                <MenuItem value={'gate'}>Gate</MenuItem>
                <MenuItem value={'post'}>Post</MenuItem>
                <MenuItem value={'no-vision'}>No vision</MenuItem>
              </Select>
            </FormControl> */}
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
