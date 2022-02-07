import { createContext, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import useRostopicEcho from '../hooks/useRostopicEcho';

export const Context = createContext();

export const usePlugins = () => useContext(Context);

export const usePluginData = (plugin) => {
  const { [plugin]: data } = usePlugins();
  return data;
};

export const PLUGIN_DATA_KEYS = {
  STOPWATCH: 'STOPWATCH',
  ROSTOPIC_ECHO: 'ROSTOPIC_ECHO'
};

export const PluginsDataProvider = ({ children }) => {
  const pluginData = {
    [PLUGIN_DATA_KEYS.STOPWATCH]: useStopwatch({ autoStart: false }),
    [PLUGIN_DATA_KEYS.ROSTOPIC_ECHO]: useRostopicEcho()
  };

  return <Context.Provider value={pluginData} children={children} />;
};
