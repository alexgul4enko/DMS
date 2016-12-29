import initDB from './initDB'
export default function ClearTable (table){
	return new Promise((resolve,reject)=>{
		initDB()
			.then(db=>{
				let transaction = db.transaction([table], "readwrite");
				let objectStoreRequest = transaction.objectStore(table).clear();
				objectStoreRequest.onsuccess= ()=>{
					resolve("ok");
				}
			})
			.catch(rr=>{
				console.log(rr)
			})
	})
}	