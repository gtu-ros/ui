import { Send } from '@mui/icons-material';
import { Button, Fab } from '@mui/material';
import ReactJson from 'react-json-view';
import usePublisher from '../../hooks/usePublisher';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';

const RosMessagePublisher = ({}) => {
  const { message } = useSubscribeTopic('/output_point', 200);
  const topic = {
    name: '/test',
    type: 'geometry_msgs/PoseStamped',
    rate: 1
  };

  const [publish] = usePublisher(topic);
  console.log('message publisher', { message });

  // const message = {
  //   header: {
  //     frame_id: 'map'
  //   },
  //   pose: {
  //     position: {
  //       x: -0.03,
  //       y: -0.81,
  //       z: -0.0
  //     },
  //     orientation: {
  //       x: 0,
  //       y: 0,
  //       z: -0.91,
  //       w: -0.39
  //     }
  //   }
  // };

  const handlePublish = () => {
    publish(message);
  };

  return (
    <>
      <ReactJson
        src={message}
        style={{ paddingLeft: 4 }}
        name={false}
        indentWidth={2}
        displayDataTypes={false}
        displayObjectSize={false}
      />

      <Fab
        style={{ position: 'absolute', right: 10, bottom: 10 }}
        onClick={handlePublish}
        size="small"
        color="secondary"
      >
        <Send />
      </Fab>
    </>
  );
};

export default RosMessagePublisher;
