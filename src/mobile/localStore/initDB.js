export default function initDB(){
	const DBWERSION = 1;
	const DBNAME = "DMSMobile";
	
	return  new Promise((resolve, reject) => {
		if (!window.indexedDB){
			window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		}
		const req = indexedDB.open(DBNAME, DBWERSION);
		req.onsuccess = (evt) =>{
			resolve(evt.currentTarget.result);
		}
		req.onerror = (error) =>{
			reject("DB Connection ERROR");
		}
	});
}