import Constances from './Constances';



export function StocksProductsReducer (state=[],action){
	switch(action.type){
		case Constances.STOCKS_INIT_PRODUCTS_DATA:
			return action.rehidrate;
		default:
			return state;
	}
}


export function StocksMainReducer (state={},action){
	switch(action.type){
		case Constances.STOCKS_INIT_STOCKS_DATA:
			return action.rehidrate;
		case Constances.STOCKS_CHANGE_DATA:
			const {id,qty} = action.rehidrate;
			return {...state, [id]:qty};
		default:
			return state;
	}
}