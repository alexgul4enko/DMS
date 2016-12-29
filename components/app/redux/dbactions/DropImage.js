export default function DropImage (immID, prevansver,action, success){
	const DB_NAME = 'DMSMobile';
	const DB_VERSION = 1;


	let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var req = indexedDB.open(DB_NAME, DB_VERSION);


	req.onsuccess =  (evt) =>{
		let db = evt.currentTarget.result;
		let transaction_ = db.transaction(["Images"], "readwrite");
		let objectStore = transaction_.objectStore("Images");
		objectStore.delete(immID).onsuccess = function(){
			console.log("image was deleted")
			let table = action.type ==1 ? "TTAnswers" : "ProductAnswers";
			let ans = [... prevansver.ans].filter((data)=>{
				return data != immID;
			});;
			if (ans.length == 0){
				
			}
			let new_ans = Object.assign({},prevansver,{ans:ans})
			
			db.transaction(table, "readwrite")
			                			.objectStore(table)
			                			.put(new_ans);
			success(new_ans);                			
		}

	}
}