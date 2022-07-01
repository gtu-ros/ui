import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../db';
import VideoStream from '../VideoStream';

const MissionRecorder = () => {
  const arr = useLiveQuery(() => db.ZED_IMAGE.toArray());

  return (
    <ul>
      {arr?.map((i) => (
        <VideoStream data={JSON.parse(i.message).data} />
      ))}
    </ul>
  );
};

export default MissionRecorder;
