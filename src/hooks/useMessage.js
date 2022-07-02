import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectMissionLogOpen } from '../redux/ui/ui.selectors';
import { throttle } from 'lodash';
import useDbMessage from './useDbMessage';
import useSubscribeTopic from './useSubscribeTopic';
import { db } from '../db';

const useMessage = (pluginKey, topicInput, throttleRate = 1000) => {
  const missionLogOpen = useSelector(selectMissionLogOpen);
  const dbRes = useDbMessage(pluginKey);
  const rosRes = useSubscribeTopic(topicInput, throttleRate);
  const res = missionLogOpen ? dbRes : rosRes;

  const throttledSave = useMemo(
    () =>
      throttle((m) => {
        if (m) {
          db[pluginKey]?.add({
            secs: m.header.stamp.secs,
            ...m
          });
        }
        console.log('db save');
      }, 1000),
    [db, pluginKey]
  );

  useEffect(() => {
    if (!missionLogOpen) throttledSave(rosRes?.message);
  }, [rosRes, missionLogOpen]);

  return { ...res, isLive: !missionLogOpen };
};

export default useMessage;
