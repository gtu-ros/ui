import { useDispatch, useSelector } from 'react-redux';
import { selectPlugins } from '../redux/plugins/plugin.selectors';
import { pluginActionTypes } from '../redux/plugins/plugin.types';

const usePluginState = (pluginKey) => {
  const dispatch = useDispatch();
  const { status } = useSelector(selectPlugins(pluginKey));

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

  return { status, setOnline, setOffline, toggleStatus };
};

export default usePluginState;
