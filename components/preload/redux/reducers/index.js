import { combineReducers } from 'redux' 
import preload from './preload'
import simplebutons from './simplebutons'

const rootReducer = combineReducers({
	data:preload,
	fullscreen: simplebutons

})


export default rootReducer;