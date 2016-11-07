const reducers = require('../reducers');
import {applyMiddleware, createStore, combineReducers} from 'redux';
import {browserHistory} from 'react-router';
import {routerMiddleware, routerReducer} from 'react-router-redux';

module.exports = function(initialState) {
  // Add the reducer to your store on the 'routing' key
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })
  // Apply the middleware to the store
  const middleware = routerMiddleware(browserHistory)
  // Create store
  const store = createStore(reducer, initialState, applyMiddleware(middleware))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
