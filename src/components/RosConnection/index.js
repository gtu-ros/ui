import { Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { useROS } from 'react-ros';

const RosConnection = () => {
  const { isConnected, url, changeUrl, toggleConnection } = useROS();
  const [isEdit, setIsEdit] = useState(false);

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
          defaultValue={url}
          onBlur={handleOnBlur}
        />
      ) : (
        <span onClick={() => setIsEdit(true)}>{url}</span>
      )}
    </div>
  );
};

export default RosConnection;
