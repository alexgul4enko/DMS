import Constances from './soket.constances';

export function OrdersSocketReducer (state = [],action){
	switch(action.type){
		case Constances.SOCKET_ORDER_SAVED:
			return state.map(order=>{
				const {id} = order;
				if(id ==action.rehidrate){
					return Object.assign({},order,{status:3});
				}
				else{
					return order;
				}
			});
		case Constances.SOCKET_GET_BACK_ORDER:
			return state.map(order=>{
				const {id} = order;
				if(id ==action.rehidrate){
					return Object.assign({},order,{status:1});
				}
				else{
					return order;
				}
			})

		default:
			return state;
	}
}




export function WHSocketReducker (state = {},action){
	switch(action.type){
		case Constances.SOCKET_CHANGE_WH_DATA:
			const {rehidrate} = action;
			let obj = {};
			rehidrate.map(data=>{
				const {id,qty} = data;
				obj[id] = data;
			})
			return {...state, ...obj};

		default:
			return state;
	}
}