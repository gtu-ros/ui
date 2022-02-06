import { useROS } from 'react-ros';

const useRosWs = () => {
  const rosUrl =
    'ws://' +
    process.env.REACT_APP_ROS_BRIDGE_URL +
    ':' +
    process.env.REACT_APP_ROS_BRIDGE_PORT;

  const { url, changeUrl } = useROS();
  if (url !== rosUrl) {
    console.log({ rosUrl });
    changeUrl(rosUrl);
  }
  return useROS();
};

export default useRosWs;
