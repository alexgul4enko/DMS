
var TTPayForms = function() {};
var sql = require('mssql');

// TTPayForms.prototype.init = function (data, cp){
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


TTPayForms.prototype.get = function (data, cp){

	return new Promise((resolve,reject)=>{
		var request = new sql.Request(cp);
		request.input('login', sql.VarChar(50), data.login);
		request.input('pass', sql.VarChar(50), data.pass);
		request.execute('web.get_MagazinesPayForms')
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

module.exports = new TTPayForms();