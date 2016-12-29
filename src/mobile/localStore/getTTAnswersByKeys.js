

import initDB from './initDB'


export default function getTTAnswersByKeys (arr = []){
	return new Promise ((resolve,reject) =>{
		initDB().
			then(db=>{
				return Select (db, arr)
			})
			.then(answers=>{
				resolve(answers);
			})
			.catch(err=>{
				reject("some error");
			})
	});
};




function Select (db, arr=[]){
	return new Promise ((resolve,reject) =>{
		let objectStore = db.transaction(["TTanswers"], "readwrite").objectStore("TTanswers");

		let answers = {};
		
		getNext(0);

		function getNext(index){
			const search = arr[index];
			if(!search){
				resolve(answers);
				return;
			}
			let request = objectStore.get(search+"");
			request.onsuccess = ()=>{
				if(request.result){
					const {id} = request.result;
					answers[id] = request.result;
				}
				getNext(++index);
			}

		}
	});
}