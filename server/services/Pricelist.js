
var PriceList = function() {};
var sql = require('mssql');

// PriceList.prototype.init = function (data, cp){
// 	return new Promise ((resolve, reject)=>{
// 		this.exec(data, cp)
// 			.then(data=>{
// 				resolve(data);
// 			})
// 			.catch(err=>{
// 				reject(err);
// 			})
// 	})
// };


PriceList.prototype.get = function (data, cp){
	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
	    request.input('pass', sql.VarChar(50), data.pass);
	    request.execute('web.GET_MainPriceList')
	    	.then(data_ => {
		        if(!data_[0].length){
		        	reject("empty");
		        	return;
		        }
	        	resolve(data_[0]);
	    	})
	    	.catch(err =>{
		       reject(err.message);
		    });
	})
};

module.exports = new PriceList();