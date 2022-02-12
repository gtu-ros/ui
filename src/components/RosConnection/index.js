import { Switch } from '@mui/material';
import { useROS } from 'react-ros';

// TODO: consider text field / content editable for url
const RosConnection = () => {
  const { isConnected, url, toggleConnection } = useROS();
  return (
    <div>
      <Switch checked={isConnected} onChange={toggleConnection} />
      {url}
    </div>
  );
};

export default RosConnection;
