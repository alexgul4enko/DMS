
var Routes = function() {};
var sql = require('mssql');

// Routes.prototype.init = function (data, cp){
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


Routes.prototype.get = function (data, cp){
	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
		request.input('pass', sql.VarChar(50), data.pass);
		request.execute('web.GET_Routes')
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

module.exports = new Routes();