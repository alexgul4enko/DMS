
var Warehouse = function() {};
var sql = require('mssql');




Warehouse.prototype.exec = function (data, cp){

	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
    	request.input('pass', sql.VarChar(50), data.pass);
	

		return request.execute('web.GET_WAREHOUSE')
			.then(data_ =>{
				if(!data_[0].length){
		        	reject('empty');
		        }
		        else{
		        	resolve(data_[0]);
		        }
		     }).
			catch(errr=>{
				reject(errr);
			});

	})
	
};

module.exports = new Warehouse();