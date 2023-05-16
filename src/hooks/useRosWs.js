import { useROS } from 'react-ros';
import { TFClient, Topic } from 'roslib';
import { UrdfClient } from 'ros3d';

const useRosWs = () => {
  const { ros, listeners } = useROS();

  const tfClientToFrame = (fixedFrame, rate) => {
    return new TFClient({
      ros: ros,
      fixedFrame: fixedFrame,
      angularThres: 0.001,
      transThres: 0.001,
      rate: rate
    });
  };

  const urdfClient = (tfClient, viewer3d, path) => {
    return new UrdfClient({
      ros: ros,
      tfClient: tfClient,
      path: path,
      rootObject: viewer3d.scene
    });
  };

  // same as createListener, but it takes throttle rate as a parameter
  const rosListener = (
    topic,
    msg_type,
    to_queue,
    compression_type,
    throttle_rate
  ) => {
    var newListener = new Topic({
      ros: ros,
      name: topic,
      messageType: msg_type,
      queue_length: to_queue,
      compression: compression_type,
      throttle_rate: throttle_rate
    });

    for (var listener in ros.listeners) {
      if (newListener.name === ros.listeners[listener].name) {
        console.log(
          'Listener already available in ros.listeners[' + listener + ']'
        );
        return ros.listeners[listener];
      }
    }

    listeners.push(newListener);
    console.log('Listener ' + newListener.name + ' created');
    return newListener;
  };

  return { ...useROS(), tfClientToFrame, urdfClient, rosListener };
};

export default useRosWs;
