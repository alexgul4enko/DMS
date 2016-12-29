import initDB from './initDB';


export default function Get_ProductsList (){
	return new Promise((resolve, reject)=>{
		initDB()
			.then(db=>{
				return select(db);
			})
			.then(products=>{
				resolve(products);
			})
			.catch(err=>{
				reject(err);
			})
	})
}


const select = db =>{
	return new Promise((resolve, reject)=>{
		let data = [];
		let objectStore = db.transaction("Products").objectStore("Products");
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