import Constances from '../../Constances';
export default {
	setStocks:(id, qty)=>{
		return {
			type: Constances.SET_STOCKS_FOR_PR_FROM_ORDER,
			rehidrate :{id, qty},
		}
	},

	setOrder:(id, qty,sum, disc,sumD) =>{
		return {
			type: Constances.SET_ORDER_PRODUCT_QTY,
			rehidrate :{id, qty,sum, disc,sumD},
		}
	}
}