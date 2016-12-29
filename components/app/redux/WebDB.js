const DB_NAME = 'DMSMobile';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORAGES = [
         {collection: 'Actions',dbSet:"actions"},
         {collection: 'TTActions',dbSet:"TTactions"},
         {collection: 'PayForms',dbSet:"payforms"},
         {collection: 'Products',dbSet:"products"},
         {collection: 'Magazine',dbSet:"TT"},
         {collection: 'History',dbSet:"history"},
         {collection: 'TTPriceList',dbSet:"TTPricelist"},
         {collection: 'TTProducts',dbSet:"TTProducts"}
         
    ];
let err;
let db;








class WebDb {
    constructor(data){
        this.data = data;
        this.errors = [];
     
        
    }


    initDB(){
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        this.openDb();

    }
    openDb() {
        console.log("openDb ...");
        var request = this.indexedDB.deleteDatabase(DB_NAME);
        request.onsuccess = function (evt) {
                console.log("db deleted");
            };
        request.onerror = function (evt) {
                console.error("openDb:", evt.target.errorCode);
            };


        var req = this.indexedDB.open(DB_NAME, DB_VERSION);
        req.onsuccess = function (evt) {
                db = this.result;
                console.log("openDb DONE");
            };
        req.onerror = function (evt) {
                console.error("openDb:", evt.target.errorCode);
            };

        req.onupgradeneeded =  (evt) => {
            console.log("openDb.onupgradeneeded");
            db = evt.currentTarget.result;
            this.parseData();

        };
    }

    parseData(){

        if (!this.data){
            this.errors.push({succes:false, name:"Што-то пошло не так((" ,data:null});
            return;
        }
        this.data.map((data)=>{
            if (!data.name && !data.data){
                 return;
            }
            else{
                switch(data.url){
                    case "/api/ttActions":
                        if(!data.succes){
                            this.storeData({data:[], table:"ttActions" });//
                        }
                        else{
                            this.storeData({data:this.parseTTActions(JSON.parse(data.data)), table:"ttActions" });
                        }
                        break;
                    case "/api/priceList":
                        if(!data.succes){
                            this.storeData ({data:[], table:"PriceList" });//
                        }
                        else{
                            this.storeData({data:this.parcePriceList(JSON.parse(data.data)), table:"PriceList" });
                        }
                        break;
                    case "/api/ttProducts":
                        if(!data.succes){
                            this.storeData ({data:[], table:"TTProducts" });//
                        }
                        else{
                            this.storeData ({data:this.parceTTProducts(JSON.parse(data.data)), table:"TTProducts" });
                        }
                        break;
                    case "/api/ttPriceList":
                        if(!data.succes){
                            this.storeData({data:[], table:"TTPriceList" });//
                        }
                        else{
                            this.storeData({data:this.parceTTPriceList(JSON.parse(data.data)), table:"TTPriceList" });
                        }
                        break;
                    case "/api/products":
                        if(!data.succes){
                            this.storeData ({data:[], table:"Products" });//
                        }
                        else{
                            this.storeData ({data:JSON.parse(data.data), table:"Products" });
                        }
                        break;
                    case "/api/payforms":
                        if(!data.succes){
                            this.storeData ({data:[], table:"PayForms" });//
                        }
                        else{
                            this.storeData({data:JSON.parse(data.data), table:"PayForms" });
                        }
                        break;
                    case "/api/magazine":
                        if(!data.succes){
                            this.storeData({data:[], table:"Magazine" });//
                        }
                        else{
                            this.storeData({data:JSON.parse(data.data), table:"Magazine" });
                        }
                        break;
                    case "/api/history":
                        if(!data.succes){
                            this.storeData ({data:[], table:"History" });//
                        }
                        else{
                            this.storeData ({data:this.parceHistory(JSON.parse(data.data)), table:"History" });
                        }
                        break;
                    case "/api/actions":
                        if(!data.succes){
                            this.storeData ({data:[], table:"Actions" });//
                        }
                        else{
                            this.storeData ({data:JSON.parse(data.data), table:"Actions" });
                        }
                        break;
                    default :
                    break; 
                }
            }
        });
    }


    parceHistory(data){
        if(!data){
            return [];
        }
        let temp = {};
        data.map((data)=>{
            if(!temp[data.ttid]){
                temp[data.ttid] = {id:data.ttid, prod:{}} ;
            }
            if(!temp[data.ttid].prod[data.ProductId]){
                temp[data.ttid].prod[data.ProductId]= [];
            }
            temp[data.ttid].prod[data.ProductId].push({date:data.OrderDate, co:data.QTY});
        });
        return this.ObjectToArray(temp);
    }

    parceTTPriceList(data){
        if(!data){
            return [];
        }
        let temp = {};
        data.map((data)=>{
            if(!temp[data.ttID]){
                temp[data.ttID] = {id:data.ttID, prod:{}} ;
            }
            if(!temp[data.ttID].prod[data.ProdId]){
                temp[data.ttID].prod[data.ProdId]= {};
            }
            temp[data.ttID].prod[data.ProdId][data.Form] = data.Price;
        });
        return this.ObjectToArray(temp);
    }

    parceTTProducts(data){
        if(!data){
            return [];
        }
        let temp = {};
        data.map((data)=>{
            if(!temp[data.TTID]){
                temp[data.TTID] = {id:data.TTID, prod:{}} ;
            }
            temp[data.TTID].prod[data.ProdID] = {
                                    coef:  data.Coef,
                                    color: data.Color,
                                    disc:  data.Discounts,
                                    group: data.Groups,
                                    sort:  data.SortOrder
                                }
        });
        return this.ObjectToArray(temp);
    }

    parcePriceList(data){
        if(!data){
            return [];
        }
        let temp = {};
        data.map((data)=>{
            if(!temp[data.ProdId]){
                temp[data.ProdId] = {id:data.ProdId, prices:{}} ;
            }
            temp[data.ProdId].prices[data.Form] = data.Price;
        });
        return this.ObjectToArray(temp);
    }

    parseTTActions(data){
        if(!data){
            return [];
        }
        let temp = {};
        data.map((data)=>{
            if(!temp[data.RouteID]){
                temp[data.RouteID] = {id:data.RouteID, acts:[]} ;
            }
            temp[data.RouteID].acts.push({key:data.id,act:data.TaskID});
        });
        
        return this.ObjectToArray(temp);
    }

    ObjectToArray(data){
        if(!data){
            return [];
        }
        let arr = [];
        for(var p in data){
            arr.push(data[p]);
        }
        return arr;
    }

    getErrors(){

        return  this.errors;
    }

    putNext(list, i,store){
        if (i<list.length) {
            store.put(list[i]).onsuccess = this.putNext(list,++i,store);
        } 
    }
    storeData(data){
        if(data.table==="Magazine"){
                this.errors.push({succes:false, name:"Справочник ТТ пуст" ,data:null});
            }
        if(data.table==="Actions"){
                this.errors.push({succes:false, name:"Нет заданий по маршрутам" ,data:null});
            }
        let store = db.createObjectStore(
                    data.table, { keyPath: 'id', autoIncrement: false  });
        if(!data.data || !data.data.length){
            if(data.table==="Magazine"){
                this.errors.push({succes:false, name:"Справочник ТТ пуст" ,data:null});
            }
            if(data.table==="Actions"){
                this.errors.push({succes:false, name:"Нет заданий по маршрутам" ,data:null});
            }
        }else{
            this.putNext(data.data,0,store);
        }
        
    }
}

module.exports = WebDb;



