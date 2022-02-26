import { TextField, Box } from '@mui/material';
import { useState } from 'react';
import ReactJson from 'react-json-view';
import { PLUGIN_KEYS } from '../../constants/plugins';
import usePluginState from '../../hooks/usePluginState';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';

// TODO: subscribed status
const RostopicEcho = ({}) => {
  const [topic, setTopic] = useState();
  const [queue, setQueue] = useState(0);
  const [compression, setCompression] = useState('none');
  const { message } = useSubscribeTopic(topic, 500);
  const { status, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.ROSTOPIC_ECHO
  );

  message ? setOnline() : setOffline();

  return (
    <div>
      <Box sx={{ '& .MuiTextField-root': { margin: 1, width: '100%' } }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            label="Topic"
            placeholder="/zed2/odom"
            defaultValue={topic}
            onChange={(event) => setTopic(event.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            label="Message queue length"
            defaultValue={queue}
            onChange={(event) => setQueue(event.target.value)}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Compression"
            defaultValue={compression}
            onChange={(event) => setCompression(event.target.value)}
          />
        </Box>
      </Box>
      {/* <pre>{JSON.stringify(message, null, 4)}</pre> */}
      <ReactJson
        src={message}
        style={{ paddingLeft: 4 }}
        name={false}
        indentWidth={2}
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </div>
  );
};

export default RostopicEcho;
