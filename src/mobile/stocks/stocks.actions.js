import Constances from './Constances';
import  rootConst from '../Constances';
import Get_ProductsList from '../localStore/Get_ProductsList';
import GetTTProductsByTT from '../localStore/GetTTProductsByTT';
import getStocksByID from '../localStore/getStocksByID';
import PutData from '../localStore/PutData';

const stocksAnctions = {
		initStocks: (RID,MID)=>{
			return (dispatch, getState)=>{
				let prods;
				Get_ProductsList()
				.then(products=>{
					prods = products;
					return GetTTProductsByTT(MID);
				})
				.then(TTProducts=>{
					if(TTProducts){
						prods = [... bindTTProds(prods, TTProducts)];

					}
					prods = [...sortProducts(prods)];
					const groups = groupProducts(prods);
					dispatch(initProducts(groups));
					return getStocksByID(RID);

				})
				.then(stocks=>{
					dispatch(initStocks(stocks));
					dispatch(rehidrate_());
				})
				.catch(err=>{
					console.log(err);
					dispatch(rehidrate_());
				})
			}
			
		},

		cleanData: stocks=>{
			return (dispatch, getState)=>{
				PutData("Stocks", stocks)
 						.then(()=>{
							dispatch(initProducts([]));
							dispatch(initStocks({}));
 						})
 						.catch(()=>{
 							dispatch(initProducts([]));
							dispatch(initStocks({}));
 						})
							
			}
		},
		setStocks: rehidrate =>{
			return {
				type:Constances.STOCKS_CHANGE_DATA,
				rehidrate,
			}
		}
}



const initProducts = rehidrate =>{
	return{
		type:Constances.STOCKS_INIT_PRODUCTS_DATA,
		rehidrate,
	}
}

const initStocks = rehidrate =>{
	return{
		type:Constances.STOCKS_INIT_STOCKS_DATA,
		rehidrate,
	}
}


const groupProducts = (products=[])=>{
	let groups =[];
	let lastGroup = {};
	products.map(prod=>{
		const {cat,name,id,color,pic} = prod;
		if(!lastGroup.arr){
			lastGroup = {title:cat, arr : [{id,name,color,pic}]};
		}
		else if(lastGroup.title != cat){
			groups.push(lastGroup);
			lastGroup ={title:cat, arr : [{id,name,color,pic}]};
		}
		else{
			lastGroup.arr.push({id,name,color,pic})
		}

	})
	groups.push(lastGroup);
	return groups;
};

const sortProducts = (products=[])=>{
	return products.sort((a,b)=>{
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
	});
}

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


const rehidrate_ =  ()=>{
	return {
		type:rootConst.REHIDRATE_STATE,
	}
}



export default stocksAnctions;