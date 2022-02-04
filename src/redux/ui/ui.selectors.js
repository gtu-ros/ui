import { createSelector } from 'reselect';

export const selectDrawerOpen = (state) => state.ui.drawerOpen;
export const selectTitle = (state) => state.ui.title;
