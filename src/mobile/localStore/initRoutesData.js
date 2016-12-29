import initDB from './initDB';
import SelectAwailableRoutes from './SelectAwailableRoutes';
import BindActionsToRoutes from './BindActionsToRoutes';

export default function initRoutesData(){
	let db;
	return new Promise((resolve, reject)=>{
		initDB()
			.then(db_=>{
				db = db_;
				return SelectAwailableRoutes(db);
			})
			.then(routes=>{
				return BindActionsToRoutes(db,routes)
				resolve(routes);
			})
			.then(routes_ACT=>{
				resolve(routes_ACT);
			})
			
			.catch(err=>{
				reject(err);
			})
	});
}