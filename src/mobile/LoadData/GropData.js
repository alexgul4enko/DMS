export default function groupData (url, list = []){
	switch(url){
		case "/api/TTPriceList":
			return groupTTPriceList(list);
		case "/api/TTProducts":
			return groupTTProducts(list);
		case "/api/PriceList":
			return groupPriceList(list);
		case "/api/TTActions":
			return groupTTActions(list);
		case "/api/TTDiscounts":
			return groupTTDiscounts(list);
		case "/api/TTPayForms":
			return groupTTPayForms(list);
		default:
			return list;
	}
}


function groupTTPayForms (list=[]){
	let obj = {};
	list.map((data)=>{
		const {ID,pf} = data;
		if(!obj[ID]){
			obj[ID] = [pf];
		}
		else{
			obj[ID].push(pf);
		}
	});

	let arr = [];
	for (let key of Object.keys(obj)) {
		arr.push({id:key, payForms :obj[key]})
	}
	return arr;
}


function groupTTDiscounts (list=[]){
	let obj = {};
	list.map((data)=>{
		const {ttID,pf,com,disc} = data;
		if(!obj[ttID]){
			obj[ttID] = {[pf] : [{com,disc}]};
		}
		else if(!obj[ttID][pf]){
			obj[ttID][pf] = [{com,disc}];
		}
		else{
			obj[ttID][pf].push({com,disc});
		}
	});

	let arr = [];
	for (let key of Object.keys(obj)) {
		arr.push({id:key, discounts :obj[key]})
	}
	return arr;
}

function groupTTActions (list = []){
	let obj = {};
	list.map((data)=>{
		const {rID,act,id} = data;
		if(!obj[rID]){
			obj[rID] = [{act,id}];
		}
		else{
			obj[rID].push({act,id});
		}

	});

	let arr = [];
	for (let key of Object.keys(obj)) {
		arr.push({id:key, acts :obj[key]})
	}
	return arr;
	
};

function groupPriceList (list = []){
	let obj = {};
	list.map((data)=>{
		const {ProdId, Form, Price: pr, Discount:disc} = data;

		if(!obj[ProdId]){
		 	obj[ProdId] = {[Form]: {pr,disc}}
		}
		else if(!obj[ProdId][Form]){
			obj[ProdId][Form] = {pr,disc};
		}
	});
	let arr = [];
	for (let key of Object.keys(obj)) {
		arr.push({id:key, prices :obj[key]})
	}
	return arr;
}


function groupTTProducts (list = []){
	let obj = {};
	list.map((data)=>{
		const {ttId, ProdID, ...other} = data;

		if(!obj[ttId]){
		 	obj[ttId] = {[ProdID]:other}
		}
		else if(!obj[ttId][ProdID]){
			obj[ttId][ProdID] = {...other};
		}
	});
	let arr = [];
	for (let key of Object.keys(obj)) {
		arr.push({id:key, prods :obj[key]})
	}
	return arr;
}


function groupTTPriceList (list = []){
	let obj = {};
	list.map((data)=>{
		const {ttID, ProdId, Form,Price,Discount} = data;

		if(!obj[ttID]) {
			obj[ttID] = {[ProdId]:{[Form]:{pr: Price, disc:Discount}}};
		}
		else if(!obj[ttID][ProdId]){
			obj[ttID][ProdId]= {[Form]:{pr: Price, disc:Discount}};
		}
		else if(!obj[ttID][ProdId][Form]){
			obj[ttID][ProdId][Form] = {pr: Price, disc:Discount}
		}
	});

	let arr = [];
	for (let key of Object.keys(obj)) {
		arr.push({id:key, priceList :obj[key]})
	}
	return arr;
}



