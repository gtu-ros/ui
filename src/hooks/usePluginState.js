import { useDispatch, useSelector } from 'react-redux';
import { selectPlugins } from '../redux/plugins/plugin.selectors';
import { pluginActionTypes } from '../redux/plugins/plugin.types';

const usePluginState = (pluginKey) => {
  const dispatch = useDispatch();
  const { status, data } = useSelector(selectPlugins(pluginKey));

  const setOnline = () => {
    if (status !== 'online') {
      dispatch({
        type: pluginActionTypes.SET_ONLINE,
        payload: { plugin: pluginKey }
      });
    }
  };

  const setOffline = () => {
    if (status !== 'offline') {
      dispatch({
        type: pluginActionTypes.SET_OFFLINE,
        payload: { plugin: pluginKey }
      });
    }
  };

  const toggleStatus = () => {
    dispatch({
      type: pluginActionTypes.TOGGLE_STATUS,
      payload: { plugin: pluginKey }
    });
  };

  const setData = (newData) => {
    if (true || status !== 'offline') {
      // TODO: consider disabling check
      dispatch({
        type: pluginActionTypes.SET_DATA,
        payload: { plugin: pluginKey, data: { ...data, ...newData } }
      });
    }
  };

  return { status, data, setOnline, setOffline, toggleStatus, setData };
};

export default usePluginState;
