import { combineReducers } from 'redux';
import pluginReducer from './plugins';
import uiReducer from './ui';

const rootReducer = combineReducers({
  ui: uiReducer,
  plugins: pluginReducer
});

export default rootReducer;
