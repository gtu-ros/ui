import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import usePluginState from '../../hooks/usePluginState';
import VideoStream from '../VideoStream';

const RosImage = ({ pluginKey, topic, throttleRate: initialThrottleRate }) => {
  const [throttleRate, setThrottleRate] = useState(initialThrottleRate);
  const { setOnline, setOffline } = usePluginState(pluginKey);
  const { message } = useSubscribeTopic(topic, throttleRate);

  useEffect(() => {
    message ? setOnline() : setOffline();
  }, [message]);

  return (
    <div>
      <TextField
        style={{ margin: 10 }}
        size="small"
        variant="outlined"
        label="Throttle rate (ms)"
        defaultValue={throttleRate}
        onBlur={(event) => setThrottleRate(+event.target.value)}
      />
      <VideoStream data={message?.data} />
    </div>
  );
};

export default RosImage;
