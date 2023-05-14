import { LIMIT } from '../../db';
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
    case uiActionTypes.MISSION_LOG_NEXT: {
      const { index, offset } = state.missionLog;
      const newOffset = index >= LIMIT - 1 ? offset + 1 : offset;
      const newIndex = (index + 1) % LIMIT;
      return {
        ...state,
        missionLog: {
          ...state.missionLog,
          index: newIndex,
          offset: newOffset
        }

      }
    }
    case uiActionTypes.MISSION_LOG_PREV: {
      const { index, offset } = state.missionLog;
      let newIndex = (index - 1);
      let newOffset = offset;
      if (newIndex < 0) {
        newIndex = LIMIT - 1;
        newOffset = offset - 1;
      }
      if (newOffset < 0) {
        newOffset = 0;
        newIndex = 0;
      }
      return {
        ...state,
        missionLog: {
          ...state.missionLog,
          index: newIndex,
          offset: newOffset
        }

      }
    }
    case uiActionTypes.SET_MISSION_LOG_OFFSET:
      return {
        ...state,
        missionLog: {
          ...state.missionLog,
          offset: payload
        }
      };
    case uiActionTypes.SET_MISSION_LOG_READY:
      return {
        ...state,
        missionLog: {
          ...state.missionLog,
          ...payload
        }
      }
    default:
      return state;
  }
};

export default uiReducer;
