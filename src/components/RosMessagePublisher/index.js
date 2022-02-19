import usePublisher from '../../hooks/usePublisher';

const RosMessagePublisher = ({}) => {
  const topic = {
    name: '/test',
    type: 'geometry_msgs/PoseStamped',
    rate: 1
  };

  const [publish] = usePublisher(topic);

  const message = {
    header: {
      frame_id: 'map'
    },
    pose: {
      position: {
        x: -0.03,
        y: -0.81,
        z: -0.0
      },
      orientation: {
        x: 0,
        y: 0,
        z: -0.91,
        w: -0.39
      }
    }
  };

  const handlePublish = () => {
    console.log('here');
    publish(message);
  };

  return <button onClick={handlePublish}>publish</button>;
};

export default RosMessagePublisher;
