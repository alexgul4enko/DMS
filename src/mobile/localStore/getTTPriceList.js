import initDB from './initDB';


export default function getTTPriceList(TT=0){
	return new Promise ((resolve,reject)=>{
		initDB()
			.then(db=>{
				return Select(db,TT);
			})
			.then(products=>{
				resolve(products);
			})
			.catch (err=>{
				reject(err);
			})
	});
}


const Select = (db,TT=0)=>{
	return new Promise ((resolve,reject)=>{
		let objectStore = db.transaction(["TTPriceList"], "readwrite").objectStore("TTPriceList");
		let objectStoreRequest = objectStore.get(TT+"");
		objectStoreRequest.onsuccess = event =>{
			if(objectStoreRequest.result && objectStoreRequest.result.priceList){
				resolve(objectStoreRequest.result.priceList)
			}
			else{
				resolve("");
			}
		}
		objectStoreRequest.onerror = ()=>{
			reject("ERRORR")
		}
	});
}