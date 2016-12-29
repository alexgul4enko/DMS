import InitDb from './initDB';
import SelectAllFromTable from './SelectAllFromTable'


export default function FullPromiseToSelectALL (table){
	return new Promise ((resolve, reject)=>{
		if(!table ){
			resolve("NOT A Data")
		}
		InitDb()
			.then (db_=>{
				return SelectAllFromTable(db_,table);
			})
			.then( tableDate=>{
				resolve(tableDate);
			})
			.catch(err=>{
				resolve(table + "ERR");
			})



	});
};