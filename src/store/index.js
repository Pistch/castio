import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import Api from 'castio/src/api/Api';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      api: new Api('https://castio.space')
    }
  });

  const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
}
