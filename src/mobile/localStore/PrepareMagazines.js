import initDB from './initDB';
import SelectAllFromTable from './SelectAllFromTable';
import BindPayFormsToMagazine from './BindPayFormsToMagazine';
import BindMagazinePayFormsDiscounts from './BindMagazinePayFormsDiscounts'

export default function PrepareMagazines (){
	let db;
	return new Promise((resolve, reject)=>{
		initDB()
			.then(db_=>{
				db = db_;
				return SelectAllFromTable(db,"Magazine");
			})
			.then(magazines=>{
				return BindPayFormsToMagazine(db,magazines )
			})
			.then(magazines_RO=>{
				return BindMagazinePayFormsDiscounts(db,magazines_RO )
			})
			.then(magazines_RO_DI=>{
				resolve (magazines_RO_DI);
			})
			.catch(err=>{
				reject(err);
			})
	});
};