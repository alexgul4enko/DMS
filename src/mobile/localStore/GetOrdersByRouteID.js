import initDB from './initDB';


export default function GetOrdersByRouteID (RID= 0){
	return new Promise ((resolve,reject)=>{
		initDB()
			.then (db=>{
				return getter(db,RID);

			})
			.then(orders=>{
				resolve(orders);
			})
			.catch (err=>{
				reject(err);
			})
	})
}

//SELECT TOP 20  ORDERS BY MAGAZINE  AND SORT BY  DATE DESC THAT IS ALREADY IN INDEXED DB))))))
const getter = (db, RID=0)=>{
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	return new Promise ((resolve,reject)=>{
		let objectStore = db.transaction("Orders").objectStore("Orders");
		let index = objectStore.index("MId");
		let orders = [];
		let keyRangeValue = IDBKeyRange.only(RID);
		index.openCursor(keyRangeValue).onsuccess = event => {
		  let cursor = event.target.result;
		  if (cursor && orders.length <20) {
		   	orders.push(cursor.value);
		    cursor.continue();
		  }
		  else{
		  	resolve(orders);
		  }
		};
		
	})	
}