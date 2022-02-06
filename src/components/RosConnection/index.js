import { FormControlLabel, Switch, TextField } from '@material-ui/core';
import { useROS } from 'react-ros';

// TODO: consider text field / content editable for url
const RosConnection = () => {
  const { isConnected, url, toggleConnection } = useROS();
  return (
    <div style={{ paddingLeft: 6 }}>
      <FormControlLabel
        control={<Switch checked={isConnected} />}
        onChange={toggleConnection}
      />
      {url}
    </div>
  );
};

export default RosConnection;
