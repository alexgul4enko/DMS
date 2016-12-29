import initDB from './initDB';


export default function getStocksByID (RID=0 ){
	return new Promise ((resolve,reject)=>{
		initDB()
			.then(db=>{
				return Select(db,RID);
			})
			.then(products=>{
				resolve(products);
			})
			.catch (err=>{
				reject(err);
			})
	});
}


const Select = (db,RID=0)=>{
	return new Promise ((resolve,reject)=>{
		let objectStore = db.transaction(["Stocks"], "readwrite").objectStore("Stocks");
		let objectStoreRequest = objectStore.get(RID);
		objectStoreRequest.onsuccess = event =>{
			if(objectStoreRequest.result && objectStoreRequest.result.data){
				resolve(objectStoreRequest.result.data)
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