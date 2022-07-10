import { PLUGINS } from '../../constants/plugins';
import { PLUGIN_KEYS } from '../../constants';
import { pluginActionTypes } from './plugin.types';

const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

const setDefaultSettings = (pluginKey, settings) => {
  initialState[pluginKey] = {
    data: {
      settings
    }
  };
};

const initialState = objectMap(PLUGINS, (plugin) => ({
  type: plugin.type,
  status: 'enabled'
}));

setDefaultSettings(PLUGIN_KEYS.MAP, {
  arc22MarsField: true,
  arc22MoonField: false,
  editMode: true
});
setDefaultSettings(PLUGIN_KEYS.UTC, { offset: true });

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
    case pluginActionTypes.SET_DATA: {
      const { plugin: key, data } = payload;
      const plugin = state[key];
      return {
        ...state,
        [key]: { ...plugin, data }
      };
    }
    default:
      return state;
  }
};

export default pluginReducer;
