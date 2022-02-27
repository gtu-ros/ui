import { Send } from '@mui/icons-material';
import { Button, Fab } from '@mui/material';
import ReactJson from 'react-json-view';
import usePublisher from '../../hooks/usePublisher';
import useSubscribeTopic from '../../hooks/useSubscribeTopic';
import { ActionClient, Goal } from 'roslib';
import { useROS } from 'react-ros';

const RosMessagePublisher = ({}) => {
  const { message } = useSubscribeTopic('/output_point', 200);
  const { ros } = useROS();

  const handlePublish = () => {
    const actionClient = new ActionClient({
      ros: ros,
      serverName: '/move_base',
      actionName: 'move_base_msgs/MoveBaseAction'
    });

    const goal = new Goal({
      actionClient: actionClient,
      goalMessage: {
        target_pose: {
          header: {
            frame_id: '/map'
          },
          pose: message.pose
        }
      }
    });

    goal.send();
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
