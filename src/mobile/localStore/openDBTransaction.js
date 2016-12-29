export default function OpenTransaction(db, DBName){
	return new Promise((resolve,reject)=>{
		const transaction  = db.transaction([DBName], "readwrite");
		const objectStore = transaction.objectStore(DBName);
		resolve(objectStore);
	});
}