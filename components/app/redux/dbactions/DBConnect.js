export default function DBConnect (){
	const DBWERSION = 1;
	const DBNAME = "DMSMobile";
	
	return  new Promise((resolve, reject) => {
		const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		const req = indexedDB.open(DBNAME, DBWERSION);
		req.onsuccess = (evt) =>{
			resolve(evt.currentTarget.result);
		}
		req.onerror = () =>{
			reject("DB Connection ERROR");
		}
	});

}