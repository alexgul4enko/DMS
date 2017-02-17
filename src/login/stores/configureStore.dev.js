import { applyMiddleware, compose, createStore } from 'redux'
import reducer from '../reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


let finalCreateStore = compose(
		applyMiddleware(thunk, logger())
	)(createStore)

export default function configureStore (initialState = { login:"",pass:"",error:""}){
 let store =   finalCreateStore(reducer,initialState);

 if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer').default; 
      store.replaceReducer(nextReducer);
    });
  }
 return store;
}