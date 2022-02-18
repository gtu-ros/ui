import React from 'react';
import DashboardView from './views/DashboardView';
import NavigationMap from './components/navigation/NavigationMap';
import './App.css';
import UrdfVisualizer from './components/UrdfVisualizer';
import { Routes, Route } from 'react-router-dom';
import { PLUGINS } from './constants/plugins';
import withRosAutoconnect from './containers/withRosAutoconnect';

function App() {
  const pluginRoutes = Object.entries(PLUGINS).map(([key, plugin]) => {
    const Element = withRosAutoconnect(plugin.component);
    return <Route path={key} element={<Element />} />;
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="navigation" element={<NavigationMap />} />
        <Route
          path="urdf"
          element={<UrdfVisualizer width={1920} height={1080} />}
        />
        {pluginRoutes}
      </Routes>
    </div>
  );
}

export default App;
