
import constance from '../Constances'

var async = require('async');



export default function visit (data = {}, action){
	switch (action.type){
		
		case constance.POST_VISIT:
			let visitData = {
				date : new Date(),
				tt : action.value.tt,
				comment: action.value.val,
				ln: action.value.ln,
				lg: action.value.lg,
				id: action.value.tt

			} ;
			async.parallel([
				() => {
					window.socket.emit('TT_Visit', visitData);
				}
				
			]);
			async.parallel([
				() => {
					writeToDb(visitData);
				}
				
			]);
			
			if(!data[action.value.tt]){
				let visitData_arr =[];
				visitData_arr.push(visitData);
				let new_obj = {[visitData.tt]: {id:visitData.tt, arr: visitData_arr}};
				return Object.assign({},data, new_obj);
			}
			else {
				return Object.assign({},data, 
						data[action.value.tt].arr.push(visitData));
			}
				break;
		

		
		default:
		return data;
	}
}

const DB_NAME = 'DMSMobile';
const DB_VERSION = 1;

function writeToDb(to_insert){
	let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	var req = indexedDB.open(DB_NAME, DB_VERSION);
	 req.onsuccess =  (evt) =>{
                let db = evt.currentTarget.result;
                let objectStore = db.transaction(['visitInfo'], "readwrite").objectStore('visitInfo');
                let objectStoreTitleRequest = objectStore.get(to_insert.id);
                objectStoreTitleRequest.onsuccess = function() {
				  let data = objectStoreTitleRequest.result;
				  let toINsert = "";
				  if(!data){
				  	toINsert = {id: to_insert.id, arr:[to_insert]}
				  }
				  else{
				  	toINsert = Object.assign({},data, data.arr.push(to_insert));  
				  }
				  objectStore.put(toINsert);
				};
            };

}
