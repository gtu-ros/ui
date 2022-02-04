import { all, call } from 'redux-saga/effects';
import { uiSagas } from './ui/ui.sagas';

export function* rootSaga() {
  yield all([
    call(uiSagas),
  ]);
}