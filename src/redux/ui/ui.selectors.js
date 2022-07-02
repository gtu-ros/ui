import { createSelector } from 'reselect';

export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectTitle = (state) => state.ui.title;
export const selectMissionLogOpen = (state) => state.ui.isMissionLogOpen;
export const selectMissionLog = (state) => state.ui.missionLog;
