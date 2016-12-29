import initDB from './initDB';
import PutData from './PutData';

export default function goBackMyOrder (ID=0 ){
	return new Promise ((resolve,reject)=>{
		initDB()
			.then(db=>{
				return Select(db,ID);
			})
			.then(products=>{
				resolve(products);
			})
			.catch (err=>{
				reject(err);
			})
	});
}


const Select = (db,ID=0)=>{
	return new Promise ((resolve,reject)=>{
		let objectStore = db.transaction(["Orders"], "readwrite").objectStore("Orders");
		let objectStoreRequest = objectStore.get(ID);
		objectStoreRequest.onsuccess = event =>{
			if(objectStoreRequest.result && objectStoreRequest.result){
				const changed = Object.assign({},objectStoreRequest.result,{status:1});
				PutData("Orders",changed)
					.then(()=>{
						resolve(ID);
					})
					
			}
			
		}
		objectStoreRequest.onerror = ()=>{
			reject("ERRORR")
		}
	});
}