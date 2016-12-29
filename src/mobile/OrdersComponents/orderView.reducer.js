import Constances from './Constances';


export  function OrderViewReducer (state =[], action){
	switch (action.type){
		case Constances.DELETE_ORDER_VIEW:
			return state.filter(data=>{
				return data.id != action.rehidrate;
			});
		case Constances.UPDATE_COMMENT_VIEW:
			return state.map(data=>{
				if(data.id ==action.rehidrate.id){
					return Object.assign({},data, {comment: action.rehidrate.comment})
				}
				return data;
			});
		case Constances.UPDATE_STATUS_VIEW:
		const {id,status } = action.rehidrate;
			return state.map(data=>{
				if(data.id ==id){
					return Object.assign({},data, {status})
				}
				return data;
			});
		default :
			return state;
	}
}



export function initOrderByComponent (state ={}, action){
	switch (action.type){
		case Constances.INIT_ORDER_ORDERCOMPONENT:
			return action.rehidrate;
		default:
			return state;
	}
}