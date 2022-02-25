import { Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { useROS } from 'react-ros';

const RosConnection = () => {
  const { isConnected, url, changeUrl, toggleConnection } = useROS();
  const [isEdit, setIsEdit] = useState(false);
  const rosUrl =
    url ||
    'ws://' +
      process.env.REACT_APP_ROS_BRIDGE_URL +
      ':' +
      process.env.REACT_APP_ROS_BRIDGE_PORT;

  const handleOnBlur = (e) => {
    changeUrl(e.target.value);
    setIsEdit(false);
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
        <span onClick={() => setIsEdit(true)}>{url}</span>
      )}
    </div>
  );
};

export default RosConnection;
