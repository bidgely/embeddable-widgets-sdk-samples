import {createStore, compose, applyMiddleware} from 'redux';
import { allReducers } from './reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(allReducers, {},
    composeEnhancer(applyMiddleware(thunk)));
}
