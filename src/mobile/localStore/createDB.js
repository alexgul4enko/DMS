export default function createDB(db){
	let ProductAnswers = db.createObjectStore("ProductAnswers", { keyPath: "id", autoIncrement: false  });
	let TTActions = db.createObjectStore("TTActions", { keyPath: "id", autoIncrement: false  });
	let TTPriceList = db.createObjectStore("TTPriceList", { keyPath: "id" , autoIncrement: false });
	let Magazine = db.createObjectStore("Magazine", { keyPath: "id", autoIncrement: false  });
	let Products = db.createObjectStore("Products", { keyPath: "id" , autoIncrement: false });
	let Actions = db.createObjectStore("Actions", { keyPath: "id", autoIncrement: false  });
	let PayForms = db.createObjectStore("PayForms", { keyPath: "id" , autoIncrement: false });
	let TTanswers = db.createObjectStore("TTanswers", { keyPath: "id" , autoIncrement: false });
	let Orders = db.createObjectStore("Orders", { keyPath: "id" , autoIncrement: false });
		Orders.createIndex("RID", "RID", { unique: false });
		Orders.createIndex("MId", "MId", { unique: false });
	let PriceList = db.createObjectStore("PriceList", { keyPath: "id", autoIncrement: false  });
	let TTProducts = db.createObjectStore("TTProducts", { keyPath: "id" , autoIncrement: false });
	let VisitInfo = db.createObjectStore("VisitInfo", { keyPath: "id", autoIncrement: false  });
	let Images = db.createObjectStore("Images", { keyPath: 'id', autoIncrement: true});
	let Routes = db.createObjectStore("Routes", { keyPath: "id", autoIncrement: false  });
	Routes.createIndex("visit", "visit", { unique: false });
	let MagazinesDiscounts = db.createObjectStore("MagazinesDiscounts", 
													{ keyPath: "id" , autoIncrement: false });
	let MagazinesPayForms = db.createObjectStore("MagazinesPayForms", 
													{ keyPath: "id", autoIncrement: false  });

	let Warehouse = db.createObjectStore("Warehouse", { keyPath: "id", autoIncrement: false  });

	let Stocks = db.createObjectStore("Stocks", { keyPath: "id", autoIncrement: false  });
}