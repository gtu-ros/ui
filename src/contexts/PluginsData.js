import { createContext, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { PLUGIN_KEYS } from '../constants';
import { getLocalStorageOr, offsetDate } from '../utils';

export const Context = createContext();

export const usePlugins = () => useContext(Context);

export const usePluginData = (plugin) => {
  const { [plugin]: data } = usePlugins();
  return data;
};

export const PLUGIN_DATA_KEYS = {
  STOPWATCH: 'STOPWATCH',
};

const initialData = {
  [PLUGIN_KEYS.STOPWATCH]: getLocalStorageOr({ isRunning: false, offset: 0 })(PLUGIN_DATA_KEYS.STOPWATCH)
};

export const PluginsDataProvider = ({ children }) => {
  const pluginData = {
    [PLUGIN_DATA_KEYS.STOPWATCH]: useStopwatch({
      autoStart: initialData.[PLUGIN_KEYS.STOPWATCH].isRunning,
      offsetTimestamp: offsetDate(initialData[PLUGIN_KEYS.STOPWATCH].offset)
    })
  };

  return <Context.Provider value={pluginData} children={children} />;
};
