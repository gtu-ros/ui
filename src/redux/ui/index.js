import { uiActionTypes } from './ui.types';

const initialState = {
  drawerOpen: true,
  title: 'GTU Rover',
  isMissionLogOpen: false,
  missionLog: {
    index: 0,
    offset: 0
  }
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
    case uiActionTypes.TOGGLE_MISSION_LOG:
      return {
        ...state,
        isMissionLogOpen: !state.isMissionLogOpen
      };
    case uiActionTypes.SET_MISSION_LOG_INDEX:
      return {
        ...state,
        missionLog: {
          ...state.missionLog,
          index: payload
        }
      };
    case uiActionTypes.SET_MISSION_LOG_OFFSET:
      return {
        ...state,
        missionLog: {
          ...state.missionLog,
          offset: payload
        }
      };
    default:
      return state;
  }
};

export default uiReducer;
