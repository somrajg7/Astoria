const reducers = require('../reducers');
import {applyMiddleware, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';

module.exports = function(initialState) {
  // Apply the middleware to the store
  const middleware = routerMiddleware(browserHistory)
  // Create store
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  const store = createStoreWithMiddleware(reducers, initialState, applyMiddleware(middleware));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
