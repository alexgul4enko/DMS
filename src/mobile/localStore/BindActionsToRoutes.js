export default function BindActionsToRoutes(db,routes ={}){
	return new Promise((resolve, reject)=>{
		if(!db){
			return routes||{};
		}
		let objectStore = db.transaction("TTActions").objectStore("TTActions");
		let cursor = objectStore.openCursor();
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			 if (cur) {
			 	const {id,acts} = cur.value;
			 	if(routes && routes[id]){
			 		routes[id].actions = acts;
			 	}
                cur.continue();
            }
            else{
            	resolve(routes);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора RO_ACT");
		}

	});
};