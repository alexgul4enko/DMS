import Constances from './Constances';
import  rootConst from '../Constances';
import GetOrdersByRouteID from '../localStore/GetOrdersByRouteID';
import PutData  from '../localStore/PutData';
import FullPromiseToSelectALL from '../localStore/FullPromiseToSelectALL';
import { browserHistory } from 'react-router';
import Get_ProductsList from '../localStore/Get_ProductsList';
import GetTTProductsByTT from '../localStore/GetTTProductsByTT';
import getTTPriceList from '../localStore/getTTPriceList';

const preOrderActions = {
	initStore: function(MID){
		return (dispatch, getState)=>{
			GetOrdersByRouteID(MID)
				.then(orders=>{
					dispatch(initOrders(orders));
					return FullPromiseToSelectALL("PayForms");
				})
				.then(payforms=>{
					dispatch(initPayForms(payforms));
					dispatch(rehidrate_());
				})
	
				.catch(err=>{
					console.log(err);
					dispatch(rehidrate_());
				})
		}
	},

	AddOrder:function (order){
		return (dispatch, getState)=>{
			const {MId, RID,id,date} = order;
			const globalState = getState();
			const {ln, lg} = globalState.GPS;
			const {name,payForms} = globalState.Magazines[parseInt(MId)];
			const defaultPayForm = payForms[0].payform;

			let prods;
			let Order;
			Get_ProductsList()
				.then(products=>{
					prods = products;
					return GetTTProductsByTT(MId);
				})
				.then(TTProducts=>{
					if(TTProducts){
						prods = [... bindTTProds(prods, TTProducts)];
					}
					return FullPromiseToSelectALL("PriceList");

				})
				.then(priceList =>{
					if(priceList){
						prods = [... bindPriceList(prods, priceList)];
					}
					return getTTPriceList(MId);
					
				})
				.then (TTPriceList=>{
					if(TTPriceList){
						prods = [... bindTTPriceList(prods, TTPriceList)];
					}
					prods = [...filterProdsByPrices(prods)];
					prods = [...bindHistory__(prods,globalState.Orders)];

					prods = prods.sort((a,b)=>{
							if (a.cat<b.cat ) {
								return -1;
							}
							else if (a.cat > b.cat) {
								return 1;
							}
							else{
								if(a.sort < b.sort){
									return -1;
								}
								else if(a.sort > b.sort){
									return 1;
								}
								else{
									if(a.name < b.name ){
										return -1;
									}
									else if (a.name > b.name ){
										return 1
									}
									else{
										return 0;
									}
								}
							}
					})
					Order = {
						MId, RID,id,date,
						ln, lg,
						name,payForms,
						prods,
						qty:0, disc:null, sumDisc:0, sum:0,
						delivery:0, status:1,
						payForm:defaultPayForm,
						comment:"",

					}
					return PutData("Orders", Order)
				})
				.then(()=>{
					dispatch(create_Order_(Order));
					dispatch(initOrder(Order));
					browserHistory.push({
								pathname: '/Order',
								state: Order.id
							});
				})
				.catch(err=>{
					alert("Something went wrong(");
				})
		}
	}



}

const bindHistory__ =(products=[], orders = [])=>{
	if(orders.length ==0){
		return products;
	}
	const prodsHistory = products.map(prod=>{
		const {id} = prod;
		const history = [];
		for (let i=0; i<orders.length ; i++){
			if(history.length ==3) break;
			const ord = orders[i];
			const ord_date = ord && ord.date;

			if(beforeToday(ord_date)){
				const subProds = ord && ord.prods;
				const qtyHist = findProductByIDINSubORDER(id,subProds);
				if(qtyHist){
					history.push({qty:qtyHist,date:ord_date});
				}
			}
		}

		if(history.length){
			return {prod , history};
		}
		else{
			return prod;
		}
	});

	return prodsHistory;
}


const findProductByIDINSubORDER = (id=0, products=[])=>{
	for(let j=0; j<products.length;j++){
		const subId = products[j].id;
		if(subId == id){
			return products[j].qty;
		}

	}
}


const beforeToday = (day)=>{
	if(!day) return false;
	const today = new Date();
	const cur_Year = today.getYear();
	const cur_month = today.getMonth();
	const cur_day = today.getDate()
	const that_Year = day.getYear();
	const that_month = day.getMonth();
	const that_day = day.getDate();

	if(cur_Year>that_Year) return true;
	if(cur_month>that_month) return true;
	if(cur_day>that_day) return true;
	return false;
}


const filterProdsByPrices  = (products=[])=>{
	return products.filter(product=>{
			return product.prices ? true : false;
		});
	
};

const bindTTPriceList = (propducts =[], PriceList ={})=>{
	const match = propducts.map(product=>{
		const {id} = product;
		const prices = PriceList[id];
		if(prices){
			return {...product,prices}
		}
		return product
	});
	return match;
};


const bindPriceList = (propducts =[], PriceList ={})=>{
	const match = propducts.map(product=>{
		const {id} = product;
		const prices = PriceList[id] && PriceList[id].prices;
		if(prices){
			return {...product,prices}
		}

		return product
	});
	return match;
};

const bindTTProds = (propducts =[], TTProds ={})=>{
	let  filt = propducts.filter(prod=>{
		return TTProds[prod.id]? true : false;
	})
	let match = filt.map(prod=>{
		let {color, cat , sort , id} = prod;
		const {col, gr, sort : sort_ } = TTProds[id];

		color = col || color;
		cat = gr || cat;
		sort = sort_ || sort;


		return {...prod, color, cat , sort  };

	});
	return match;
}




const initOrder = rehidrate =>{
	return {
		type:Constances.INIT_ORDER_ROUTER,
		rehidrate,
	}
}








const initPayForms = rehidrate =>{
	return {
		type:Constances.INIT_PAYFORMS_ROUTER,
		rehidrate,
	}
} 

const create_Order_ = rehidrate =>{
	return {
		type:Constances.PUT_NEW_ORDER,
		rehidrate,
	}
}


const initOrders = rehidrate =>{
	return {
		type:Constances.INIT_ORDERS_LIST_FROM_ROUTER,
		rehidrate,
	}
}

const rehidrate_ = function(){
		return {
			type:rootConst.REHIDRATE_STATE,
		}
	};

export default  preOrderActions;