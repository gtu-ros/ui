import BluetoothIcon from '@mui/icons-material/Bluetooth';
import {
  Box,
  List,
  ListItem,
  Divider,
  ListItemText,
  IconButton,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import MissionRecorder from '../MissionRecorder';

const BluetoothInquiry = ({}) => {
  const { message } = useSubscribeTopic('/bluetooth_search_result', 500);
  const [foundDevices, setFoundDevices] = useState([]);
  const { status, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.BLUETOOTH_INQUIRY
  );

  useEffect(() => {
    message ? setOnline() : setOffline();
  }, [message]);

  console.log({ message });
  const filtered = foundDevices.filter((d) => d?.address === message?.address);
  const isNewDevice = filtered.length === 0;
  if (isNewDevice && message) {
    setFoundDevices([...foundDevices, message]);
  }
  console.log({ isNewDevice });
  console.log({ foundDevices });

  // const mock = [
  //   {
  //     address: 'as:sa:as:sa:as',
  //     name: 'name:omer,health:9'
  //   },
  //   {
  //     address: '`12:sa:as:sa:as',
  //     name: 'name:fatih,health:6'
  //   },

  // ];

  // TODO: safe parse
  const astronouts = foundDevices
    .map((d) => {
      if (d.name.match(/^name:.+,health:[0-9]/g)) {
        const [name, health] = d.name.split(',');
        const nameVal = name.split(':')[1];
        const healthVal = health.split(':')[1];
        return {
          ...d,
          name: nameVal,
          health: healthVal
        };
      }
    })
    .filter((d) => d);


  return <MissionRecorder />;

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <List sx={{ width: '100%' }}>
          {astronouts?.map(({ address, name, health }) => (
            <>
              <Divider />
              <ListItem
                secondaryAction={
                  <IconButton onClick={() => {}} edge="end"></IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <BluetoothIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Name: ${name}, Health: ${health}`}
                  secondary={address}
                />
              </ListItem>
            </>
          ))}
          <Divider />
        </List>
      </Box>
    </div>
  );
};

export default BluetoothInquiry;
