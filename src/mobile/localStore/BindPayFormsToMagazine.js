
export default function BindPayFormsToMagazine (db,magazines){
	return new Promise((resolve,rejact)=>{
		if(!db){
			return magazines||{};
		}
		let objectStore = db.transaction("MagazinesPayForms").objectStore("MagazinesPayForms");
		let cursor = objectStore.openCursor();
		const today = new Date(); 
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			 if (cur) {
			 	const {id, payForms} =cur.value;
			 	if(magazines[id]){
                	magazines[id].payForms = payForms;
			 	}
                cur.continue();
            }
            else{
            	resolve(magazines);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора PA_M");
		}

	});
}
