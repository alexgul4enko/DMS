import initDB from './initDB';


export default function GetTTProductsByTT (TT=0 ){
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
		let objectStore = db.transaction(["TTProducts"], "readwrite").objectStore("TTProducts");
		let objectStoreRequest = objectStore.get(TT+"");
		objectStoreRequest.onsuccess = event =>{
			if(objectStoreRequest.result && objectStoreRequest.result.prods){
				resolve(objectStoreRequest.result.prods)
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