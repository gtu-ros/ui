import { FormControlLabel, Switch } from '@mui/material';
import { useROS } from 'react-ros';

// TODO: consider text field / content editable for url
const RosConnection = () => {
  const { isConnected, url, toggleConnection } = useROS();
  return (
    <div>
      <FormControlLabel
        control={<Switch checked={isConnected} />}
        onChange={toggleConnection}
        label={url}
      />
    </div>
  );
};

export default RosConnection;
