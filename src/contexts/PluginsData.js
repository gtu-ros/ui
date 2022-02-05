import { createContext, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const Context = createContext();

export const usePlugins = () => useContext(Context);

export const usePluginData = (plugin) => {
  const { [plugin]: data } = usePlugins();
  return data;
};

export const PluginsDataProvider = ({ children }) => {
  const stopwatch = useStopwatch({ autoStart: false });
  return <Context.Provider value={{ stopwatch }} children={children} />;
};
