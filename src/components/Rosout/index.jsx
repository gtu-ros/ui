import React, { useEffect, useState } from 'react';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { PLUGIN_KEYS } from '../../constants';
import usePluginState from '../../hooks/usePluginState';
import _ from 'lodash';
import LogMessage from '../LogMessage';
import useMessage from '../../hooks/useMessage';

const Rosout = () => {
  const { setOnline, setOffline, data, setData } = usePluginState(
    PLUGIN_KEYS.ROSOUT
  );
  const { message } = useMessage(PLUGIN_KEYS.ROSOUT, '/rosout', 0);

  useEffect(() => {
    if (message) {
      setOnline();
      const { list } = data || { list: [] };
      setData({
        list: [...list?.slice(-300), message],
        timestamp: message?.header?.stamp?.secs
      });
    } else {
      setOffline();
    }
  }, [message]);

  if (!message) return null;

  return (
    <div style={{ margin: 8 }}>
      <pre>
        {data?.list?.map((message) => (
          <LogMessage message={message} />
        ))}
      </pre>
    </div>
  );
};

export default Rosout;
