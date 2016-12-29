
import FullPromiseToSelectALL from './FullPromiseToSelectALL';
import initDB from './initDB';
import BatchInsert from './BatchInsert';

export default function UpdateWHSocket (wh=[]){
	return new Promise((resolve,reject)=>{
		if(!wh && !wh.length){
			resolve ([]);
		}
		return FullPromiseToSelectALL("Warehouse")
			.then(local=>{
				const clear = wh.filter(data=>{
					const {id} = data;
					return local.hasOwnProperty(id);
				})
				if(clear.length == 0){
					resolve ([])
				}
				else{
					initDB()
						.then(db=>{
							BatchInsert(db,"Warehouse",clear)
								.then(()=>{
									resolve(clear);
								})
								.catch(err=>{
									reject(err);
								})
						})
						.catch(err=>{
							reject(err);
						})
				}
			})
			.catch(err=>{
				reject(err.message);
			})
			

	})
}