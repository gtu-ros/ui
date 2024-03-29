import { uiActionTypes } from './ui.types';

export const openDrawer = () => ({
  type: uiActionTypes.OPEN_DRAWER
});

export const closeDrawer = () => ({
  type: uiActionTypes.CLOSE_DRAWER
});

export const toggleDrawer = () => ({
  type: uiActionTypes.TOGGLE_DRAWER
});

export const setAppTitle = (title) => ({
  type: uiActionTypes.SET_TITLE,
  payload: title
});

export const toggleMissionLog = () => ({
  type: uiActionTypes.TOGGLE_MISSION_LOG
});

export const setMissionLogIndex = (index) => ({
  type: uiActionTypes.SET_MISSION_LOG_INDEX,
  payload: index
});

export const missionLogNext = () => ({
  type: uiActionTypes.MISSION_LOG_NEXT,
});

export const missionLogPrev = () => ({
  type: uiActionTypes.MISSION_LOG_PREV,
});

export const setMissionLogOffset = (offset) => ({
  type: uiActionTypes.SET_MISSION_LOG_OFFSET,
  payload: offset
});

export const setMissionLogReady = (secs) => ({
  type: uiActionTypes.SET_MISSION_LOG_READY,
  payload: { secs }
});
