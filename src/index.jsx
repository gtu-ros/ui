import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import ModalProvider from 'mui-modal-provider';
import { PluginsDataProvider } from './contexts/PluginsData';
import { ROS } from 'react-ros';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ROS>
          <PluginsDataProvider>
            <ModalProvider>
              <App />
            </ModalProvider>
          </PluginsDataProvider>
        </ROS>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);
