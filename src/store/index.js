import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';


const initialState = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    name: 'mailcard'
  })
  : compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ),
);

sagaMiddleware.run(rootSaga);

export {
  store as default,
};