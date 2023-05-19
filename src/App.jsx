import React from 'react';
import DashboardView from './views/DashboardView';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  MAIN_LAYOUT,
  NAVIGATION_LAYOUT,
  PLUGINS,
  ROBOTIC_ARM_LAYOUT,
  SCIENCE_LAYOUT
} from './constants/plugins';
import withRosAutoconnect from './containers/withRosAutoconnect';
import Layout from './views/Layout';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer theme="dark" draggable={false} closeOnClick={false} />
      <Routes>
        <Route path="/" element={<DashboardView />}>
          <Route
            path=""
            element={<Layout plugins={MAIN_LAYOUT} gridKey="main" />}
          />
          <Route
            path="arm"
            element={<Layout plugins={ROBOTIC_ARM_LAYOUT} gridKey="arm" />}
          />
          <Route
            path="navigation"
            element={<Layout plugins={NAVIGATION_LAYOUT} gridKey="nav" />}
          />
          <Route
            path="science"
            element={<Layout plugins={SCIENCE_LAYOUT} gridKey="sci" />}
          />
        </Route>
        {pluginRoutes}
      </Routes>
    </div>
  );
}

export default App;
