
var Actions = function() {};
var sql = require('mssql');



Actions.prototype.get = function (data, cp){
	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
	    request.input('pass', sql.VarChar(50), data.pass);
	    request.execute('web.get_Actions')
	    	.then(data_ => {
		        if(!data_[0].length){
		        	reject("empty");
		        }
		        else{
		        	resolve(data_[0]);
		        }
	    	})
	    	.catch(err =>{
		       reject(err.message);
		    });
	})
		


      
};

module.exports = new Actions();