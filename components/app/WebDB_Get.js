const DB_NAME = 'DMSMobile';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORAGES = [
            "ttActions",
            "PriceList",
            "TTProducts",
            "TTPriceList",
            "Products",
            "PayForms",
            "Magazine",
            "History",
            "Actions",
            "visitInfo",
            "TTAnswers",
            "ProductAnswers",
            "Orders"
    ];










class WebDB_GET {
    constructor(calback){
        this.calback = calback;
    }


    initDB(data){
        this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        this.openDb(data);

    }
    openDb(data) {
        console.log("openDb ...");

        var req = this.indexedDB.open(DB_NAME, DB_VERSION);
        req.onsuccess =  (evt) =>{
                this.db = evt.currentTarget.result;
                console.log("openDb DONE");
                this.getAll(data);
            };
        req.onerror = function (evt) {
                console.error("openDb:", evt.target.errorCode);
            };

        req.onupgradeneeded =  (evt) => {
            console.log("openDb.onupgradeneeded");
            this.db = evt.currentTarget.result;
            
        };
    }

    getAll(data){
        this.selectfromTable(0,data);
    }

    selectfromTable(index, data){
        if(!DB_STORAGES[index]){
            this.calback(data);
            return;
        }

        let storeName = DB_STORAGES[index];
        
        var objectStore = this.db.transaction(storeName).objectStore(storeName);
        data[storeName] = {};
        objectStore.openCursor().onsuccess = (event) =>{

            var cursor = event.target.result;
            if (cursor) {
                data[storeName][cursor.value.id]= cursor.value;
                // console.log(cursor.value);
                cursor.continue();
            }
            else{
                
                this.selectfromTable(++index,data);
            }
        
        };
    }

    
}

module.exports = WebDB_GET;



