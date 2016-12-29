import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../root.reducer';

let finalCreateStore = compose(
    // applyMiddleware(thunk)
     applyMiddleware(thunk, logger())
  )(createStore)


const initialState_ = {
	isLocalData : false,
	loadData:[],
	fullScreanMode :false,
	showContent:true,
}




export default function configureStore (initialState = initialState_){
 let store =   finalCreateStore(rootReducer,initialState);

 if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../root.reducer', () => {
      const nextReducer = require('../root.reducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }


 return store;
}

