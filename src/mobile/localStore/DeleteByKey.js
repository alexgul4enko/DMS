import initDB from './initDB';


export default function DeleteByKey (table,key){
	return new Promise((resolve,reject)=>{
		initDB()
			.then(db=>{
				resolve(delete_(db,table,key)) ;
			})
			.catch(err=>{
				reject(err);
			})
	})
}


const delete_ = (db,table,key)=>{
	return new Promise((resolve,reject)=>{
		let transaction = db.transaction([table], "readwrite");
		let objectStore = transaction.objectStore(table);
		let objectStoreRequest = objectStore.delete(key);
		objectStoreRequest.onsuccess = ()=>{
			resolve("succes");
		};
		objectStoreRequest.onerror =()=>{
			reject("cant delete");
		}
	})
}