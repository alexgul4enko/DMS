import createDB from './createDB'
import getIsoDate from './getIsoDate'

export default function checkLocalData(succes, error){
	const DBWERSION = 1;
	const DBNAME = "DMSMobile";
	
	return  new Promise((resolve, reject) => {
		if (!window.indexedDB){
			window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
		}
		var req = indexedDB.open(DBNAME,DBWERSION);
		req.onupgradeneeded = (e)=>{
			let db = e.target.result;
			db.onerror = ()=>{
				reject("DB Connection ERROR onupgradeneeded");
			}
			createDB(db);
		};
		req.onsuccess = (evt) =>{
			resolve();
		}
		req.onerror = (error) =>{
			console.log(error);
			reject("DB Connection ERROR");
		}
	});
}

 function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }

const toISOString = function(date) {
      
    };
