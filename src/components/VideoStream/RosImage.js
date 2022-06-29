import { useEffect, useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { saveAs } from 'file-saver';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import usePluginState from '../../hooks/usePluginState';
import VideoStream from '../VideoStream';
import { compressedToUrl } from './utils';
import { Download } from '@mui/icons-material';
import { Box } from '@mui/system';

const RosImage = ({ pluginKey, topic, throttleRate: initialThrottleRate }) => {
  const [throttleRate, setThrottleRate] = useState(initialThrottleRate);
  const { setOnline, setOffline } = usePluginState(pluginKey);
  const { message } = useSubscribeTopic(topic, throttleRate);

  const downloadImage = () => {
    if (message?.data)
      saveAs(compressedToUrl(message.data), `${+new Date()}.jpg`);
  };

  useEffect(() => {
    message ? setOnline() : setOffline();
  }, [message]);

  return (
    <div>
      <Box sx={{ display: 'flex', spacing: 20 }}>
        <TextField
          style={{ margin: 10 }}
          size="small"
          variant="outlined"
          label="Throttle rate (ms)"
          defaultValue={throttleRate}
          onBlur={(event) => setThrottleRate(+event.target.value)}
        />
        <IconButton onClick={downloadImage}>
          <Download />
        </IconButton>
      </Box>
      <VideoStream data={message?.data} />
    </div>
  );
};

export default RosImage;
