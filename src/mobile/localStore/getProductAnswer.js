import initDB from './initDB';


export default function getProductAnswer (key=0 ){
	return new Promise ((resolve,reject)=>{
		initDB()
			.then(db=>{
				return Select(db,key);
			})
			.then(products=>{
				resolve(products);
			})
			.catch (err=>{
				reject(err);
			})
	});
}


const Select = (db,key='0')=>{
	return new Promise ((resolve,reject)=>{
		let objectStore = db.transaction(["ProductAnswers"], "readwrite").objectStore("ProductAnswers");
		let objectStoreRequest = objectStore.get(key+"");
		objectStoreRequest.onsuccess = event =>{
			if(objectStoreRequest.result && objectStoreRequest.result.obj){
				resolve(objectStoreRequest.result.obj)
			}
			else{
				resolve(null);
			}
		}
		objectStoreRequest.onerror = ()=>{
			reject("ERRORR")
		}
	});
}



