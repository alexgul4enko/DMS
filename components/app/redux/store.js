import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import gallery from "../stores/galleryStore"
import orderStore from "../stores/orderStore"

let finalCreateStore = compose(
		applyMiddleware(thunk, logger())
	)(createStore)

export default function configureStore (initialState = {flow:{
															  	TT:null,
															  	action:null,
															  	order:null,
															  	product:null,
															  	backStage:"/Preload"
															  },
														...gallery,
														...orderStore,
														prod_action:{
															filter :null,
															bar_filter : null,
															selected_brod: null,
															dialog_opened: false
														},
														prod_action_mult:{
															filter :null,
															bar_filter : null,
															selected_brod: null,
															dialog_opened: false,
															show_questions: false
														}

													}){
	return finalCreateStore(rootReducer,initialState);
}