import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants/plugins';
import usePluginState from '../../hooks/usePluginState';
import VideoStream from '../VideoStream';

const ZedImage = () => {
  const [throttleRate, setThrottleRate] = useState(100);
  const { setOnline, setOffline } = usePluginState(PLUGIN_KEYS.ZED_IMAGE);
  const { message } = useSubscribeTopic(
    '/zed2/zed_node/left_raw/image_raw_color/compressed',
    throttleRate
  );

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

export default ZedImage;
