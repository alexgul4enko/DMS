import Constances from './Constances';


export default (state=[],action)=>{
	switch(action.type){
		case Constances.CHANGE_PROD_ACTIONS_ANSWER:
			const data = action.rehidrate;
			const {id, answer, prodId} = data;

			return state.map(product=>{
				const productID = product.id;
				if(productID == prodId){
					let {answers}  = product;
					return {...product, answers:{...answers, [id]:answer}}
				}
				return product;
			})
		case Constances.INIT_PROD_ACTIONS:
			return action.rehidrate;
		case Constances.CLEAR_PRODUCTS_ACTIONS:
			return [];
		default:
			return state;
	}
}