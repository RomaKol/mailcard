import {takeLatest, all, put, call} from 'redux-saga/effects';
import store from 'store';
import cardsActions from './actions';

function* cardsDeleteWatcher() {
  yield takeLatest('CARDS/DELETE', cardsDeleteEffect);
}

function* cardsDeleteEffect(action) {
  try {
    const {payload} = action;

    yield put(cardsActions.deleteCardsRequest());
    const array = yield call(async () => {
      const {deletedArray} = payload;
      let newList = [...store.getState().cards.array];
      await deletedArray.forEach(i => {
        newList = newList.filter(item => item !== i);
      });
      return newList;
    });
    yield put(cardsActions.deleteCardsSuccess(array))
  } catch (error) {
    console.log("Error", error);
    yield put(cardsActions.deleteCardsFailure());
  }
}

export default function* cardsWatcher() {
  yield all([
    cardsDeleteWatcher(),
  ]);
}