import { takeLatest, all, put, call, select } from 'redux-saga/effects';
import { uiActionTypes } from './ui.types';
import { getSecs } from '../../components/MissionLogController/utils';
import { setMissionLogReady } from './ui.actions';

export function* watchOpenMissionLog() {
  const { isMissionLogOpen } = yield select((state) => state.ui);
  if (isMissionLogOpen) {
    const secs = yield call(getSecs);
    console.log(secs);
    yield put(setMissionLogReady(secs));
  }
}

export function* uiSagas() {
  yield takeLatest(uiActionTypes.TOGGLE_MISSION_LOG, watchOpenMissionLog);
}
