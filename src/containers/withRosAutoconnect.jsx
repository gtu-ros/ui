import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import useRosWs from '../hooks/useRosWs';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const withRosAutoconnect = (WrappedComponent) => (props) => {
  const query = useQuery();
  const rosUrl = query.get('ROS_URL');
  const { autoconnect, toggleAutoconnect, changeUrl } = useRosWs();
  useEffect(() => {
    if (rosUrl) {
      changeUrl(rosUrl);
    }
    !autoconnect && toggleAutoconnect();
  }, []);
  return <WrappedComponent {...props} />;
};

export default withRosAutoconnect;
