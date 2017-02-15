import * as redux from 'redux';
import thunk from 'redux-thunk';

import  {exampleReducer, userReducer, errorMessageReducer} from '../reducers/reducers';

export var configure = (initialState = {}) => {
  
  var rootReducer = redux.combineReducers({
    example: exampleReducer,
    user: userReducer,
    errorMessage: errorMessageReducer
  });

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux.compose;
  const store = redux.createStore(
      rootReducer,
      initialState,
      composeEnhancers(redux.applyMiddleware(thunk))
  );
    
  return store;
};