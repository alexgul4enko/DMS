import Constances from './Constances';
import  rootConst from '../Constances';
import GetTTProductsByTT from '../localStore/GetTTProductsByTT';
import getArrData from '../localStore/getArrData';
import getProductAnswer from '../localStore/getProductAnswer';
import PutData from '../localStore/PutData';

const ProdActions = {

	clearPhotos:()=>({type:"CLEAR_IMAGES_LIST_BEFORE"}),
	
	saveAnswer: rehidrate=>{
		return {
			type:Constances.CHANGE_PROD_ACTIONS_ANSWER,
			rehidrate,
		}
	},
	writeDatatoDB:answers=>{
		return (dispatch, getState)=>{
			PutData("ProductAnswers",answers)
				.then(()=>{
					dispatch(clearProdudActions());
				})
				.catch(err=>{
					console.log(err);
					dispatch(clearProdudActions());
				})

			
		}
	},
	initData : (action, router)=>{
		return (dispatch, getState)=>{
			let ttProducts;
			let productList;
			GetTTProductsByTT(router.ttid)
				.then(ttProds=>{
					ttProducts = ttProds;
					return (getArrData("Products"));
				})
				.then(products=>{
					productList = bindProductsAndTTProducts(ttProducts,products );

					return getProductAnswer(action.key)
				})
				.then (answers =>{
					dispatch(initProductsList(bindAnswers(productList,answers)));
					dispatch(rehidrate_());
				})
				.catch(err=>{
					console.log(err);
				})
		}
			
	}
	
}





const clearProdudActions = ()=>{
	return {
		type: Constances.CLEAR_PRODUCTS_ACTIONS,
	}
}

const rehidrate_ = function(){
		return {
			type:rootConst.REHIDRATE_STATE,
		}
};


const initProductsList  = rehidrate =>{
	return {
		type: Constances.INIT_PROD_ACTIONS,
		rehidrate,
	}
}


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


const bindAnswers = (products = [], answers_ = {})=>{
	let prods = products.map(prod=>{
		const {id} = prod;
		const answers = answers_  && answers_[id] ||{};
		return {...prod , answers};
	})
	return sortProducts(prods);
};


const bindProductsAndTTProducts = (ttProds, prods=[])=>{
	if(ttProds && Object.keys(ttProds) && Object.keys(ttProds).length ){
		return prods.filter(pr=>{
			const {id} = pr;
			return ttProds[id];
		}).map(prr=>{
			const {id} = prr;
			const {col,gr,sort} = ttProds[id]
			return Object.assign({},prr,{color:col,cat:gr,sort})
		})
	}

	return prods;
}





export default  ProdActions;