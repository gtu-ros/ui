import { uiActionTypes } from './ui.types';

const initialState = {
  drawerOpen: true,
  title: 'GTU Rover'
};

const uiReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case uiActionTypes.OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true
      };
    case uiActionTypes.CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false
      };
    case uiActionTypes.TOGGLE_DRAWER:
      return {
        ...state,
        drawerOpen: !state.drawerOpen
      };
    case uiActionTypes.SET_TITLE:
      return {
        ...state,
        title: payload.title
      };
    default:
      return state;
  }
};

export default uiReducer;