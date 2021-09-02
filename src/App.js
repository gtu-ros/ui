import React from 'react';
import logo from './logo.svg';
import './App.css';
import DashboardView from './views/DashboardView';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { simulation } from './utils/constants';
import { ModelVisualizer } from './components/ModelVisualizer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/urdf" component={Urdf} />
          <Route path="/" component={DashboardView} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const Urdf = () => {
  return (
    <ModelVisualizer
      urdfPath={
        'http://' +
        process.env.REACT_APP_FILE_SERVER_URL +
        ':' +
        process.env.REACT_APP_FILE_SERVER_PORT
      }
      targetFrame={simulation.constants.ROBOT_BASE_LINK}
      tfRate={simulation.config.tfRate}
      width={simulation.config.width}
      height={simulation.config.height}
      cameraPosition={simulation.config.cameraPosition}
    />
  );
};

export default App;
