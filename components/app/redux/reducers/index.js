import { combineReducers } from 'redux' 
import preload from './preload'
import Gps_tracker from './Gps_tracker'
import visit from './visit'
import TT_Answer from './TT_Answers'
import gallery from './gallery'
import orders from './orders'

const rootReducer = combineReducers({
	ttActions:preload,
	PriceList:preload,
	TTProducts:preload,
	TTPriceList:preload,
	Products:preload,
	PayForms:preload,
	Magazine:preload,
	History:preload,
	Actions:preload,
	flow:Gps_tracker,
	visitInfo:visit,
	TTAnswers:TT_Answer,
	ProductAnswers:preload,
	gallery:  gallery,
	Orders:orders,
	prod_action: preload,
	prod_action_mult: preload,
	orderStore: orders

	

})


export default rootReducer;