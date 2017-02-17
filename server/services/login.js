
var LoginService = function() {};
var sql = require('mssql');



LoginService.prototype.check = function (data, cp){
	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
	    request.input('pass', sql.VarChar(50), data.pass);
	    request.execute('web.getLogin')
	    	.then(data_=> {
	        	if(!data_[0].length){
		        	reject("empty");
		        }
		        else{
		        	resolve(data_[0][0]);
		        }
		    })
		    .catch(err=> {
		       reject(err.message);
		    });
	})
      
};
LoginService.prototype.getRights = function (userData ={},cp){
	const {UserLogin} =  userData;
	return new Promise((resolve, reject)=>{
		var req = new sql.Request(cp);
		req.input('login', sql.VarChar(50), UserLogin);
		req.execute('web.GET_RoleGrands')
			.then(rigths=>{
				if(!rigths[0].length){
		        	resolve(userData);
		        }
		        else{
		        	// console.log(rigths);
		        	resolve(Object.assign({},userData, {rigths:rigths[0]}));
		        }
			})
			.catch(err=> {
		       resolve(userData);
		    });
	})
}

module.exports = new LoginService();