import Constances from './Constances';
import  rootConst from '../Constances';
import FullPromiseToSelectALL from '../localStore/FullPromiseToSelectALL';
import getStocksByID from '../localStore/getStocksByID';
import PutData from '../localStore/PutData';

 const OrderActions = {
 		initData:(RID)=>{
 			return (dispatch,getState)=>{
 				dispatch(clearOrders());
 				FullPromiseToSelectALL("Warehouse")
 					.then(WH=>{
 						dispatch(initWH(WH));
 						return getStocksByID(RID);
 					})
 					.then(stocks=>{
 						dispatch(initStocks(stocks));
 						dispatch(rehidrate_());
 					})
 					.catch(err=>{
 						console.log(err);
 					})
 			}
 		},


 		changePayForm: rehidrate=>{
 			return {
 				type:Constances.ORDER_CHANGE_PAYFORM,
 				rehidrate,
 			}
 		},
 		changeDiscount: rehidrate=>{
 			return {
 				type:Constances.ORDER_CHANGE_DISCOUNT,
 				rehidrate,
 			}
 		},

 		changeComment: rehidrate=>{
 			return {
 				type:Constances.ORDER_CHANGE_COMMMENT,
 				rehidrate,
 			}
 		}, 

 		changeDeliveryType: rehidrate=>{
 			return {
 				type:Constances.ORDER_CHANGE_DELIVERY,
 				rehidrate,
 			}
 		}, 

 		saveOrderChanges:  rehidrate=>{
 			return (dispatch,getState)=>{
 				if(rehidrate){
 					PutData("Orders", rehidrate)
 						.then(()=>{
							dispatch(clearOrderState())
 						})
 						.catch(()=>{
 							dispatch(clearOrderState())
 						})
 				}
 				
 			}
 		}, 

 		saveStocksCanges:  rehidrate=>{
 			return (dispatch,getState)=>{
 				if(rehidrate){
 					PutData("Stocks", rehidrate)
 						.then(()=>{
							dispatch(clearStocksState())
 						})
 						.catch(()=>{
 							dispatch(clearStocksState())
 						})
 				}
 				
 			}
 		}, 

 }

 const clearStocksState = () =>{
	return {
 			type:Constances.ORDER_CLEAR_STOCKS_DATA,
	}
};

const clearOrderState = () =>{
	return {
 			type:Constances.ORDER_CLEAR_ORDER_DATA,
	}
};


const initStocks = rehidrate =>{
	return {
 				type:Constances.INIT___STOCKS,
 				rehidrate,
	}
}

const initWH = rehidrate =>{
	return {
 				type:Constances.INIT___WH,
 				rehidrate,
	}
}

const clearOrders = ()=>{
 			return {
 				type:"INIT_ORDERS_LIST_FROM_ROUTER",
 				rehidrate:[],
 			}
 		}


const rehidrate_ = function(){
		return {
			type:rootConst.REHIDRATE_STATE,
		}
};



 export default OrderActions;

