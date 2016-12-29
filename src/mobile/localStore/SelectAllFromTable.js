

export default function SelectAllFromTable (db, table){

	return new Promise((resolve,reject)=>{
		if (!db || !table ){
			resolve ({});
		}
		let data = {};
		let objectStore = db.transaction(table).objectStore(table);
		let cursor = objectStore.openCursor();
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			 if (cur) {
                data[cur.value.id]= cur.value;
                 // console.log(cur.value);
                cur.continue();
            }
            else{
            	resolve(data);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора");
		}
	});
		


}