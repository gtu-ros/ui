import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db, LIMIT } from '../db';
import { selectMissionLog } from '../redux/ui/ui.selectors';

const useDbMessage = (pluginKey) => {
  const missionLog = useSelector(selectMissionLog);
  const index = missionLog?.index || 1;
  const offset = missionLog?.offset || 0;
  const [message, setMessage] = useState();
  const [arr, setArr] = useState([]);
  //   const arr = useLiveQuery(() => db[pluginKey]?.toArray());

  useEffect(() => {
    const getData = async () =>
      await db[pluginKey]
        ?.offset(offset * LIMIT)
        .limit(LIMIT)
        .toArray();
    getData()
      .then(setArr)
      .then(() => console.log('getData'));
  }, [offset]);

  useEffect(() => {
    if (arr && index && arr.length > index) setMessage(arr[index]);
    else setMessage(null);
  }, [arr, index]);
  return { message };
};

export default useDbMessage;
