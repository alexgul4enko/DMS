import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../root.reducer';

let finalCreateStore = compose(
    applyMiddleware(thunk, logger())
  )(createStore)

export default function configureStore (initialState = {}){
  return finalCreateStore(rootReducer,initialState);
}


















