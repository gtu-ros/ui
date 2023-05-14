import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, LIMIT } from '../db';
import { selectMissionLog } from '../redux/ui/ui.selectors';

const useDbMessage = (pluginKey) => {
  const { index, offset, secs } = useSelector(selectMissionLog);
  const [message, setMessage] = useState();

  useEffect(() => {
    const getData = async () =>
      await db[pluginKey]
        ?.where('secs')
        .above(secs[offset * LIMIT + index])
        .limit(1)
        .first();

    if (secs) {
      getData().then(setMessage);
    }
  }, [offset, index, secs]);

  return { message };
};

export default useDbMessage;
