import React from 'react';
import DashboardView from './views/DashboardView';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { PLUGINS } from './constants/plugins';
import withRosAutoconnect from './containers/withRosAutoconnect';

function App() {
  const pluginRoutes = Object.entries(PLUGINS).map(([key, plugin]) => {
    const Element = withRosAutoconnect(plugin.component);
    return (
      <Route
        path={key}
        element={
          <div style={{ height: '100vh' }}>
            <Element />
          </div>
        }
      />
    );
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DashboardView />} />
        {pluginRoutes}
      </Routes>
    </div>
  );
}

export default App;
