import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../root.reducer';

let finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore)


const initialState_ = {
	isLocalData : false,
	loadData:[],
	fullScreanMode :false,
	showContent:true,
}




export default function configureStore (initialState = initialState_){
 return finalCreateStore(rootReducer,initialState);;
}

