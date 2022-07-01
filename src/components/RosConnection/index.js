import { Switch, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useROS } from 'react-ros';
import { useSearchParams } from 'react-router-dom';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';

const RosConnection = () => {
  const { isConnected, url, changeUrl, toggleConnection } = useROS();
  const [isEdit, setIsEdit] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlFromSearchParams = searchParams.get('ROS_URL');
  const { data, setData, setOnline, setOffline } = usePluginState(
    PLUGIN_KEYS.ROS_CONNECTION
  );

  const setRosUrl = (url) => {
    changeUrl(url);
    setSearchParams({ ROS_URL: url });
    setIsEdit(false);
    setData({ url: url });
    isConnected ? setOnline() : setOffline();
  };

  const rosUrl =
    urlFromSearchParams ||
    data?.url ||
    url ||
    'ws://' +
      process.env.REACT_APP_ROS_BRIDGE_URL +
      ':' +
      process.env.REACT_APP_ROS_BRIDGE_PORT;

  useEffect(() => {
    setRosUrl(rosUrl);
  }, []);

  const handleOnBlur = (e) => {
    const { value } = e.target;
    setRosUrl(value);
  };

  return (
    <div>
      <Switch onChange={toggleConnection} checked={isConnected} />
      {isEdit ? (
        <TextField
          sx={{ width: 250 }}
          size="small"
          variant="outlined"
          placeholder="/zed2/odom"
          defaultValue={rosUrl}
          onBlur={handleOnBlur}
        />
      ) : (
        <span onClick={() => setIsEdit(true)}>{rosUrl}</span>
      )}
    </div>
  );
};

export default RosConnection;
