import {all} from 'redux-saga/effects';
import {sagas as cardsSagas} from 'modules/cards';

export default function* rootSaga() {
  yield all([
    cardsSagas(),
  ]);
}