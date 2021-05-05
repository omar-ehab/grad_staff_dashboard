import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const composeEnhancers = composeWithDevTools({trace: true});
    return composeEnhancers(applyMiddleware(middleware));
  }
  return applyMiddleware(middleware);
};

const store = createStore(rootReducer, bindMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export { store };
