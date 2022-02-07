import { useEffect, useState } from 'react';
import useRosWs from './useRosWs';

var listener = null;

const useRostopicEcho = () => {
  const { createListener, topics } = useRosWs();
  const [topic, setTopic] = useState();
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
  return {
    handleTopic,
    handleQueue,
    handleCompression,
    message,
    topic,
    queue,
    compression
  };
};

export default useRostopicEcho;
