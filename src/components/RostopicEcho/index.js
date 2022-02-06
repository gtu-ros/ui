import { TextField, Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useROS } from 'react-ros';
import useRosWs from '../../hooks/useRosWs';
var listener = null;

// TODO: subscribed status
// TODO: global state
function RostopicEcho() {
  const { createListener, topics } = useRosWs();

  const [topic, setTopic] = useState('/');
  const [queue, setQueue] = useState(0);
  const [compression, setCompression] = useState('none');
  const [message, setMessage] = useState();

  useEffect(() => {
    handleTopic(topic);
  });
  const unsubscribe = () => {
    if (listener) {
      console.log('Unsubscribing');
      listener.unsubscribe();
    }
  };
  const handleTopic = (topicInput) => {
    if (topic !== topicInput) {
      setTopic(topicInput);
      unsubscribe();
      return;
    }
    unsubscribe();
    listener = null;
    for (var i in topics) {
      if (topics[i].path == topicInput) {
        listener = createListener(
          topics[i].path,
          topics[i].msgType,
          Number(queue),
          compression
        );
        break;
      }
    }
    if (listener) {
      console.log('Subscribing to messages...');
      listener.subscribe(handleMsg);
    } else {
      console.log(
        "Topic '" +
          topic +
          "' not found...make sure to input the full topic path - including the leading '/'"
      );
    }
  };
  const handleQueue = (queueInput) => {
    setQueue(queueInput);
  };
  const handleCompression = (compInput) => {
    setCompression(compInput);
  };
  const handleMsg = (msg) => {
    setMessage(msg);
    console.log(msg);
  };

  return (
    <div>
      <Box sx={{ '& .MuiTextField-root': { margin: 10, width: '100%' } }}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            label="Topic"
            placeholder="/zed2/odom"
            onChange={(event) => handleTopic(event.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex' }}>
          <TextField
            size="small"
            variant="outlined"
            label="Message queue length"
            defaultValue={queue}
            onChange={(event) => handleQueue(event.target.value)}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Compression"
            defaultValue={compression}
            onChange={(event) => handleCompression(event.target.value)}
          />
        </Box>
      </Box>
      <pre>{JSON.stringify(message, null, 4)}</pre>
    </div>
  );
}

export default RostopicEcho;
