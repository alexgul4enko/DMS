export default function batchInsert (db, table,items= []){
	return new Promise((resolve, reject)=>{
		if(!table){
			reject("Table not found");
			return;
		}

		db.onerror = (evt) => {
            const err = evt.target.wePutrrorMessage || evt.target.error.name || evt.target.error || evt.target.errorCode;
            reject(err);
        };
        let i=0;
        let transaction = db.transaction([table], "readwrite");
      	let itemStore = transaction.objectStore(table);
      	putNext();

        function putNext() {
	        if (i<items.length) {
	            itemStore.put(items[i]).onsuccess = putNext;
	            ++i;
	        } else {   
	            resolve(db);
	        }
	    };

	});

};