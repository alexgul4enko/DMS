import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducer';

let finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore)



export default function configureStore (initialState = { login:"",pass:"",error:""}){
 return finalCreateStore(rootReducer,initialState);;
}
