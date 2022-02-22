import { createContext, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const Context = createContext();

export const usePlugins = () => useContext(Context);

export const usePluginData = (plugin) => {
  const { [plugin]: data } = usePlugins();
  return data;
};

export const PLUGIN_DATA_KEYS = {
  STOPWATCH: 'STOPWATCH',
};

export const PluginsDataProvider = ({ children }) => {
  const pluginData = {
    [PLUGIN_DATA_KEYS.STOPWATCH]: useStopwatch({ autoStart: false }),
  };

  return <Context.Provider value={pluginData} children={children} />;
};
