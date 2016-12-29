

export default function SelectAwailableRoutes (db){
	return new Promise((resolve,reject)=>{
		if (!db  ){
			resolve ({});
		}
		let data = {};
		let objectStore = db.transaction("Routes").objectStore("Routes");
		let cursor = objectStore.openCursor();
		let today = new Date();
		today.setHours(0,0,0,0);
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			 if (cur) {
			 	const visitday = new Date(cur.value.visit);
			 	if(visitday>=today){
			 		data[cur.value.id]= cur.value;
			 	}
                 // console.log(cur.value);
                cur.continue();
            }
            else{
            	resolve(data);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора RO");
		}
	});
};