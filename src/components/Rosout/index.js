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
      setData([...data.slice(-300), message]);
    } else {
      setOffline();
    }
  }, [isConnected, message]);

  if (!message) return null;

  return (
    <div style={{ margin: 8 }}>
      <pre>
        {data.map((message) => (
          <LogMessage message={message} />
        ))}
      </pre>
    </div>
  );
};

export default Rosout;
