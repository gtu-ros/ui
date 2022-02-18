import { useState, useEffect } from 'react';
import { useROS } from 'react-ros';
import { Topic } from 'roslib';

function createPublisher(settings) {
  const topic = new Topic(settings);
  topic?.advertise?.();
  return topic;
}

function topicSettings(ros, name, msgType, rate, queue_size, queue_len) {
  return {
    ros: ros,
    name: name,
    messageType: msgType,
    throttle_rate: rate,
    queue_length: queue_len || 0,
    queue_size: queue_size || 10
  };
}

function publish(topic, message) {
  topic.publish(message);
}

function removePublisher(topic) {
  topic?.unadvertise?.();
}

const usePublisher = ({
  name,
  rate,
  type,
  queue_size = 10,
  autoRepeat = false
}) => {
  const { ros } = useROS();
  const [publisher, setPublisher] = useState({});

  const [toggler, setToggler] = useState(false);
  const timeInterval = Math.floor(1000 / rate);

  const initPub = () => {
    const settings = topicSettings(ros, name, type, rate, queue_size);
    const topic = createPublisher(settings);
    setPublisher(topic);
  };

  const cleanPub = () => {
    removePublisher(publisher);
    setPublisher({});
  };

  useEffect(() => {
    initPub();
    return () => {
      cleanPub();
    };
  }, []);

  const publishMessage = (msg) => {
    if (msg && Object.keys(publisher).length) {
      publish(publisher, msg);
    }
  };

  if (autoRepeat) {
    useEffect(() => {
      const timer = setTimeout(() => {
        publishMessage(message);
        setToggler(!toggler);
      }, timeInterval);

      return () => {
        clearTimeout(timer);
      };
    }, [toggler]);
  }

  return [publishMessage];
};

export default usePublisher;
