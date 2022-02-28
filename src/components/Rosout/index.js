import React, { useEffect, useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants/plugins';
import usePluginState from '../../hooks/usePluginState';
import _ from 'lodash';
import LogMessage from '../LogMessage';
const Rosout = () => {
  const { setOnline, setOffline } = usePluginState(PLUGIN_KEYS.ROSOUT);
  const [data, setData] = useState([]);
  const { isConnected, message } = useSubscribeTopic('/rosout', 0);

  useEffect(() => {
    if (isConnected && message) {
      setOnline();
      setData([...data.slice(-50), message]);
    } else {
      setOffline();
    }
  }, [isConnected, message]);

  if (!message) return <div>No data</div>;

  return (
    <div style={{ margin: 8 }}>
      {data.map((message) => (
        <LogMessage message={message} />
      ))}
    </div>
  );
};

export default Rosout;
