import React, { useEffect } from 'react';
import useRosWs from '../hooks/useRosWs';

const withRosAutoconnect = (WrappedComponent) => (props) => {
  const { autoconnect, toggleAutoconnect } = useRosWs();
  useEffect(() => !autoconnect && toggleAutoconnect(), []);
  return <WrappedComponent {...props} />;
};

export default withRosAutoconnect;
