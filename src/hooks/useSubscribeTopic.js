import { useEffect, useState } from 'react';
import useRosWs from './useRosWs';

const useSubscribeTopic = (topicInput) => {
  const { isConnected, createListener, topics } = useRosWs();
  const [listener, setListener] = useState(null);
  const [topic, setTopic] = useState();
  const [message, setMessage] = useState();
  const compression = 'none';
  const queue = 0;

  useEffect(() => {
    handleTopic(topicInput);
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
    setListener(null);
    for (var i in topics) {
      if (topics[i].path == topicInput) {
        setListener(
          createListener(
            topics[i].path,
            topics[i].msgType,
            Number(queue),
            compression
          )
        );
        break;
      }
    }
    if (listener) {
      // console.log('Subscribing to messages...');
      listener.subscribe(handleMsg);
    } else {
      console.log(
        "Topic '" +
          topic +
          "' not found...make sure to input the full topic path - including the leading '/'"
      );
    }
  };
  const handleMsg = (msg) => {
    setMessage(msg);
    // console.log(msg);
  };
  return { isConnected, message };
};

export default useSubscribeTopic;
