
var Products = function() {};
var sql = require('mssql');

// Products.prototype.init = function (data, cp){
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


Products.prototype.get = function (data, cp){
	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
	    request.input('pass', sql.VarChar(50), data.pass);
	    request.execute('web.GET_ProList')
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

module.exports = new Products();