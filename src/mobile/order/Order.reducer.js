 import Constances from './Constances';


 export function OrdersWHReducer (state = {}, action){
 	switch (action.type){
 		case Constances.INIT___WH:
 			return action.rehidrate;
 		default :
 			return state;
 	}
 }



  export function OrdersStocksReducer (state = {}, action){
 	switch (action.type){
 		case Constances.INIT___STOCKS:
 			return action.rehidrate;
 		case Constances.SET_STOCKS_FOR_PR_FROM_ORDER:
 			const {id, qty} = action.rehidrate;
 			return {...state ,[id]:qty };
 		case Constances.ORDER_CLEAR_STOCKS_DATA:
 			return {};
 		default :
 			return state;
 	}
 }


export function OrdersMainReducer (state = {}, action){
 	switch (action.type){
 		case Constances.ORDER_CLEAR_ORDER_DATA:
 			return {};
 		case Constances.ORDER_CHANGE_PAYFORM:
 			const pf = action.rehidrate;
 			let T__co=0, T__sum=0, T__sumD = 0; 
 			const prods_ = state.prods.map(data=>{
 				if(data.qty){
 					if(data.prices && data.prices[pf]){
 						const {pr,disc}  = data.prices[pf];

 						const sum = pr*data.qty;
 						const sumD = disc? sum*(1-disc/100):sum;
 						T__co+= data.qty;
 						T__sum += sum;
 						T__sumD += sumD;
 						return {...data , sum, sumD,disc}

 					}
 					else{
 						return {...data , sum:0, sumD:0,disc:null,qty:null}
 					}
 					
 				}
 				else{
 					T__co+= data.qty?data.qty:0;
 					T__sum += data.sum?data.sum:0;
 					T__sumD += data.sumD?data.sumD:0;
 					return data;
 				}
 			});
			return Object.assign({},state, { payForm:pf, disc:0,prods:prods_, sum:T__sum,sumDisc:T__sumD,qty:T__co}) ;
 		case Constances.ORDER_CHANGE_DISCOUNT:
 			const discount = action.rehidrate;
 			let T_co=0, T_sum=0, T_sumD = 0; 
 			const prods = state.prods.map(data=>{
 				if(data.qty){
 					const {qty,sum} = data;
 					if(discount>0){
 						const sumD = sum*(1-discount/100);
 						T_co+= data.qty;
 						T_sum += sum;
 						T_sumD += sumD;
 						return {...data ,  sumD,disc:discount}
 					}
 					else{
 						const newDisc = data.prices[state.payForm].disc || 0;
 						const sumD = sum*(1-newDisc/100);
 						T_co+= data.qty;
 						T_sum += sum;
 						T_sumD += sumD;
 						return {...data ,  sumD,disc:newDisc}

 					}
 				}
 				else{
 					return data;
 				}
 			})
			return Object.assign({},state, { disc:discount,prods :prods, sum:T_sum,sumDisc:T_sumD,qty:T_co}) ;
 		case Constances.ORDER_CHANGE_COMMMENT:
 			return Object.assign({},state, { comment:action.rehidrate}) ;
 		case Constances.ORDER_CHANGE_DELIVERY:
 			return Object.assign({},state, { delivery:action.rehidrate}) ;
 		case Constances.SET_ORDER_PRODUCT_QTY:{
 			const {id, qty,sum, disc,sumD} = action.rehidrate;
 			let T_co=0, T_sum=0, T_sumD = 0; 
 			const prods = state.prods.map(data=>{
 				if(data.id === id){
 					T_co+=qty; T_sum+=sum; T_sumD+=sumD;
 					return {...data,qty,sum, disc,sumD}
 				}
 				else{
 					T_co+= data.qty?data.qty:0;
 					T_sum += data.sum?data.sum:0;
 					T_sumD += data.sumD?data.sumD:0;
 					return data;
 				}
 			});
			return Object.assign({},state, { prods, sum:T_sum,sumDisc:T_sumD,qty:T_co}) ;

 		}
 		default :
 			return state;
 	}
 }