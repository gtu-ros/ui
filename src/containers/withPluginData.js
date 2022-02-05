import { usePluginData } from '../contexts/PluginsData';

const withPluginData = (WrappedComponent, key) => (props) => {
  const data = usePluginData(key);
  return <WrappedComponent {...data} {...props} />;
};

export default withPluginData;