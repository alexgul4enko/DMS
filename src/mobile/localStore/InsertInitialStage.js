import initDB from './initDB';
import CreateDBTable from './CreateDBTable';
import BatchInsert from './BatchInsert';


export default function InsertinitialStage(url,data){
	return new Promise((resolve, reject)=>{
		initDB()
			.then(db=>{
				return CreateDBTable(db,getTableName(url))
					.then(tableName=>{
						return BatchInsert(db, tableName, data) ;
					})
					.catch(err=>{
						throw new Error (err);
					})

			})
			.then(dd=>{
				resolve ("INSERT DONE");
				// reject("ERROR 901");
			})
			.catch(err=>{
				reject("ERROR 901");
			});

	});
};


function getTableName(url){
		switch(url){
			case "/api/Actions":
				return "Actions";
			case "/api/Magazine":
				return "Magazine";
			case "/api/PayForms":
				return "PayForms";
			case "/api/Products":
				return "Products";
			case "/api/TTPriceList":
				return "TTPriceList";
			case "/api/TTProducts":
				return "TTProducts";
			case "/api/PriceList":
				return "PriceList";
			case "/api/TTActions":
				return "TTActions";
			case "/api/TTDiscounts":
				return "MagazinesDiscounts";
			case "/api/TTPayForms":
				return "MagazinesPayForms";
			case "/api/Routes":
				return "Routes";
			case "/api/Warehouse":
				return "Warehouse";
			
		}

	}