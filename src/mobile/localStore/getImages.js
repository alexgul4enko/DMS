import initDB from './initDB';




export default function getImages (ids= []){
	return new Promise ((resolve, reject)=>{
		initDB()
			.then(db=>{
				return getImagesLocal(db, ids);
			})
			.then(photos=>{
				resolve(photos);
			})
			.catch (err=>{
				reject (err);
			})
	})
}


function getImagesLocal (db, ids = []){
	return new Promise ((resolve, reject)=>{
		if(!db || !ids || !ids.length){
			reject('EMPTY');
		}
		let transaction = db.transaction(["Images"], "readwrite");
		let objectStore = transaction.objectStore("Images");

		let arr = [];

		getALL(0);

		function getALL (index){
			if(!ids[index]) {
				resolve(arr);
				return;
			}
			let objectStoreRequest = objectStore.get(ids[index].imgID);
			objectStoreRequest.onsuccess = event =>{
				arr.push(objectStoreRequest.result);
				return getALL(++index);
			}

		}

	})

	
} 