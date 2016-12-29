import initDB from './initDB';

export default function getArrData(tab){
	return new Promise((resolve, reject)=>{
		initDB()
			.then(db=>{
				return select(db,tab);
			})
			.then(products=>{
				resolve(products);
			})
			.catch(err=>{
				reject(err);
			})
	})
}


const select = (db,tab) =>{
	return new Promise((resolve, reject)=>{
		let data = [];
		let objectStore = db.transaction(tab).objectStore(tab);
		let cursor = objectStore.openCursor();
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			 if (cur) {
                data.push(cur.value);
                cur.continue();
            }
            else{
            	resolve(data);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора");
		}
	})
}