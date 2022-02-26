import { PLUGINS } from '../../constants/plugins';
import { pluginActionTypes } from './plugin.types';

const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

const initialState = objectMap(PLUGINS, (plugin) => ({
  type: plugin.type,
  status: 'enabled'
}));

const pluginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case pluginActionTypes.TOGGLE_STATUS: {
      const { plugin: key } = payload;
      const plugin = state[key];
      const nextState = plugin.status === 'disabled' ? 'enabled' : 'disabled';
      return {
        ...state,
        [key]: { ...plugin, status: nextState }
      };
    }
    case pluginActionTypes.SET_ONLINE: {
      const { plugin: key } = payload;
      const plugin = state[key];
      return {
        ...state,
        [key]: { ...plugin, status: 'online' }
      };
    }
    case pluginActionTypes.SET_OFFLINE: {
      const { plugin: key } = payload;
      const plugin = state[key];
      return {
        ...state,
        [key]: { ...plugin, status: 'offline' }
      };
    }
    default:
      return state;
  }
};

export default pluginReducer;
