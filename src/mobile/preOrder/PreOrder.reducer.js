import Constances from './Constances';






export function initOrder (state =[], action){
	switch(action.type){
		case Constances.INIT_ORDER_ROUTER:
			return action.rehidrate;
		default:
			return state;
	}
}

export function ordersReducer (state =[], action){
	switch(action.type){
		case Constances.INIT_ORDERS_LIST_FROM_ROUTER:
			return action.rehidrate;
		case Constances.PUT_NEW_ORDER:
			return [...state, action.rehidrate];

		default:
			return state;
	}
}


export function payFormsReducer (state =[], action){
	switch(action.type){
		case Constances.INIT_PAYFORMS_ROUTER:
			return action.rehidrate;
		default:
			return state;
	}
}























