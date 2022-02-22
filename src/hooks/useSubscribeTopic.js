import { useEffect, useState } from 'react';
import useRosWs from './useRosWs';

const useSubscribeTopic = (topicInput, throttleRate = 1000) => {
  const { isConnected, rosListener, topics } = useRosWs();
  const [message, setMessage] = useState();
  const compression = 'none';
  const queue = 0;

  useEffect(() => {
    const listener = handleTopic(topicInput);
    return () => listener?.unsubscribe();
  }, [isConnected, topicInput, topics, throttleRate]);

  const handleTopic = (topicInput) => {
    console.log('handleTopic');
    let newListener;
    for (var i in topics) {
      if (topics[i].path == topicInput) {
        newListener = rosListener(
          topics[i].path,
          topics[i].msgType,
          Number(queue),
          compression,
          throttleRate
        );
        break;
      }
    }
    if (newListener) {
      console.log('Subscribing to messages...');
      newListener.subscribe((msg) => setMessage(msg));
    } else {
      console.log(
        ">Topic '" +
          topicInput +
          "' not found...make sure to input the full topic path - including the leading '/'"
      );
    }
    return newListener;
  };

  return { isConnected, message };
};

export default useSubscribeTopic;
