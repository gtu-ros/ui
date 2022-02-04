import { uiActionTypes } from './ui.types';

export const openDrawer = () => ({
  type: uiActionTypes.OPEN_DRAWER,
});

export const closeDrawer = () => ({
  type: uiActionTypes.CLOSE_DRAWER,
});

export const toggleDrawer = () => ({
  type: uiActionTypes.TOGGLE_DRAWER,
});

export const setAppTitle = (title) => ({
  type: uiActionTypes.SET_TITLE,
  payload: title
});