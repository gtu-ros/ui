import { useROS } from 'react-ros';
import { TFClient } from 'roslib';
import { UrdfClient } from 'ros3d';

const useRosWs = () => {
  const rosUrl =
    'ws://' +
    process.env.REACT_APP_ROS_BRIDGE_URL +
    ':' +
    process.env.REACT_APP_ROS_BRIDGE_PORT;

  const { ros, url, changeUrl } = useROS();
  const isNetlifyBuild = !!process.env.NETLIFY;
  if (url !== rosUrl && !isNetlifyBuild) {
    console.log({ rosUrl });
    changeUrl(rosUrl);
  }

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

  return { ...useROS(), tfClientToFrame, urdfClient };
};

export default useRosWs;
