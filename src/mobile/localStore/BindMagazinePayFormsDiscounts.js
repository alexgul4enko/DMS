export default function BindMagazinePayFormsDiscounts(db,magazines){
	return new Promise((resolve,rejact)=>{
		if(!db){
			return magazines||{};
		}
		let objectStore = db.transaction("MagazinesDiscounts").objectStore("MagazinesDiscounts");
		let cursor = objectStore.openCursor();
		const today = new Date(); 
		cursor.onsuccess = (event)=>{
			let cur = event.target.result;
			 if (cur) {
			 	const {id, discounts} =cur.value;
			 	if(magazines[id] && magazines[id].payForms){
                	magazines[id].payForms = magazines[id].payForms.map(data =>{
                		if(discounts && discounts[data]){
                			return {payform: data, discounts:discounts[data]};
                		}
                		else{
                			return {payform: data};
                		}
                	});
			 	}
                cur.continue();
            }
            else{
            	resolve(magazines);
            }
		}
		cursor.onerror = ()=>{
			reject("Ошибка курсора D_PF_M");
		}

	});
}
