
import constance from '../Constances'

var async = require('async');



export default function TT_Answer (data = {}, action){
	switch (action.type){

		case constance.UPD_TT_IMAGE_ANS:
			return Object.assign({}, data, {[action.newAnswer.id]:action.newAnswer});
	
		case constance.DROP_TT_IMAGE_ANS:
		 	const {answerID} = action;
		    const { [answerID] : g, ...noA } = data;
			return noA;

		
		
		case constance.POST_TT_Answer:
			let newObj= { 
									 id:action.value.action.key,
									 ans:action.value.val,
									 tt:action.value.tt,
									 rej:action.value.rej,
									 date: new Date()
								

						}

			async.parallel([
				() => {
					writeToDb(newObj,action.value.action.key);
				}
			]);
			return Object.assign({},data,{[action.value.action.key]: newObj});

		case constance.SAVE_TT_PHOTO:
			
			return Object.assign({},data,{[action.value.id]: action.value});
			


		default:
		return data;
	}
}

const DB_NAME = 'DMSMobile';
const DB_VERSION = 1;

function writeToDb(to_insert,key){
	let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	 req.onsuccess =  (evt) =>{
                let db = evt.currentTarget.result;
                let objectStore = db.transaction(['TTAnswers'], "readwrite").objectStore('TTAnswers');
                let objectStoreTitleRequest = objectStore.get(key);
                objectStoreTitleRequest.onsuccess = function() {
				  	objectStore.put(to_insert);
				};
            };

}



