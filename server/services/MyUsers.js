
var MyUsers = function() {};
var sql = require('mssql');




MyUsers.prototype.get = function (data, cp){
	return new Promise((resolve, reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
	    request.input('pass', sql.VarChar(50), data.pass);
	    request.input('ID', sql.Int, data.id);
	    request.execute('web.GET_MyUsers')
	    	.then(data_=> {
		        // if(!data_[0].length){
		        // 	reject("empty");
		        // 	return;
		        // }
	        	resolve(data_[0]);
	    	})
	    	.catch(err=> {
		       reject(err.message);
		    });
	})
};

module.exports = new MyUsers();