import initDB from './initDB';
import SelectAllFromTable from './SelectAllFromTable';


export default function GetProducts (){
	let db_ ;
	return new Promise((resolve, reject)=>{
		initDB()
			.then(db=>{
				db_ = db;
				return SelectAllFromTable(db_, "Products");
			})
			.then(products=>{
				return bindPriceListToProducts(db_,products );
			})
			.then(products_PR=>{
				resolve(products_PR);
			})
			.catch(err=>{
				console.log(err);
			})
	})
};


const bindPriceListToProducts  = (db, products = {})=>{

	return new Promise((resolve, reject)=>{
		let objectStore = db.transaction(["PriceList"], "readwrite").objectStore("PriceList");
		let cursor = objectStore.openCursor();
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			if (cur) {
				const {id, prices} =cur.value;
				if(products[id]){
					products[id].prices = prices;
				}
                cur.continue();
            }
            else{
            	let arr = [];
            	for(let key in products){
            		arr.push(products[key])
            	}
            	resolve(arr);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора");
		}
	});
};






