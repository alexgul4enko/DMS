export default function CreateDBTable (db,table){
	return new Promise((resolve,reject)=>{
		let transaction = db.transaction([table], "readwrite");
		transaction.oncomplete = function() {
		    resolve({db,table});
		};
		transaction.onerror = function(event) {
		 		reject("Truncate ERROR  in table " + table );
		};
		var objectStoreRequest = transaction.objectStore(table).clear();
		objectStoreRequest.onsuccess= ()=>{
			resolve(table);
		}
	});
};


