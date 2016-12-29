
import initDB from './initDB';



export default function  PutImage (table, data){
	return new Promise((resolve,reject)=>{
		initDB()
			.then (db=>{
				resolve(update(table, data,db)) ;
			})
			.catch(err=>{
				reject(err);
			})
	});
}


function update (table, data, db){
	return new Promise((resolve,reject)=>{
		let objectStore = db.transaction([table], "readwrite").objectStore(table);
		let updateTitleRequest =  objectStore.put(data);
		updateTitleRequest.onsuccess = ()=>{
			resolve(updateTitleRequest.result);
		}
		updateTitleRequest.onerror = err=>{
			reject(err);
		}
	});
}

